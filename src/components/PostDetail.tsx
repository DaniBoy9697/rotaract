import React, { useState } from 'react';
import { ArrowLeft, Calendar, User, Heart, MessageCircle, Share2, Edit, Flag, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PostDetailProps {
  post: {
    id: number;
    title: string;
    content: string;
    author: string;
    authorAvatar: string;
    club: string;
    date: string;
    category: string;
    image: string;
    likes: number;
    comments: number;
    shares: number;
    status: string;
    wpId: number | null;
  };
  onBack: () => void;
  currentUser: any;
  isLoggedIn: boolean;
}

export default function PostDetail({ post, onBack, currentUser, isLoggedIn }: PostDetailProps) {
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [commentsData, setCommentsData] = useState([
    {
      id: 1,
      author: 'Ana García',
      authorAvatar: 'AG',
      club: 'Rotaract Club México Centro',
      content: '¡Excelente proyecto! Nos inspira para hacer algo similar en nuestro club.',
      date: '2024-03-16',
      likes: 3
    },
    {
      id: 2,
      author: 'Roberto Martínez',
      authorAvatar: 'RM',
      club: 'Rotaract Club Puebla',
      content: 'Felicidades por el impacto positivo en la comunidad. ¿Tienen planeado repetir la actividad?',
      date: '2024-03-16',
      likes: 1
    }
  ]);

  const handleLike = () => {
    if (!isLoggedIn) return;
    
    if (liked) {
      setLikesCount(likesCount - 1);
      setLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setLiked(true);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !isLoggedIn) return;

    setIsSubmittingComment(true);
    
    // Simulación de envío de comentario
    setTimeout(() => {
      const comment = {
        id: Date.now(),
        author: currentUser.name,
        authorAvatar: currentUser.avatar,
        club: currentUser.club,
        content: newComment,
        date: new Date().toISOString().split('T')[0],
        likes: 0
      };
      
      setCommentsData([...commentsData, comment]);
      setNewComment('');
      setIsSubmittingComment(false);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header con botón de retorno */}
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Posts</span>
        </Button>
        
        <div className="flex-1" />
        
        {isLoggedIn && currentUser && (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
            <Button variant="outline" size="sm">
              <Flag className="w-4 h-4 mr-2" />
              Reportar
            </Button>
          </div>
        )}
      </div>

      {/* Artículo principal */}
      <article className="space-y-6">
        {/* Header del artículo */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Badge 
              className="text-white"
              style={{ backgroundColor: 'var(--rotaract-pink)' }}
            >
              {post.category}
            </Badge>
            {post.status === 'pending' && (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                <Clock className="w-3 h-3 mr-1" />
                Pendiente de moderación
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {post.title}
          </h1>
          
          {/* Información del autor */}
          <div className="flex items-center space-x-4 py-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="#" />
              <AvatarFallback 
                className="text-white"
                style={{ backgroundColor: 'var(--rotaract-blue)' }}
              >
                {post.authorAvatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1 text-gray-500" />
                  <span className="font-medium text-gray-900">{post.author}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="hidden sm:inline mx-2">•</span>
                  <span>{post.club}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="hidden sm:inline mx-2">•</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{formatDate(post.date)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Imagen principal */}
        <div className="aspect-video rounded-lg overflow-hidden">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenido del artículo */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg">
            {post.content}
          </p>
          
          {/* Contenido adicional simulado para una vista más completa */}
          <div className="mt-8 space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Impacto del Proyecto</h3>
            <p className="text-gray-700 leading-relaxed">
              Este proyecto representa el compromiso continuo de Rotaract con el servicio comunitario 
              y el desarrollo sostenible. La participación activa de voluntarios y la colaboración 
              con organizaciones locales demuestra el poder del trabajo en equipo para generar 
              cambios positivos en nuestras comunidades.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900">Próximos Pasos</h3>
            <p className="text-gray-700 leading-relaxed">
              Estamos planeando expandir esta iniciativa a otras comunidades y establecer 
              alianzas estratégicas que nos permitan maximizar nuestro impacto. 
              Si tu club está interesado en participar, no dudes en contactarnos.
            </p>
          </div>
        </div>

        {/* Acciones de interacción */}
        <div className="border-y py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button 
                className={`flex items-center space-x-2 transition-colors ${
                  liked 
                    ? 'text-red-500' 
                    : 'text-gray-500 hover:text-red-500'
                } ${!isLoggedIn ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={handleLike}
                disabled={!isLoggedIn}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                <span>{likesCount}</span>
              </button>
              <div className="flex items-center space-x-2 text-gray-500">
                <MessageCircle className="w-5 h-5" />
                <span>{commentsData.length}</span>
              </div>
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
          </div>
        </div>
      </article>

      {/* Sección de comentarios */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Comentarios ({commentsData.length})
        </h2>

        {/* Formulario de nuevo comentario */}
        {isLoggedIn ? (
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="#" />
                    <AvatarFallback 
                      className="text-white"
                      style={{ backgroundColor: 'var(--rotaract-blue)' }}
                    >
                      {currentUser?.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Escribe tu comentario..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    type="submit"
                    disabled={!newComment.trim() || isSubmittingComment}
                    style={{ backgroundColor: 'var(--rotaract-pink)' }}
                    className="text-white"
                  >
                    {isSubmittingComment ? 'Publicando...' : 'Publicar Comentario'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Alert>
            <AlertDescription>
              Inicia sesión para participar en la conversación y dejar comentarios.
            </AlertDescription>
          </Alert>
        )}

        {/* Lista de comentarios */}
        <div className="space-y-4">
          {commentsData.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="#" />
                    <AvatarFallback 
                      className="text-white"
                      style={{ backgroundColor: 'var(--rotaract-blue)' }}
                    >
                      {comment.authorAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                      <span className="font-medium text-gray-900">{comment.author}</span>
                      <span className="text-sm text-gray-600">{comment.club}</span>
                      <span className="text-sm text-gray-500">{formatDate(comment.date)}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                    <div className="flex items-center space-x-4">
                      <button 
                        className={`flex items-center space-x-1 text-sm text-gray-500 hover:text-red-500 transition-colors ${
                          !isLoggedIn ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                        disabled={!isLoggedIn}
                      >
                        <Heart className="w-4 h-4" />
                        <span>{comment.likes}</span>
                      </button>
                      <button 
                        className={`text-sm text-gray-500 hover:text-blue-500 transition-colors ${
                          !isLoggedIn ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                        disabled={!isLoggedIn}
                      >
                        Responder
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Posts relacionados */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Posts Relacionados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Posts relacionados simulados */}
          {[
            {
              id: 101,
              title: 'Campaña de Reforestación en Bosque de Chapultepec',
              category: 'Medio Ambiente',
              author: 'Luis Torres',
              club: 'Rotaract Club CDMX',
              date: '2024-03-14',
              image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVlJTIwcGxhbnRpbmclMjBmb3Jlc3R8ZW58MXx8fHwxNzU5MTkwNjEwfDA&ixlib=rb-4.1.0&q=80&w=1080'
            },
            {
              id: 102,
              title: 'Conferencia Internacional de Jóvenes Líderes',
              category: 'Desarrollo del Liderazgo',
              author: 'Patricia Ruiz',
              club: 'Rotaract Club Tijuana',
              date: '2024-03-13',
              image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwbGVhZGVyc2hpcCUyMHlvdW5nfGVufDF8fHx8MTc1OTE5MDYxMHww&ixlib=rb-4.1.0&q=80&w=1080'
            }
          ].map((relatedPost) => (
            <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge 
                      className="text-white"
                      style={{ backgroundColor: 'var(--rotaract-pink)' }}
                    >
                      {relatedPost.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>{relatedPost.author}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(relatedPost.date)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}