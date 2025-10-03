import React from 'react';
import { Trophy, Medal, Star, Award, Crown, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function Awards() {
  const awards = [
    {
      id: 1,
      title: 'Club Presidencial',
      description: 'Reconocimiento al club que demuestra excelencia en todas las áreas de foco de Rotaract.',
      icon: Crown,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      criteria: [
        'Mínimo 15 miembros activos',
        'Al menos 12 proyectos de servicio al año',
        'Participación en eventos distritales',
        'Capacitación en liderazgo',
        'Crecimiento de membresía'
      ],
      winners: [
        { club: 'Rotaract Club Ciudad de México Centro', year: '2023-2024' },
        { club: 'Rotaract Club Monterrey Tecnológico', year: '2022-2023' },
        { club: 'Rotaract Club Guadalajara Metropolitan', year: '2021-2022' }
      ]
    },
    {
      id: 2,
      title: 'Premio al Servicio Comunitario',
      description: 'Otorgado al club con el mayor impacto en proyectos de servicio comunitario.',
      icon: Trophy,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      criteria: [
        'Proyectos innovadores de servicio',
        'Medición de impacto comunitario',
        'Participación de la comunidad',
        'Sostenibilidad del proyecto',
        'Documentación y seguimiento'
      ],
      winners: [
        { club: 'Rotaract Club Puebla Colonial', year: '2023-2024' },
        { club: 'Rotaract Club Tijuana Frontera', year: '2022-2023' },
        { club: 'Rotaract Club Mérida Histórico', year: '2021-2022' }
      ]
    },
    {
      id: 3,
      title: 'Reconocimiento a la Innovación',
      description: 'Para clubes que implementan soluciones creativas e innovadoras a problemáticas locales.',
      icon: Star,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      criteria: [
        'Originalidad de la propuesta',
        'Uso de tecnología',
        'Escalabilidad del proyecto',
        'Alianzas estratégicas',
        'Resultados medibles'
      ],
      winners: [
        { club: 'Rotaract Club Monterrey Tecnológico', year: '2023-2024' },
        { club: 'Rotaract Club Ciudad de México Centro', year: '2022-2023' },
        { club: 'Rotaract Club Guadalajara Metropolitan', year: '2021-2022' }
      ]
    },
    {
      id: 4,
      title: 'Premio al Crecimiento',
      description: 'Reconoce a los clubes con el mayor crecimiento en membresía y retención.',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      criteria: [
        'Incremento neto de miembros',
        'Retención de membresía',
        'Estrategias de reclutamiento',
        'Mentoría a nuevos miembros',
        'Ambiente inclusivo'
      ],
      winners: [
        { club: 'Rotaract Club Tijuana Frontera', year: '2023-2024' },
        { club: 'Rotaract Club Mérida Histórico', year: '2022-2023' },
        { club: 'Rotaract Club Puebla Colonial', year: '2021-2022' }
      ]
    }
  ];

  const individualAwards = [
    {
      title: 'Rotaractiano Distinguido del Año',
      recipient: 'María González Rodríguez',
      club: 'Rotaract Club Ciudad de México Centro',
      year: '2023-2024',
      description: 'Por su liderazgo excepcional y dedicación al servicio.'
    },
    {
      title: 'Premio al Liderazgo Joven',
      recipient: 'Carlos Hernández López',
      club: 'Rotaract Club Guadalajara Metropolitan',
      year: '2023-2024',
      description: 'Por inspirar y motivar a otros jóvenes líderes.'
    },
    {
      title: 'Reconocimiento a la Innovación Social',
      recipient: 'Ana Patricia Morales',
      club: 'Rotaract Club Monterrey Tecnológico',
      year: '2023-2024',
      description: 'Por desarrollar soluciones innovadoras para problemas sociales.'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Premios y Galardones</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Celebramos la excelencia, el liderazgo y el impacto de nuestros clubes y miembros 
          más destacados en el servicio comunitario y el desarrollo del liderazgo.
        </p>
      </div>

      {/* Hero Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1656761961831-bf4f231500b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxhd2FyZHMlMjB0cm9waHklMjBjZXJlbW9ueXxlbnwxfHx8fDE3NTkxOTA2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Ceremonia de premios Rotaract"
          className="w-full h-64 lg:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/80 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
            <h2 className="text-3xl font-bold">Excelencia en Servicio</h2>
            <p className="text-xl text-blue-100">Reconociendo el impacto extraordinario</p>
          </div>
        </div>
      </div>

      {/* Premios a Clubes */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Premios a Clubes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Reconocimientos que celebran la excelencia colectiva y el impacto comunitario
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {awards.map((award) => {
            const Icon = award.icon;
            return (
              <Card key={award.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg ${award.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${award.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900">{award.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600">{award.description}</p>

                  {/* Criterios */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Criterios de Evaluación:</h4>
                    <ul className="space-y-2">
                      {award.criteria.map((criterion, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <Medal className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                          {criterion}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  {/* Ganadores Recientes */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Ganadores Recientes:</h4>
                    <div className="space-y-3">
                      {award.winners.map((winner, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">{winner.club}</span>
                          <Badge variant="outline" className="text-blue-600 border-blue-200">
                            {winner.year}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Premios Individuales */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Reconocimientos Individuales</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Celebrando a los líderes excepcionales que inspiran y transforman comunidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {individualAwards.map((award, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg text-gray-900">{award.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600 text-lg">{award.recipient}</h4>
                  <p className="text-gray-600">{award.club}</p>
                  <Badge className="bg-blue-100 text-blue-800">{award.year}</Badge>
                </div>
                <Separator />
                <p className="text-sm text-gray-600 italic">{award.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Proceso de Nominación */}
      <section className="bg-blue-50 rounded-2xl p-8">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Proceso de Nominación</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ¿Conoces un club o Rotaractiano que merece reconocimiento? 
            Conoce nuestro proceso de nominación para los premios anuales.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900">Nominación</h3>
              <p className="text-sm text-gray-600">
                Los clubes y miembros pueden nominar candidatos durante el período establecido
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900">Evaluación</h3>
              <p className="text-sm text-gray-600">
                Un comité de evaluación revisa todas las nominaciones según los criterios establecidos
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900">Ceremonia</h3>
              <p className="text-sm text-gray-600">
                Los ganadores son anunciados durante la ceremonia anual de premiación
              </p>
            </div>
          </div>

          <div className="pt-6">
            <Badge className="bg-yellow-100 text-yellow-800 text-base px-4 py-2">
              📅 Período de nominaciones: Enero - Marzo de cada año
            </Badge>
          </div>
        </div>
      </section>
    </div>
  );
}