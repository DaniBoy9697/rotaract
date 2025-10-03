import React, { useState } from 'react';
import { Search, MapPin, Phone, Mail, User, Building2, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

export default function Clubs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');

  // Datos mock de clubes organizados por estado
  const clubsByState = {
    'Ciudad de México': [
      {
        id: 1,
        name: 'Rotaract Club Ciudad de México Centro',
        city: 'Ciudad de México',
        president: 'María González Rodríguez',
        email: 'cdmxcentro@rotaract.org',
        phone: '+52 55 1234 5678',
        members: 45,
        founded: '1998',
        points: 1250,
        district: '4170',
        address: 'Av. Reforma 123, Col. Centro'
      },
      {
        id: 7,
        name: 'Rotaract Club CDMX Polanco',
        city: 'Ciudad de México',
        president: 'Jorge Martínez Silva',
        email: 'cdmxpolanco@rotaract.org',
        phone: '+52 55 9876 5432',
        members: 38,
        founded: '2010',
        points: 1100,
        district: '4170',
        address: 'Av. Masaryk 250, Polanco'
      }
    ],
    'Jalisco': [
      {
        id: 2,
        name: 'Rotaract Club Guadalajara Metropolitan',
        city: 'Guadalajara',
        president: 'Carlos Hernández López',
        email: 'gdlmetro@rotaract.org',
        phone: '+52 33 9876 5432',
        members: 38,
        founded: '2001',
        points: 1180,
        district: '4140',
        address: 'Av. Vallarta 1500, Col. Americana'
      },
      {
        id: 8,
        name: 'Rotaract Club Zapopan',
        city: 'Zapopan',
        president: 'Patricia López Ruiz',
        email: 'zapopan@rotaract.org',
        phone: '+52 33 3456 7890',
        members: 29,
        founded: '2008',
        points: 950,
        district: '4140',
        address: 'Av. Patria 1234, Zapopan'
      }
    ],
    'Nuevo León': [
      {
        id: 3,
        name: 'Rotaract Club Monterrey Tecnológico',
        city: 'Monterrey',
        president: 'Ana Patricia Morales',
        email: 'mtytech@rotaract.org',
        phone: '+52 81 2468 1357',
        members: 52,
        founded: '1995',
        points: 1320,
        district: '4130',
        address: 'Av. Tecnológico 456, Col. Obispado'
      }
    ],
    'Puebla': [
      {
        id: 4,
        name: 'Rotaract Club Puebla Colonial',
        city: 'Puebla',
        president: 'Roberto Silva Vázquez',
        email: 'pueblacolonial@rotaract.org',
        phone: '+52 22 3691 4785',
        members: 29,
        founded: '2003',
        points: 980,
        district: '4185',
        address: 'Calle 5 de Mayo 789, Centro Histórico'
      }
    ],
    'Baja California': [
      {
        id: 5,
        name: 'Rotaract Club Tijuana Frontera',
        city: 'Tijuana',
        president: 'Laura Jiménez Castro',
        email: 'tijuanafrontera@rotaract.org',
        phone: '+52 66 4789 6321',
        members: 34,
        founded: '2000',
        points: 1150,
        district: '4100',
        address: 'Av. Revolución 1234, Zona Centro'
      }
    ],
    'Yucatán': [
      {
        id: 6,
        name: 'Rotaract Club Mérida Histórico',
        city: 'Mérida',
        president: 'Diego Pacheco Uc',
        email: 'meridahistorico@rotaract.org',
        phone: '+52 99 8574 1236',
        members: 27,
        founded: '2005',
        points: 890,
        district: '4195',
        address: 'Calle 60 x 47, Centro Histórico'
      }
    ]
  };

  // Obtener todos los clubes para búsqueda
  const allClubs = Object.values(clubsByState).flat();

  const getFilteredClubs = () => {
    let clubs = selectedState ? clubsByState[selectedState] || [] : allClubs;
    
    if (searchTerm) {
      clubs = clubs.filter(club =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.president.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return clubs;
  };

  const filteredClubs = getFilteredClubs();

  // Datos del mapa SVG de México simplificado
  const mexicanStates = {
    'Ciudad de México': { x: 380, y: 280, clubs: clubsByState['Ciudad de México']?.length || 0 },
    'Jalisco': { x: 250, y: 240, clubs: clubsByState['Jalisco']?.length || 0 },
    'Nuevo León': { x: 350, y: 170, clubs: clubsByState['Nuevo León']?.length || 0 },
    'Puebla': { x: 410, y: 290, clubs: clubsByState['Puebla']?.length || 0 },
    'Baja California': { x: 80, y: 100, clubs: clubsByState['Baja California']?.length || 0 },
    'Yucatán': { x: 550, y: 240, clubs: clubsByState['Yucatán']?.length || 0 }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Building2 className="w-8 h-8" style={{ color: 'var(--rotaract-pink)' }} />
          <h1 className="text-4xl font-bold text-gray-900">Directorio de Clubes Rotaract</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Descubre y conecta con clubes Rotaract en México. Encuentra oportunidades 
          de servicio, liderazgo y amistad cerca de ti.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mapa Interactivo */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" style={{ color: 'var(--rotaract-pink)' }} />
              <span>Mapa de Clubes por Estado</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* SVG Map of Mexico */}
              <svg 
                viewBox="0 0 600 400" 
                className="w-full h-auto border rounded-lg bg-gradient-to-br from-blue-50 to-pink-50"
              >
                {/* Estados con clubes */}
                {Object.entries(mexicanStates).map(([state, data]) => (
                  <g key={state}>
                    {/* Círculo del estado */}
                    <circle
                      cx={data.x}
                      cy={data.y}
                      r={Math.max(15, data.clubs * 5)}
                      fill={selectedState === state ? 'var(--rotaract-pink)' : 'var(--rotaract-blue)'}
                      fillOpacity={selectedState === state ? 0.8 : 0.6}
                      stroke="white"
                      strokeWidth="2"
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedState(selectedState === state ? '' : state)}
                    />
                    
                    {/* Número de clubes */}
                    <text
                      x={data.x}
                      y={data.y + 2}
                      textAnchor="middle"
                      className="text-white text-sm font-bold pointer-events-none"
                      fill="white"
                    >
                      {data.clubs}
                    </text>
                    
                    {/* Nombre del estado */}
                    <text
                      x={data.x}
                      y={data.y + 35}
                      textAnchor="middle"
                      className="text-xs font-medium pointer-events-none"
                      fill="var(--rotaract-pink)"
                    >
                      {state}
                    </text>
                  </g>
                ))}
              </svg>
              
              {/* Leyenda */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Leyenda:</h4>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: 'var(--rotaract-blue)' }}
                    ></div>
                    <span>Estados con clubes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: 'var(--rotaract-pink)' }}
                    ></div>
                    <span>Estado seleccionado</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  * El tamaño del círculo representa el número de clubes. Haz clic para filtrar.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filtros y búsqueda */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Buscar Clubes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Búsqueda por texto */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar por nombre, ciudad o presidente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Estado seleccionado */}
              {selectedState && (
                <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" style={{ color: 'var(--rotaract-pink)' }} />
                    <span className="font-medium">Mostrando clubes en: {selectedState}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedState('')}
                    className="text-pink-700 hover:text-pink-800"
                  >
                    Limpiar filtro
                  </Button>
                </div>
              )}

              {/* Estadísticas rápidas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold" style={{ color: 'var(--rotaract-blue)' }}>
                    {filteredClubs.length}
                  </div>
                  <div className="text-sm text-gray-600">Clubes encontrados</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold" style={{ color: 'var(--rotaract-yellow)' }}>
                    {Object.keys(mexicanStates).length}
                  </div>
                  <div className="text-sm text-gray-600">Estados con clubes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lista de Clubes */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedState ? `Clubes en ${selectedState}` : 'Todos los Clubes'}
          </h2>
          <Badge variant="outline" className="text-lg px-3 py-1">
            {filteredClubs.length} club{filteredClubs.length !== 1 ? 'es' : ''}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredClubs.map((club) => (
            <Card key={club.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-lg" style={{ color: 'var(--rotaract-pink)' }}>
                      {club.name}
                    </CardTitle>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{club.city}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {club.address}
                    </div>
                  </div>
                  <Badge variant="outline" style={{ borderColor: 'var(--rotaract-blue)', color: 'var(--rotaract-blue)' }}>
                    Distrito {club.district}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Información del Presidente */}
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Presidente</p>
                    <p className="text-gray-600">{club.president}</p>
                  </div>
                </div>

                <Separator />

                {/* Información de Contacto */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a 
                      href={`mailto:${club.email}`}
                      className="hover:underline"
                      style={{ color: 'var(--rotaract-blue)' }}
                    >
                      {club.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a 
                      href={`tel:${club.phone}`}
                      className="hover:underline"
                      style={{ color: 'var(--rotaract-blue)' }}
                    >
                      {club.phone}
                    </a>
                  </div>
                </div>

                <Separator />

                {/* Estadísticas */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold" style={{ color: 'var(--rotaract-blue)' }}>
                      {club.members}
                    </p>
                    <p className="text-sm text-gray-600">Miembros</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{club.founded}</p>
                    <p className="text-sm text-gray-600">Fundado</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: 'var(--rotaract-yellow)' }}>
                      {club.points}
                    </p>
                    <p className="text-sm text-gray-600">Puntos</p>
                  </div>
                </div>

                {/* Botón de Contacto */}
                <div className="pt-2">
                  <Button 
                    className="w-full text-white hover:opacity-90"
                    style={{ backgroundColor: 'var(--rotaract-pink)' }}
                    onClick={() => window.open(`mailto:${club.email}`, '_blank')}
                  >
                    Contactar Club
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClubs.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No se encontraron clubes que coincidan con tu búsqueda.</p>
            <p className="text-gray-400 text-sm mt-2">
              Intenta modificar los filtros o términos de búsqueda.
            </p>
          </div>
        )}
      </div>

      {/* Información adicional */}
      <Card className="bg-gradient-to-r from-pink-50 to-blue-50 border-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" style={{ color: 'var(--rotaract-pink)' }} />
            <span>¿Quieres formar un nuevo club?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Si no hay un club Rotaract en tu área o te interesa formar uno nuevo, 
            contacta con el Distrito correspondiente para obtener información sobre 
            el proceso de creación de nuevos clubes.
          </p>
          <Button 
            variant="outline"
            style={{ borderColor: 'var(--rotaract-pink)', color: 'var(--rotaract-pink)' }}
            onClick={() => window.open('mailto:info@rotaract.org', '_blank')}
          >
            Contactar para Formar Club
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}