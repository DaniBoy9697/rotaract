import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Calendar, User, Heart, MessageCircle, Share2, Search, Filter, LogIn, UserPlus, Upload, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { ImageWithFallback } from './figma/ImageWithFallback';
import PostDetail from './PostDetail';

// Mock de configuración de WordPress API
const WORDPRESS_CONFIG = {
  apiUrl: process.env.REACT_APP_WORDPRESS_API || '',
  jwtEndpoint: process.env.REACT_APP_JWT_ENDPOINT || ''
};

export default function Posts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');

  // Mock de datos iniciales (en producción vendrían de WordPress)
  const mockPosts = [
    {
      id: 1,
      title: 'Proyecto de Limpieza de Playa en Cancún',
      content: 'El pasado sábado, nuestro club organizó una jornada de limpieza de playa que logró recolectar más de 500 kg de basura. Participaron 45 voluntarios entre Rotaractianos y miembros de la comunidad.',
      author: 'María González',
      authorAvatar: 'MG',
      club: 'Rotaract Club Cancún Caribe',
      date: '2024-03-15',
      category: 'Medio Ambiente',
      image: 'https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3RhcmFjdCUyMHZvbHVudGVlciUyMGNvbW11bml0eSUyMHNlcnZpY2V8ZW58MXx8fHwxNzU5MTkwNjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      likes: 23,
      comments: 8,
      shares: 5,
      status: 'published',
      wpId: null
    },
    {
      id: 2,
      title: 'Taller de Liderazgo para Jóvenes Universitarios',
      content: 'Impartimos un taller de liderazgo y desarrollo personal a 80 estudiantes universitarios. Los temas incluyeron comunicación efectiva, trabajo en equipo y planificación estratégica.',
      author: 'Carlos Hernández',
      authorAvatar: 'CH',
      club: 'Rotaract Club Guadalajara Centro',
      date: '2024-03-12',
      category: 'Desarrollo del Liderazgo',
      image: 'https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU5MTcyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      likes: 31,
      comments: 12,
      shares: 7,
      status: 'published',
      wpId: null
    },
    {
      id: 3,
      title: 'Campaña de Donación de Sangre Exitosa',
      content: 'Nuestra campaña trimestral de donación de sangre superó todas las expectativas. Logramos recolectar 120 unidades de sangre que serán destinadas al Hospital General de la ciudad.',
      author: 'Ana Morales',
      authorAvatar: 'AM',
      club: 'Rotaract Club Monterrey Norte',
      date: '2024-03-10',
      category: 'Salud',
      image: 'https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3RhcmFjdCUyMHZvbHVudGVlciUyMGNvbW11bml0eSUyMHNlcnZpY2V8ZW58MXx8fHwxNzU5MTkwNjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      likes: 45,
      comments: 15,
      shares: 12,
      status: 'published',
      wpId: null
    }
  ];

  const categories = [
    { id: 'all', label: 'Todos', slug: 'all' },
    { id: 'Medio Ambiente', label: 'Medio Ambiente', slug: 'medio-ambiente' },
    { id: 'Desarrollo del Liderazgo', label: 'Liderazgo', slug: 'liderazgo' },
    { id: 'Salud', label: 'Salud', slug: 'salud' },
    { id: 'Intercambio Internacional', label: 'Internacional', slug: 'internacional' },
    { id: 'Educación', label: 'Educación', slug: 'educacion' }
  ];

  // Inicializar posts
 useEffect(() => {
    loadPostsFromWordPress();
    
    // Verificar si hay usuario guardado en localStorage
    const savedUser = localStorage.getItem('rotaract_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('rotaract_user');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Función para cargar posts desde WordPress API
  const loadPostsFromWordPress = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${WORDPRESS_CONFIG.apiUrl}/posts?per_page=20&_embed`);
      const wpPosts = response.data.map((wp: any) => ({
        id: wp.id,
        title: wp.title.rendered,
        content: wp.excerpt.rendered.replace(/<[^>]+>/g, ''), // Limpia HTML
        author: wp._embedded?.author?.[0]?.name || 'Desconocido',
        authorAvatar: wp._embedded?.author?.[0]?.name?.split(' ').map((n: string) => n[0]).join('') || 'AU',
        club: wp.meta?.rotaract_club || '',
        date: wp.date,
        category: wp._embedded?.['wp:term']?.[0]?.[0]?.name || 'Sin categoría',
        image: wp._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
        likes: 0,
        comments: 0,
        shares: 0,
        status: wp.status,
        wpId: wp.id
      }));
      setPosts(wpPosts);
    } catch (error) {
      console.error('Error loading posts from WordPress:', error);
      setPosts(mockPosts); // fallback a mock si falla
    }
    setIsLoading(false);
  };
  // Función para crear post en WordPress
  const createPostInWordPress = async (postData: any) => {
    try {
      const jwtToken = localStorage.getItem('rotaract_jwt');
      const wpPostData = {
        title: postData.title,
        content: postData.content,
        status: 'draft',
        categories: [getCategoryIdBySlug(postData.category)],
        meta: {
          rotaract_club: postData.club,
          rotaract_author: postData.author
        }
      };
      const response = await axios.post(
        `${WORDPRESS_CONFIG.apiUrl}/posts`,
        wpPostData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating post in WordPress:', error);
      throw error;
    }
  };

  // Función para autenticación con WordPress
  // Autenticación con WordPress (JWT)
  const authenticateWithWordPress = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        WORDPRESS_CONFIG.jwtEndpoint,
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const authData = response.data;
      localStorage.setItem('rotaract_jwt', authData.token);
      const user = {
        id: authData.user_id,
        username: authData.user_nicename,
        name: authData.user_display_name,
        email: authData.user_email,
        club: '', // Puedes obtenerlo de la API de usuario si lo tienes en un campo personalizado
        avatar: authData.user_display_name?.split(' ').map((n: string) => n[0]).join('') || 'UD'
      };
      setCurrentUser(user);
      setIsLoggedIn(true);
      localStorage.setItem('rotaract_user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Error authenticating with WordPress:', error);
      throw error;
    }
  };

  const getCategoryIdBySlug = (categoryName: string) => {
    const category = categories.find(cat => cat.label === categoryName);
    return category ? category.id : 1;
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.club.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    setViewMode('list');
  };

  const LoginForm = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsAuthenticating(true);
      try {
        await authenticateWithWordPress(credentials.username, credentials.password);
        setShowLogin(false);
      } catch (error) {
        alert('Error de autenticación. Verifica tus credenciales.');
      }
      setIsAuthenticating(false);
    };

    return (
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="username">Usuario</Label>
          <Input
            id="username"
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            placeholder="Tu usuario de WordPress"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            placeholder="Tu contraseña"
            required
          />
        </div>
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isAuthenticating}
          style={{ backgroundColor: 'var(--rotaract-pink)' }}
        >
          {isAuthenticating ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>
      </form>
    );
  };

  const CreatePostForm = () => {
    const [newPost, setNewPost] = useState({
      title: '',
      content: '',
      category: '',
      image: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      try {
        const postData = {
          ...newPost,
          author: currentUser.name,
          authorAvatar: currentUser.avatar,
          club: currentUser.club,
          date: new Date().toISOString().split('T')[0],
          likes: 0,
          comments: 0,
          shares: 0
        };

        await createPostInWordPress(postData);
        
        // Agregar al estado local (en producción se recargarían desde WordPress)
        setPosts([{ id: Date.now(), ...postData, status: 'pending' }, ...posts]);
        
        setNewPost({ title: '', content: '', category: '', image: '' });
        setShowCreatePost(false);
        
        alert('Post enviado para revisión. Será publicado después de la moderación.');
      } catch (error) {
        alert('Error al crear el post. Inténtalo de nuevo.');
      }
      
      setIsSubmitting(false);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Título del Post</Label>
          <Input
            id="title"
            value={newPost.title}
            onChange={(e) => setNewPost({...newPost, title: e.target.value})}
            placeholder="Escribe un título atractivo"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="category">Categoría</Label>
          <Select 
            value={newPost.category} 
            onValueChange={(value: any) => setNewPost({...newPost, category: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.filter(cat => cat.id !== 'all').map(cat => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="content">Contenido</Label>
          <Textarea
            id="content"
            value={newPost.content}
            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
            placeholder="Describe tu proyecto, actividad o noticia..."
            rows={6}
            required
          />
        </div>

        <div>
          <Label htmlFor="image">URL de Imagen (opcional)</Label>
          <Input
            id="image"
            type="url"
            value={newPost.image}
            onChange={(e) => setNewPost({...newPost, image: e.target.value})}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
          style={{ backgroundColor: 'var(--rotaract-pink)' }}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Post para Revisión'}
        </Button>
      </form>
    );
  };

  // Renderizar vista detallada si está seleccionada
  if (viewMode === 'detail' && selectedPost) {
    return (
      <PostDetail
        post={selectedPost}
        onBack={handleBackToList}
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <MessageCircle className="w-8 h-8" style={{ color: 'var(--rotaract-pink)' }} />
          <h1 className="text-4xl font-bold text-gray-900">Últimos Posts</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Mantente al día con las últimas noticias, proyectos e historias 
          inspiradoras de clubes Rotaract de todo el mundo.
        </p>
      </div>

      {/* Sistema de Autenticación */}
      {!isLoggedIn ? (
        <Alert className="bg-gradient-to-r from-pink-50 to-blue-50 border-pink-200">
          <LogIn className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Inicia sesión para crear y gestionar tus posts</span>
            <div className="flex space-x-2">
              <Dialog open={showLogin} onOpenChange={setShowLogin}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <LogIn className="w-4 h-4 mr-2" />
                    Iniciar Sesión
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Iniciar Sesión</DialogTitle>
                    <DialogDescription>
                      Usa tus credenciales de WordPress para acceder
                    </DialogDescription>
                  </DialogHeader>
                  <LoginForm />
                </DialogContent>
              </Dialog>
              {/* Sistema de Autenticación
              <Button variant="outline" size="sm">
                <UserPlus className="w-4 h-4 mr-2" />
                Registrarse
              </Button>
              */}
            </div>
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <User className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Bienvenido, {currentUser.name} de {currentUser.club}</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setIsLoggedIn(false);
                setCurrentUser(null);
                localStorage.removeItem('rotaract_user');
              }}
            >
              Cerrar Sesión
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Herramientas de Búsqueda y Filtros */}
      <Card className="bg-gradient-to-r from-pink-50 to-blue-50 border-pink-200">
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Búsqueda */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar posts, autores o clubes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Botones de acción */}
            <div className="flex space-x-2">
              {isLoggedIn && (
                <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
                  <DialogTrigger asChild>
                    <Button 
                      className="text-white whitespace-nowrap"
                      style={{ backgroundColor: 'var(--rotaract-pink)' }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Crear Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Crear Nuevo Post</DialogTitle>
                      <DialogDescription>
                        Comparte las actividades y logros de tu club con la comunidad Rotaract
                      </DialogDescription>
                    </DialogHeader>
                    <CreatePostForm />
                  </DialogContent>
                </Dialog>
              )}
              
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Vista Previa
              </Button>
            </div>
          </div>

          {/* Filtros por Categoría */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2 mr-4">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Categorías:</span>
            </div>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? 'text-white' : ''}
                style={selectedCategory === category.id ? { backgroundColor: 'var(--rotaract-pink)' } : {}}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Posts */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--rotaract-pink)' }}></div>
            <p>Cargando posts desde WordPress...</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Imagen */}
                  <div className="lg:col-span-1">
                    <div className="aspect-video lg:aspect-square relative overflow-hidden rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge 
                          className="text-white"
                          style={{ backgroundColor: 'var(--rotaract-pink)' }}
                        >
                          {post.category}
                        </Badge>
                      </div>
                      {post.status === 'pending' && (
                        <div className="absolute top-4 right-4">
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                            Pendiente
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="lg:col-span-2 p-6 space-y-4">
                    {/* Header del Post */}
                    <div className="space-y-3">
                      <h2 
                        className="text-xl font-bold text-gray-900 hover:cursor-pointer transition-colors"
                        style={{ color: 'var(--rotaract-pink)' }}
                        onClick={() => handlePostClick(post)}
                      >
                        {post.title}
                      </h2>
                      
                      {/* Info del Autor */}
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="#" />
                          <AvatarFallback 
                            className="text-white text-sm"
                            style={{ backgroundColor: 'var(--rotaract-blue)' }}
                          >
                            {post.authorAvatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            <span className="font-medium">{post.author}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="hidden sm:inline mx-2">•</span>
                            <span>{post.club}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="hidden sm:inline mx-2">•</span>
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{new Date(post.date).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contenido del Post */}
                    <p className="text-gray-600 leading-relaxed">
                      {post.content.length > 200 ? 
                        `${post.content.substring(0, 200)}...` : 
                        post.content
                      }
                    </p>

                    <Separator />

                    {/* Acciones */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <button 
                          className={`flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors ${
                            !isLoggedIn ? 'cursor-not-allowed opacity-50' : ''
                          }`}
                          disabled={!isLoggedIn}
                        >
                          <Heart className="w-5 h-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button 
                          className={`flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors ${
                            !isLoggedIn ? 'cursor-not-allowed opacity-50' : ''
                          }`}
                          disabled={!isLoggedIn}
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button 
                          className={`flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors ${
                            !isLoggedIn ? 'cursor-not-allowed opacity-50' : ''
                          }`}
                          disabled={!isLoggedIn}
                        >
                          <Share2 className="w-5 h-5" />
                          <span>{post.shares}</span>
                        </button>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePostClick(post)}
                      >
                        Leer Más
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Mensaje cuando no hay resultados */}
      {filteredPosts.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron posts</h3>
          <p className="text-gray-500 mb-6">
            No hay posts que coincidan con tus criterios de búsqueda.
          </p>
          <Button 
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
          >
            Limpiar Filtros
          </Button>
        </div>
      )}

      {/* Información sobre WordPress Integration
      <Card className="bg-gradient-to-r from-blue-50 to-yellow-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" style={{ color: 'var(--rotaract-blue)' }} />
            <span>Sistema de Gestión de Contenido</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Este sistema está preparado para integrarse con WordPress como CMS backend, 
            permitiendo la gestión completa de usuarios, posts y moderación de contenido.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Características:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Autenticación con WordPress</li>
                <li>• Gestión de usuarios y roles</li>
                <li>• Sistema de moderación</li>
                <li>• Categorización de contenido</li>
                <li>• API REST completa</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Configuración actual:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Endpoint: <code className="bg-gray-100 px-1 rounded">{WORDPRESS_CONFIG.apiUrl}</code></li>
                <li>• Autenticación: JWT preparada</li>
                <li>• Estado: Modo demo</li>
                <li>• Posts: Moderación habilitada</li>
              </ul>
            </div>
          </div>

          <Alert>
            <AlertDescription>
              <strong>Nota:</strong> Para activar la integración completa con WordPress, 
              configura las credenciales de API y habilita los plugins JWT Auth y WP REST API.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>*/}
    </div>
  );
}