import React from 'react';
import { Calendar, Users, Globe, Camera, Video, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function WorldWeek() {
  const events = [
    {
      id: 1,
      title: 'Ceremonia de Apertura Virtual',
      date: '2024-03-18',
      time: '19:00 UTC',
      type: 'Virtual',
      description: 'Inauguración oficial de la Semana Mundial Rotaract con invitados especiales.',
      image: 'https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU5MTcyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      registrationUrl: '#'
    },
    {
      id: 2,
      title: 'Foro de Liderazgo Juvenil',
      date: '2024-03-19',
      time: '15:00 UTC',
      type: 'Híbrido',
      description: 'Taller sobre desarrollo de habilidades de liderazgo para jóvenes profesionales.',
      image: 'https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3RhcmFjdCUyMHZvbHVudGVlciUyMGNvbW11bml0eSUyMHNlcnZpY2V8ZW58MXx8fHwxNzU5MTkwNjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      registrationUrl: '#'
    },
    {
      id: 3,
      title: 'Festival Cultural Internacional',
      date: '2024-03-20',
      time: '20:00 UTC',
      type: 'Virtual',
      description: 'Celebración de la diversidad cultural con presentaciones de clubes de todo el mundo.',
      image: 'https://images.unsplash.com/photo-1656761961831-bf4f231500b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxhd2FyZHMlMjB0cm9waHklMjBjZXJlbW9ueXxlbnwxfHx8fDE3NTkxOTA2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      registrationUrl: '#'
    },
    {
      id: 4,
      title: 'Día Global de Servicio',
      date: '2024-03-21',
      time: 'Todo el día',
      type: 'Presencial',
      description: 'Proyectos de servicio simultáneos en clubes de todo el mundo.',
      image: 'https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3RhcmFjdCUyMHZvbHVudGVlciUyMGNvbW11bml0eSUyMHNlcnZpY2V8ZW58MXx8fHwxNzU5MTkwNjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      registrationUrl: '#'
    }
  ];

  const activities = [
    {
      title: 'Proyectos de Servicio Comunitario',
      description: 'Actividades de impacto social en las comunidades locales',
      icon: Users,
      count: '150+ proyectos'
    },
    {
      title: 'Intercambio Cultural Virtual',
      description: 'Conexiones entre clubes de diferentes países',
      icon: Globe,
      count: '75 países'
    },
    {
      title: 'Capacitaciones de Liderazgo',
      description: 'Talleres y seminarios para desarrollo profesional',
      icon: Calendar,
      count: '25 sesiones'
    },
    {
      title: 'Contenido Multimedia',
      description: 'Videos, fotos y testimonios de la semana',
      icon: Camera,
      count: '500+ contenidos'
    }
  ];

  const highlights = [
    {
      title: 'Impacto Global 2023',
      stats: [
        { label: 'Participantes', value: '50,000+' },
        { label: 'Países', value: '180' },
        { label: 'Proyectos', value: '1,200+' },
        { label: 'Beneficiarios', value: '100,000+' }
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-base">
          18-24 Marzo 2024
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          Semana Mundial <span className="text-blue-600">Rotaract</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Una celebración global de servicio, liderazgo y amistad que une a 
          Rotaractianos de todo el mundo en una semana llena de actividades 
          significativas e inspiradoras.
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden shadow-2xl">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3RhcmFjdCUyMHZvbHVudGVlciUyMGNvbW11bml0eSUyMHNlcnZpY2V8ZW58MXx8fHwxNzU5MTkwNjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Rotaractianos celebrando la Semana Mundial"
          className="w-full h-64 lg:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90 flex items-center justify-center">
          <div className="text-center text-white space-y-6 max-w-4xl mx-auto px-6">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Unidos por el Servicio
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100">
              Una semana que trasciende fronteras y conecta corazones
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 text-blue-900 hover:bg-yellow-400">
                Ver Programa Completo
              </Button>
              <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-blue-900">
                Registrarse Ahora
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas de Impacto */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Impacto Global 2023</h2>
          <p className="text-gray-600">Los números que reflejan nuestro alcance mundial</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights[0].stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Actividades Principales */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Actividades Principales</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre las diferentes formas de participar en esta celebración global
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 text-sm">{activity.description}</p>
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    {activity.count}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Eventos Programados */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Eventos Programados</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            No te pierdas estos eventos especiales durante la Semana Mundial Rotaract
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge 
                    className={
                      event.type === 'Virtual' ? 'bg-green-100 text-green-800' :
                      event.type === 'Híbrido' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'
                    }
                  >
                    {event.type}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-gray-900">{event.title}</CardTitle>
                </div>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600">{event.description}</p>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.type === 'Virtual' ? 'Plataforma Online' : 'Ubicaciones Múltiples'}</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => window.open(event.registrationUrl, '_blank')}
                  >
                    Registrarse
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Galería de Años Anteriores */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Momentos Memorables</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Revive los mejores momentos de las Semanas Mundiales anteriores
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback
                  src={`https://images.unsplash.com/photo-${1560220604 + index}-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3RhcmFjdCUyMHZvbHVudGVlciUyMGNvbW11bml0eSUyMHNlcnZpY2V8ZW58MXx8fHwxNzU5MTkwNjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral`}
                  alt={`Momento memorable ${index}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <div className="flex items-center space-x-2">
                      {index % 2 === 0 ? (
                        <Camera className="w-5 h-5" />
                      ) : (
                        <Video className="w-5 h-5" />
                      )}
                      <span className="text-sm font-medium">
                        {index % 2 === 0 ? 'Galería de Fotos' : 'Video Destacado'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            Ver Toda la Galería
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Call to Action 
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          ¡Únete a la Celebración!
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          La Semana Mundial Rotaract es más que un evento, es una oportunidad 
          de conectar, servir y crecer junto a jóvenes líderes de todo el mundo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-yellow-500 text-blue-900 hover:bg-yellow-400"
          >
            Registrar mi Club
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-blue-600"
          >
            Descargar Kit de Recursos
          </Button>
        </div>
      </section>
      */}
    </div>
  );
}