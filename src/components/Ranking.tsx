import React, { useState } from 'react';
import { Trophy, MapPin, User, Star, Medal, Crown, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

export default function Ranking() {
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('points');

  // Datos mock de clubes con más información para ranking
  const clubs = [
    {
      id: 1,
      name: 'Rotaract Club Monterrey Tecnológico',
      city: 'Monterrey',
      state: 'Nuevo León',
      country: 'México',
      president: 'Ana Patricia Morales',
      email: 'mtytech@rotaract.org',
      phone: '+52 81 2468 1357',
      members: 52,
      founded: '1995',
      points: 1320,
      district: '4130',
      projects: 18,
      serviceHours: 840,
      awards: 5
    },
    {
      id: 2,
      name: 'Rotaract Club Ciudad de México Centro',
      city: 'Ciudad de México',
      state: 'Ciudad de México',
      country: 'México',
      president: 'María González Rodríguez',
      email: 'cdmxcentro@rotaract.org',
      phone: '+52 55 1234 5678',
      members: 45,
      founded: '1998',
      points: 1250,
      district: '4170',
      projects: 15,
      serviceHours: 720,
      awards: 3
    },
    {
      id: 3,
      name: 'Rotaract Club Guadalajara Metropolitan',
      city: 'Guadalajara',
      state: 'Jalisco',
      country: 'México',
      president: 'Carlos Hernández López',
      email: 'gdlmetro@rotaract.org',
      phone: '+52 33 9876 5432',
      members: 38,
      founded: '2001',
      points: 1180,
      district: '4140',
      projects: 14,
      serviceHours: 650,
      awards: 4
    },
    {
      id: 4,
      name: 'Rotaract Club Tijuana Frontera',
      city: 'Tijuana',
      state: 'Baja California',
      country: 'México',
      president: 'Laura Jiménez Castro',
      email: 'tijuanafrontera@rotaract.org',
      phone: '+52 66 4789 6321',
      members: 34,
      founded: '2000',
      points: 1150,
      district: '4100',
      projects: 12,
      serviceHours: 580,
      awards: 2
    },
    {
      id: 5,
      name: 'Rotaract Club Puebla Colonial',
      city: 'Puebla',
      state: 'Puebla',
      country: 'México',
      president: 'Roberto Silva Vázquez',
      email: 'pueblacolonial@rotaract.org',
      phone: '+52 22 3691 4785',
      members: 29,
      founded: '2003',
      points: 980,
      district: '4185',
      projects: 10,
      serviceHours: 450,
      awards: 1
    },
    {
      id: 6,
      name: 'Rotaract Club Mérida Histórico',
      city: 'Mérida',
      state: 'Yucatán',
      country: 'México',
      president: 'Diego Pacheco Uc',
      email: 'meridahistorico@rotaract.org',
      phone: '+52 99 8574 1236',
      members: 27,
      founded: '2005',
      points: 890,
      district: '4195',
      projects: 8,
      serviceHours: 380,
      awards: 2
    }
  ];

  const getFilteredAndSortedClubs = () => {
    let filtered = clubs;
    
    if (filterBy !== 'all') {
      filtered = clubs.filter(club => club.district === filterBy);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'points':
          return b.points - a.points;
        case 'members':
          return b.members - a.members;
        case 'projects':
          return b.projects - a.projects;
        case 'serviceHours':
          return b.serviceHours - a.serviceHours;
        default:
          return b.points - a.points;
      }
    });
  };

  const rankedClubs = getFilteredAndSortedClubs();
  const districts = Array.from(new Set(clubs.map(club => club.district)));

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <Trophy className="w-5 h-5 text-gray-400" />;
    }
  };

  const getRankBadge = (index: number) => {
    if (index === 0) return { text: '🥇 Oro', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    if (index === 1) return { text: '🥈 Plata', className: 'bg-gray-100 text-gray-800 border-gray-200' };
    if (index === 2) return { text: '🥉 Bronce', className: 'bg-amber-100 text-amber-800 border-amber-200' };
    return { text: `#${index + 1}`, className: '' };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Trophy className="w-8 h-8" style={{ color: 'var(--rotaract-pink)' }} />
          <h1 className="text-4xl font-bold text-gray-900">Ranking de Clubes Rotaract</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Clasificación oficial basada en puntos obtenidos por actividades de servicio, 
          participación en eventos y contribuciones a la comunidad Rotaract.
        </p>
      </div>

      {/* Filtros y Ordenamiento */}
      <Card className="bg-gradient-to-r from-pink-50 to-blue-50 border-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filtros y Ordenamiento</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Filtrar por Distrito</label>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar distrito" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los Distritos</SelectItem>
                  {districts.map(district => (
                    <SelectItem key={district} value={district}>
                      Distrito {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Ordenar por</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="points">Puntos Totales</SelectItem>
                  <SelectItem value="members">Número de Miembros</SelectItem>
                  <SelectItem value="projects">Proyectos Completados</SelectItem>
                  <SelectItem value="serviceHours">Horas de Servicio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Podio Top 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {rankedClubs.slice(0, 3).map((club, index) => (
          <Card 
            key={club.id} 
            className={`text-center ${
              index === 0 ? 'ring-2 ring-yellow-400 shadow-lg scale-105' :
              index === 1 ? 'ring-2 ring-gray-400 shadow-md' :
              'ring-2 ring-amber-400 shadow-md'
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-center mb-2">
                {getRankIcon(index)}
              </div>
              <Badge 
                className={`mx-auto ${getRankBadge(index).className}`}
              >
                {getRankBadge(index).text}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <h3 className="font-bold text-lg">{club.name}</h3>
              <div className="flex items-center justify-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{club.city}, {club.state}</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--rotaract-pink)' }}>
                {club.points} pts
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="font-medium text-blue-600">{club.members}</div>
                  <div className="text-gray-600">Miembros</div>
                </div>
                <div>
                  <div className="font-medium text-green-600">{club.projects}</div>
                  <div className="text-gray-600">Proyectos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ranking Completo */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ranking Completo</h2>
        {rankedClubs.map((club, index) => (
          <Card key={club.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  {/* Posición */}
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg ${
                    index < 3 ? 'bg-gradient-to-br text-white' : 'bg-gray-100 text-gray-700'
                  }`} style={index < 3 ? { backgroundColor: 'var(--rotaract-pink)' } : {}}>
                    {index + 1}
                  </div>

                  {/* Información del Club */}
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900">{club.name}</h3>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{club.city}, {club.state}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <User className="w-4 h-4 mr-2" />
                      <span>{club.president} • Distrito {club.district}</span>
                    </div>
                  </div>
                </div>

                {/* Estadísticas y Badges */}
                <div className="text-right space-y-2">
                  <div className="flex items-center justify-end space-x-2">
                    {index < 3 && getRankIcon(index)}
                    <span className="text-2xl font-bold" style={{ color: 'var(--rotaract-pink)' }}>
                      {club.points}
                    </span>
                    <span className="text-gray-500">pts</span>
                  </div>
                  
                  <div className="flex space-x-2 justify-end">
                    {index < 3 && (
                      <Badge className={getRankBadge(index).className}>
                        {getRankBadge(index).text}
                      </Badge>
                    )}
                    <Badge variant="outline" style={{ borderColor: 'var(--rotaract-blue)', color: 'var(--rotaract-blue)' }}>
                      {club.members} miembros
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                    <div className="text-center">
                      <div className="font-medium text-green-600">{club.projects}</div>
                      <div>Proyectos</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-blue-600">{club.serviceHours}</div>
                      <div>Horas</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-yellow-600">{club.awards}</div>
                      <div>Premios</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Información sobre el Sistema de Puntos */}
      <Card className="bg-gradient-to-r from-pink-50 to-yellow-50 border-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5" style={{ color: 'var(--rotaract-pink)' }} />
            <span>Sistema de Puntuación Rotaract</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Los puntos se otorgan basándose en la participación activa y el impacto de los clubes en sus comunidades:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Criterios de Puntuación:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Proyectos de servicio comunitario (50-200 pts)</li>
                <li>• Participación en eventos distritales (20-100 pts)</li>
                <li>• Capacitaciones de liderazgo (30-80 pts)</li>
                <li>• Recaudación de fondos (40-150 pts)</li>
                <li>• Proyectos internacionales (100-300 pts)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Bonificaciones:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Excelencia en membresía (+10% pts)</li>
                <li>• Proyectos sostenibles (+15% pts)</li>
                <li>• Colaboración interclub (+20% pts)</li>
                <li>• Reconocimientos distritales (+25% pts)</li>
                <li>• Premios internacionales (+50% pts)</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-4 bg-white rounded-lg border">
            <p className="text-sm text-gray-600">
              <strong>Período de evaluación:</strong> El ranking se actualiza trimestralmente 
              basándose en las actividades reportadas durante los últimos 12 meses.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}