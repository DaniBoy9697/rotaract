import React, { useMemo, useState } from 'react';
import MexicoMapComponent from './MexicoMap';
import { Search, MapPin, Phone, Mail, User, Building2, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

type Club = {
  id: number;
  name: string;
  city: string;
  president: string;
  email: string;
  phone: string;
  members: number;
  founded: string;
  points: number;
  district: string;
  address: string;
};

type StateKey = 'Veracruz' | 'Morelos' | 'Tlaxcala' | 'Puebla' | 'Guerrero';

type ClubsByState = Record<StateKey, Club[]>;

type MexicoMapProps = {
  selected: StateKey | '';
  setSelected: (s: StateKey | '') => void;
  counts: Record<StateKey, number>;
  className?: string;
};

const STATE_LIST: StateKey[] = ['Veracruz', 'Morelos', 'Tlaxcala', 'Puebla', 'Guerrero'];

/**
 * Mapa SVG minimalista de México con 5 estados como paths clicables.
 * viewBox 1000x640 (eje X a la derecha, eje Y hacia abajo - estándar SVG).
 * Los paths NO son cartografía oficial; son simplificados para UI/UX.
 */
function MexicoMap({ selected, setSelected, counts }: MexicoMapProps) {
  // Centroides (para etiquetas/bolas) normalizados al viewBox 1000x640
  const centroids: Record<StateKey, { x: number; y: number }> = {
    Veracruz: { x: 760, y: 360 }, // Golfo, centro-este
    Puebla:   { x: 650, y: 330 }, // Centro-este
    Tlaxcala: { x: 665, y: 300 }, // Muy cerca de Puebla (ligeramente arriba/izq)
    Morelos:  { x: 620, y: 360 }, // Al sur de CDMX
    Guerrero: { x: 560, y: 440 }, // Pacífico, más al sur
  };

  // Paths (silhueta simplificada para cada estado) - aproximaciones estilizadas
  // Mantienen coherencia visual y clic.
  const statePaths: Record<StateKey, string> = {
    Veracruz:
      'M770,290 L810,320 L835,360 L820,400 L785,430 L740,410 L730,370 L745,335 Z',
    Puebla:
      'M610,300 L660,300 L690,330 L675,360 L635,360 L610,330 Z',
    Tlaxcala:
      'M665,285 L680,295 L675,310 L655,310 L650,295 Z',
    Morelos:
      'M590,350 L625,350 L640,370 L625,395 L595,395 L585,375 Z',
    Guerrero:
      'M510,410 L570,410 L600,430 L590,470 L540,490 L500,470 L490,435 Z',
  };

  // Contorno general simplificado del país (solo decorativo)
  const mexicoOutline =
    'M130,210 L220,170 L320,190 L420,160 L520,190 L600,220 L680,240 L740,270 L800,310 L840,360 L820,420 L760,460 L680,490 L590,520 L520,520 L440,500 L360,470 L300,430 L240,380 L180,330 L140,280 Z';

  // Escalado del radio por conteo (usa raíz para escalar suave)
  const getRadius = (count: number) => {
    if (count <= 0) return 0;
    const base = 8; // radio mínimo
    return base + Math.sqrt(count) * 4; // ajusta si quieres más/menos impacto
  };

  return (
    <div className="relative">
      <svg
        viewBox="0 0 1000 640"
        className="w-full h-auto border rounded-lg bg-gradient-to-br from-blue-50 to-pink-50"
      >
        {/* Contorno decorativo */}
        <path
          d={mexicoOutline}
          fill="none"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth={8}
        />
        <path
          d={mexicoOutline}
          fill="rgba(255,255,255,0.6)"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth={2}
        />

        {/* Estados interactivos */}
        {STATE_LIST.map((st) => {
          const isActive = selected === st;
          return (
            <g key={st}>
              <path
                d={statePaths[st]}
                fill={isActive ? 'var(--rotaract-pink)' : 'var(--rotaract-blue)'}
                fillOpacity={isActive ? 0.25 : 0.15}
                stroke={isActive ? 'var(--rotaract-pink)' : 'var(--rotaract-blue)'}
                strokeOpacity={0.6}
                strokeWidth={isActive ? 3 : 2}
                className="cursor-pointer transition-all hover:opacity-80"
                onClick={() => setSelected(isActive ? '' : st)}
              />

              {/* Burbuja de cantidad (centrada en el “centroid” del estado) */}
              {counts[st] > 0 && (
                <>
                  <circle
                    cx={centroids[st].x}
                    cy={centroids[st].y}
                    r={getRadius(counts[st])}
                    fill={isActive ? 'var(--rotaract-pink)' : 'var(--rotaract-blue)'}
                    fillOpacity={isActive ? 0.85 : 0.7}
                    stroke="white"
                    strokeWidth={2}
                    className="cursor-pointer"
                    onClick={() => setSelected(isActive ? '' : st)}
                  />
                  <text
                    x={centroids[st].x}
                    y={centroids[st].y + 3}
                    textAnchor="middle"
                    fontSize={14}
                    fontWeight={700}
                    fill="white"
                    style={{ pointerEvents: 'none' }}
                  >
                    {counts[st]}
                  </text>
                  <text
                    x={centroids[st].x}
                    y={centroids[st].y + getRadius(counts[st]) + 16}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={500}
                    fill="var(--rotaract-pink)"
                    style={{ pointerEvents: 'none' }}
                  >
                    {st}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Legend({ totalStates }: { totalStates: number }) {
  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
      <h4 className="font-medium text-gray-900 mb-2">Leyenda:</h4>
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: 'var(--rotaract-blue)' }}
          />
          <span>Estados con clubes</span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: 'var(--rotaract-pink)' }}
          />
          <span>Estado seleccionado</span>
        </div>
      </div>
      <p className="text-xs text-gray-600 mt-2">
        * El tamaño del círculo representa el número de clubes. Haz clic para filtrar.
      </p>
      <p className="text-xs text-gray-500 mt-1">Estados mostrados: {totalStates}</p>
    </div>
  );
}

export default function Clubs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<StateKey | ''>('');

  // ====== DATA MOCK ======
  const clubsByState: ClubsByState = {
    Veracruz: [
      {
        id: 1,
        name: 'Rotaract Club Tierra Blanca',
        city: 'Veracruz',
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
        name: 'Rotaract Club Veleros',
        city: 'Boca del Río',
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
    Morelos: [
      {
        id: 2,
        name: 'Rotaract Club Cuautla Segundo Centenario',
        city: 'Cuautla',
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
        name: 'Rotaract Club Yautepec',
        city: 'Yautepec',
        president: 'Patricia López Ruiz',
        email: 'yautepec@rotaract.org',
        phone: '+52 33 3456 7890',
        members: 29,
        founded: '2008',
        points: 950,
        district: '4140',
        address: 'Av. Patria 1234, Yautepec'
      }
    ],
    Tlaxcala: [
      {
        id: 3,
        name: 'Rotaract Club Tlaxcala Tecnológico',
        city: 'Tlaxcala',
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
    Puebla: [
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
    Guerrero: [
      {
        id: 5,
        name: 'Rotaract Club Acapulco Costa',
        city: 'Acapulco',
        president: 'Laura Jiménez Castro',
        email: 'acapulco@rotaract.org',
        phone: '+52 66 4789 6321',
        members: 34,
        founded: '2000',
        points: 1150,
        district: '4100',
        address: 'Av. Costera 1234, Centro'
      }
    ]
  };

  const allClubs = useMemo(() => Object.values(clubsByState).flat(), [clubsByState]);

  const filteredClubs = useMemo(() => {
    const inState = selectedState ? clubsByState[selectedState] : allClubs;
    if (!searchTerm) return inState;
    const q = searchTerm.toLowerCase();
    return inState.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.president.toLowerCase().includes(q)
    );
  }, [allClubs, clubsByState, selectedState, searchTerm]);

 const counts: Record<StateKey, number> = useMemo(() => {
    return {
      Veracruz: clubsByState.Veracruz?.length || 0,
      Morelos: clubsByState.Morelos?.length || 0,
      Tlaxcala: clubsByState.Tlaxcala?.length || 0,
      Puebla: clubsByState.Puebla?.length || 0,
      Guerrero: clubsByState.Guerrero?.length || 0,
    };
  }, [clubsByState]);

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
            <MexicoMapComponent
              selected={selectedState}
              setSelected={setSelectedState}
              counts={counts}
              className="border rounded-lg bg-gradient-to-br from-blue-50 to-pink-50"
            />

            {/* Leyenda */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Leyenda:</h4>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'var(--rotaract-blue)' }} />
                  <span>Estados con clubes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'var(--rotaract-pink)' }} />
                  <span>Estado seleccionado</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                * El tamaño del círculo representa el número de clubes. Haz clic para filtrar.
              </p>
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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                    {STATE_LIST.filter((s) => counts[s] > 0).length}
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
                    <div className="text-sm text-gray-500">{club.address}</div>
                  </div>
                  <Badge
                    variant="outline"
                    style={{ borderColor: 'var(--rotaract-blue)', color: 'var(--rotaract-blue)' }}
                  >
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
            <p className="text-gray-400 text-sm mt-2">Intenta modificar los filtros o términos de búsqueda.</p>
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
