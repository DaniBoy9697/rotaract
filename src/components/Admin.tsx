import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogIn, FileText, User, LogOut, Trophy, Upload, Check, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { parseEngraneCsv, getEngraneCsvHeaders } from '../utils/engraneCsvParser';
import type { EngraneChallengeData } from '../config/engraneChallenge';
import { CreatePostForm } from './CreatePostForm';
import { toast } from 'sonner';

const JWT_ENDPOINT = process.env.REACT_APP_JWT_ENDPOINT || '';
const WP_API = process.env.REACT_APP_WORDPRESS_API || '';
const ENGrane_API = `${WP_API}/wp-json/rotaract/v1/engrane-challenge`;

export default function Admin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('rotaract_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        setUser({ name: u.name || u.username, avatar: u.avatar || '?' });
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) return;
    setIsAuthenticating(true);
    try {
      const res = await axios.post(
        JWT_ENDPOINT,
        { username: username.trim(), password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const auth = res.data;
      localStorage.setItem('rotaract_jwt', auth.token);
      const u = {
        id: auth.user_id,
        username: auth.user_nicename,
        name: auth.user_display_name,
        email: auth.user_email,
        club: '',
        avatar: auth.user_display_name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2) || 'U'
      };
      localStorage.setItem('rotaract_user', JSON.stringify(u));
      setUser({ name: u.name, avatar: u.avatar });
    } catch {
      const { toast } = await import('sonner');
      toast.error('Error de autenticación. Verifica usuario y contraseña.');
    }
    setIsAuthenticating(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('rotaract_jwt');
    localStorage.removeItem('rotaract_user');
    setUser(null);
  };

  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  type AdminSection = 'posts' | 'engrane';
  const [adminSection, setAdminSection] = useState<AdminSection>('posts');

  const openCreatePostModal = () => setShowCreatePostModal(true);

  const handleCreatePostSuccess = () => {
    setShowCreatePostModal(false);
    toast.success('Post enviado para revisión. Será publicado después de la moderación.');
  };

  // Engrane Challenge: carga CSV
  const [csvInput, setCsvInput] = useState('');
  const [engranePreview, setEngranePreview] = useState<EngraneChallengeData | null>(null);
  const [engraneError, setEngraneError] = useState<string | null>(null);
  const [isSavingEngrane, setIsSavingEngrane] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleEngraneFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCsvInput(String(reader.result ?? ''));
      setEngranePreview(null);
      setEngraneError(null);
    };
    reader.readAsText(file, 'UTF-8');
    e.target.value = '';
  };

  const handleValidarEngrane = () => {
    setEngraneError(null);
    setEngranePreview(null);
    const result = parseEngraneCsv(csvInput);
    if ('error' in result) {
      setEngraneError(result.error);
      return;
    }
    setEngranePreview(result.data);
  };

  const handleGuardarEngrane = async () => {
    if (!engranePreview) return;
    const token = localStorage.getItem('rotaract_jwt');
    if (!token) {
      const { toast } = await import('sonner');
      toast.error('Inicia sesión para guardar.');
      return;
    }
    if (!WP_API) {
      const { toast } = await import('sonner');
      toast.error('Configura REACT_APP_WORDPRESS_API.');
      return;
    }
    setIsSavingEngrane(true);
    try {
      await axios.post(ENGrane_API, engranePreview, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });
      const { toast } = await import('sonner');
      toast.success('Datos del Engrane Challenge guardados correctamente.');
    } catch (err) {
      const { toast } = await import('sonner');
      toast.error('No se pudo guardar. Revisa el endpoint y tu sesión.');
    } finally {
      setIsSavingEngrane(false);
    }
  };

  const downloadPlantilla = () => {
    const headers = getEngraneCsvHeaders();
    const blob = new Blob([headers + '\n'], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'engrane-challenge-plantilla.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (user) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        {/* Menú lateral */}
        <aside className="w-56 shrink-0 border-r border-gray-200 bg-white py-6 px-4">
          <nav className="space-y-1">
            <button
              type="button"
              onClick={() => setAdminSection('posts')}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                adminSection === 'posts'
                  ? 'text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              style={adminSection === 'posts' ? { backgroundColor: 'var(--rotaract-pink)' } : {}}
            >
              <FileText className="w-5 h-5 shrink-0" />
              Posts
            </button>
            <button
              type="button"
              onClick={() => setAdminSection('engrane')}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                adminSection === 'engrane'
                  ? 'text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              style={adminSection === 'engrane' ? { backgroundColor: 'var(--rotaract-pink)' } : {}}
            >
              <Trophy className="w-5 h-5 shrink-0" />
              Engrane Challenge
            </button>
          </nav>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-8 space-y-8">
            {/* Header con más espacio */}
            <header className="flex items-center justify-between px-1">
              <h1 className="text-2xl font-bold text-gray-900">Panel de administración</h1>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {user.name}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar sesión
                </Button>
              </div>
            </header>

            {adminSection === 'posts' && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card
                    className="cursor-pointer transition-shadow hover:shadow-md border-2 border-transparent hover:border-pink-200"
                    onClick={openCreatePostModal}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: 'var(--rotaract-pink)', color: 'white' }}
                        >
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Crear post</CardTitle>
                          <CardDescription>Publicar una nueva entrada o noticia</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card
                    className="cursor-pointer opacity-90 hover:opacity-100 transition-shadow hover:shadow-md border-2 border-transparent hover:border-pink-200"
                    onClick={() => navigate('/posts')}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Editar posts</CardTitle>
                          <CardDescription>Ver y gestionar publicaciones</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>

                <Card className="bg-gray-50 border-gray-200">
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-600">
                      Desde aquí puedes crear contenido o ir a la sección de posts para ver y editar todas las publicaciones.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      style={{ borderColor: 'var(--rotaract-pink)', color: 'var(--rotaract-pink)' }}
                      onClick={() => navigate('/posts')}
                    >
                      Ver todos los posts
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            {adminSection === 'engrane' && (
              <Card className="border-2 border-transparent hover:border-pink-200 transition-colors">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: 'var(--rotaract-pink)' }}
              >
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg">Engrane Challenge</CardTitle>
                <CardDescription>Sube o pega datos desde Excel/CSV para actualizar el ranking</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.txt"
                className="hidden"
                onChange={handleEngraneFile}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                style={{ borderColor: 'var(--rotaract-pink)' }}
              >
                <Upload className="w-4 h-4 mr-2" />
                Seleccionar archivo CSV
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={downloadPlantilla}>
                Descargar plantilla CSV
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="engrane-csv">O pega aquí el contenido CSV (cabeceras: id, name, city, state y columnas de puntuación)</Label>
              <textarea
                id="engrane-csv"
                value={csvInput}
                onChange={(e) => {
                  setCsvInput(e.target.value);
                  setEngraneError(null);
                  setEngranePreview(null);
                }}
                placeholder="id,name,city,state,tesoreria_julio,dei_julio,..."
                rows={6}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
            {engraneError && (
              <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-800">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{engraneError}</span>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleValidarEngrane}
                disabled={!csvInput.trim()}
              >
                <Check className="w-4 h-4 mr-2" />
                Validar
              </Button>
              <Button
                type="button"
                onClick={handleGuardarEngrane}
                disabled={!engranePreview}
                style={{ backgroundColor: 'var(--rotaract-pink)', color: 'white' }}
              >
                {isSavingEngrane ? 'Guardando...' : 'Guardar en WordPress'}
              </Button>
            </div>
            {engranePreview && (
              <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
                <p className="font-medium">Vista previa: {engranePreview.clubs.length} club(es) listos para guardar.</p>
                <ul className="mt-1 list-disc list-inside text-green-700">
                  {engranePreview.clubs.slice(0, 8).map((c) => (
                    <li key={String(c.id)}>{c.name}</li>
                  ))}
                  {engranePreview.clubs.length > 8 && (
                    <li>… y {engranePreview.clubs.length - 8} más</li>
                  )}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
            )}
          </div>
        </main>

        {/* Modal Crear Post - más grande */}
        <Dialog open={showCreatePostModal} onOpenChange={setShowCreatePostModal}>
          <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Post</DialogTitle>
              <DialogDescription>
                Comparte las actividades y logros de tu club con la comunidad Rotaract
              </DialogDescription>
            </DialogHeader>
            {user && (() => {
              const saved = localStorage.getItem('rotaract_user');
              const fullUser = saved ? (() => { try { const u = JSON.parse(saved); return { name: u.name || u.username || user.name, avatar: u.avatar || user.avatar, club: u.club || '' }; } catch { return { name: user.name, avatar: user.avatar, club: '' }; } })() : { name: user.name, avatar: user.avatar, club: '' };
              return <CreatePostForm user={fullUser} onSuccess={handleCreatePostSuccess} />;
            })()}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo: logo y marca (visible en md+) */}
      <div
        className="hidden md:flex md:w-1/2 min-h-screen flex-col items-center justify-center p-12 text-white"
        style={{ background: 'linear-gradient(135deg, var(--rotaract-pink) 0%, var(--rotaract-pink-dark) 100%)' }}
      >
        <img
          src="/img/rota-logo.png"
          alt="Rotaract Logo"
          className="w-48 h-48 object-contain brightness-0 invert mb-8"
        />
        <h2 className="text-2xl font-bold text-center">Panel de administración</h2>
        <p className="text-pink-100 text-center mt-2 max-w-xs">
          Rotaract D. 4185 — Gestiona contenidos y publicaciones
        </p>
      </div>

      {/* Panel derecho: formulario de login */}
      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center p-6 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo en móvil */}
          <div className="md:hidden flex justify-center mb-8">
            <img
              src="/img/rota-logo.png"
              alt="Rotaract Logo"
              className="h-20 w-auto"
            />
          </div>

          <Card className="shadow-xl border-gray-200 overflow-hidden">
            <CardHeader className="pb-6 pt-8 px-8 sm:px-10">
              <CardTitle className="text-2xl font-bold text-gray-900">Iniciar sesión</CardTitle>
              <CardDescription className="text-base mt-1">
                Usa tus credenciales de WordPress para acceder al panel.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 sm:px-10 pb-10">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="admin-username" className="text-sm font-medium">Usuario</Label>
                  <Input
                    id="admin-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Usuario de WordPress"
                    required
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password" className="text-sm font-medium">Contraseña</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                    className="h-12 text-base"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium text-white"
                  style={{ backgroundColor: 'var(--rotaract-pink)' }}
                  disabled={isAuthenticating}
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  {isAuthenticating ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-gray-500 mt-6">
            Acceso solo para administradores y editores
          </p>
        </div>
      </div>
    </div>
  );
}
