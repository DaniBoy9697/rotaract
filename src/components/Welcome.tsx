import React from 'react';
import { ArrowRight, Users, Award, Globe, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WelcomeProps {
  onNavigate: (page: string) => void;
}

export default function Welcome({ onNavigate }: WelcomeProps) {
  const features = [
    {
      title: 'Directorio de Clubes',
      description: 'Encuentra clubes Rotaract en tu ciudad y conecta con jóvenes líderes.',
      icon: Users,
      action: () => onNavigate('clubs'),
      color: 'bg-pink-100',
      textColor: 'var(--rotaract-pink)'
    },
    {
      title: 'Ranking de Clubes',
      description: 'Descubre los clubes más destacados y su clasificación por puntos.',
      icon: Award,
      action: () => onNavigate('ranking'),
      color: 'bg-yellow-100',
      textColor: 'var(--rotaract-yellow)'
    },
    {
      title: 'Semana Mundial',
      description: 'Únete a las celebraciones y actividades de la Semana Mundial Rotaract.',
      icon: Globe,
      action: () => onNavigate('worldweek'),
      color: 'bg-blue-100',
      textColor: 'var(--rotaract-blue)'
    },
    {
      title: 'Últimos Posts',
      description: 'Mantente al día con noticias, eventos y historias de impacto.',
      icon: Heart,
      action: () => onNavigate('posts'),
      color: 'bg-pink-100',
      textColor: 'var(--rotaract-pink)'
    }
  ];

  const stats = [
    { number: '250,000+', label: 'Rotaractianos' },
    { number: '180+', label: 'Países' },
    { number: '9,000+', label: 'Clubes' },
    { number: '56', label: 'Años de Historia' }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <Badge 
                className="text-white border-pink-300"
                style={{ backgroundColor: 'var(--rotaract-pink)' }}
              >
                Servicio por encima de sí mismo
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Bienvenido a{' '}
                <span style={{ color: 'var(--rotaract-pink)' }}>Rotaract</span>
              </h1>
              <p className="text-xl text-gray-600">
                Únete a la red global de jóvenes líderes comprometidos con crear 
                un impacto positivo en sus comunidades a través del servicio, 
                la amistad y el desarrollo profesional.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => onNavigate('clubs')}
                className="text-white hover:opacity-90"
                style={{ backgroundColor: 'var(--rotaract-pink)' }}
              >
                Encuentra tu Club
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate('contact')}
                style={{ borderColor: 'var(--rotaract-pink)', color: 'var(--rotaract-pink)' }}
              >
                Contáctanos
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3RhcmFjdCUyMHZvbHVudGVlciUyMGNvbW11bml0eSUyMHNlcnZpY2V8ZW58MXx8fHwxNzU5MTkwNjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Rotaractianos en acción comunitaria"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--rotaract-pink)' }}
                >
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Impacto Global</p>
                  <p className="text-sm text-gray-600">Cambiando vidas diariamente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Rotaract en Números
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Somos una comunidad global de jóvenes apasionados por hacer la diferencia
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div 
                className="text-3xl lg:text-4xl font-bold mb-2"
                style={{ color: 'var(--rotaract-pink)' }}
              >
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explora Nuestras Secciones
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre todo lo que Rotaract tiene para ofrecerte
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={feature.action}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" style={{ color: feature.textColor }} />
                    </div>
                    <div>
                      <CardTitle className="group-hover:opacity-80 transition-colors">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                  <div 
                    className="mt-4 flex items-center group-hover:translate-x-2 transition-transform"
                    style={{ color: 'var(--rotaract-pink)' }}
                  >
                    <span className="text-sm font-medium">Explorar</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section 
        className="rounded-2xl p-8 lg:p-12 text-white text-center"
        style={{ background: `linear-gradient(45deg, var(--rotaract-pink), var(--rotaract-pink-dark))` }}
      >
        <h2 className="text-3xl font-bold mb-4">
          ¿Listo para Hacer la Diferencia?
        </h2>
        <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
          Únete a miles de jóvenes líderes que están transformando sus comunidades 
          a través del servicio y la acción.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => onNavigate('clubs')}
            className="bg-white hover:bg-gray-100"
            style={{ color: 'var(--rotaract-pink)' }}
          >
            Encuentra tu Club Local
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => onNavigate('contact')}
            className="border-white text-white hover:bg-white"
            style={{ ':hover': { color: 'var(--rotaract-pink)' } }}
          >
            Más Información
          </Button>
        </div>
      </section>
    </div>
  );
}