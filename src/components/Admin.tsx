import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogIn, FileText, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const JWT_ENDPOINT = process.env.REACT_APP_JWT_ENDPOINT || '';

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

  const goToCreatePost = () => {
    sessionStorage.setItem('openCreatePost', '1');
    navigate('/posts');
  };

  if (user) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
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
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card
            className="cursor-pointer transition-shadow hover:shadow-md border-2 border-transparent hover:border-pink-200"
            onClick={goToCreatePost}
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

          <Card className="opacity-75 border-dashed">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-lg text-gray-500">Editar posts</CardTitle>
                  <CardDescription>Próximamente</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">
              Desde aquí puedes ir a la sección de posts para crear contenido. Más opciones de administración estarán disponibles próximamente.
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
