import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  Trophy,
  MapPin,
  Star,
  Medal,
  Crown,
  Table2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  ENGrane_MONTHS,
  getFlattenedColumns,
  getClubTotalPoints,
  type ClubEngrane,
  type EngraneChallengeData,
  type ScoreMatrix,
} from '../config/engraneChallenge';

const WORDPRESS_CONFIG = {
  apiUrl: process.env.REACT_APP_WORDPRESS_API || '',
  jwtEndpoint: process.env.REACT_APP_JWT_ENDPOINT || '',
};
const ENGrane_API = `${WORDPRESS_CONFIG.apiUrl}/wp-json/rotaract/v1/engrane-challenge`;

/** Clubes por defecto cuando no hay API (mismo listado que antes) */
const MOCK_CLUBS: ClubEngrane[] = [
  { id: 1, name: 'Rotaract Club Monterrey Tecnológico', city: 'Monterrey', state: 'Nuevo León' },
  { id: 2, name: 'Rotaract Club Ciudad de México Centro', city: 'Ciudad de México', state: 'CDMX' },
  { id: 3, name: 'Rotaract Club Guadalajara Metropolitan', city: 'Guadalajara', state: 'Jalisco' },
  { id: 4, name: 'Rotaract Club Tijuana Frontera', city: 'Tijuana', state: 'Baja California' },
  { id: 5, name: 'Rotaract Club Puebla Colonial', city: 'Puebla', state: 'Puebla' },
  { id: 6, name: 'Rotaract Club Mérida Histórico', city: 'Mérida', state: 'Yucatán' },
  { id: 7, name: 'Rotaract Club Apizaco', city: 'Apizaco', state: 'Tlaxcala' },
  { id: 8, name: 'Rotaract Club Chignautla', city: 'Chignautla', state: 'Puebla' },
  { id: 9, name: 'Rotaract Club Jardines de Cuernavaca', city: 'Cuernavaca', state: 'Morelos' },
];

function emptyScores(clubIds: (string | number)[]): Record<string, ScoreMatrix> {
  const o: Record<string, ScoreMatrix> = {};
  for (const id of clubIds) {
    o[String(id)] = {};
    for (const month of ENGrane_MONTHS) {
      o[String(id)][month.key] = {};
      for (const cat of month.categories) {
        for (const sub of cat.subcategories) {
          o[String(id)][month.key][sub.key] = 0;
        }
      }
    }
  }
  return o;
}

export default function Ranking() {
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('points');
  const [clubs, setClubs] = useState<ClubEngrane[]>(MOCK_CLUBS);
  const [scores, setScores] = useState<Record<string, ScoreMatrix>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTable, setShowTable] = useState(false);

  const flattenedCols = useMemo(() => getFlattenedColumns(), []);

  const loadFromWordPress = async () => {
    if (!WORDPRESS_CONFIG.apiUrl) {
      setClubs(MOCK_CLUBS);
      setScores(emptyScores(MOCK_CLUBS.map((c) => c.id)));
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.get<EngraneChallengeData>(ENGrane_API);
      if (Array.isArray(res.data?.clubs) && res.data.clubs.length > 0) {
        setClubs(res.data.clubs);
        setScores(res.data.scores || emptyScores(res.data.clubs.map((c) => c.id)));
      } else {
        setClubs(MOCK_CLUBS);
        setScores(emptyScores(MOCK_CLUBS.map((c) => c.id)));
      }
      setError(null);
    } catch (err) {
      console.error('Error loading Engrane Challenge from WordPress:', err);
      setClubs(MOCK_CLUBS);
      setScores(emptyScores(MOCK_CLUBS.map((c) => c.id)));
      setError('No se pudo cargar desde el servidor. Mostrando datos de ejemplo.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFromWordPress();
  }, []);

  const getScore = (clubId: string | number, monthKey: string, subKey: string): number => {
    const byMonth = scores[String(clubId)];
    if (!byMonth) return 0;
    const bySub = byMonth[monthKey];
    return bySub?.[subKey] ?? 0;
  };

  const rankedClubs = useMemo(() => {
    const withTotal = clubs.map((c) => ({
      ...c,
      points: getClubTotalPoints(c.id, scores),
    }));
    if (sortBy === 'name') {
      return [...withTotal].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }
    return [...withTotal].sort((a, b) => b.points - a.points);
  }, [clubs, scores, sortBy]);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--rotaract-pink)' }} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Trophy className="w-8 h-8" style={{ color: 'var(--rotaract-pink)' }} />
          <h1 className="text-4xl font-bold text-gray-900">Engrane Challenge</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Clasificación por puntos obtenidos en actividades por mes: cuota distrital, juntas, fomento profesional,
          asistencia y reportes. Los puntajes se actualizan según la tabla por categorías.
        </p>
        {error && (
          <p className="text-sm text-amber-700 bg-amber-50 px-4 py-2 rounded-md max-w-2xl mx-auto">{error}</p>
        )}
      </div>

      {/* Filtros y modo vista */}
      <Card className="bg-gradient-to-r from-pink-50 to-blue-50 border-pink-200">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Label className="text-sm font-medium">Ordenar por</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="points">Puntos tot.</SelectItem>
                  <SelectItem value="name">Nombre</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTable(!showTable)}
                style={{ borderColor: 'var(--rotaract-blue)', color: 'var(--rotaract-blue)' }}
              >
                <Table2 className="w-4 h-4 mr-2" />
                {showTable ? 'Ocultar tabla' : 'Ver tabla por categorías'}
                {showTable ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
              </Button>
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
              <div className="flex justify-center mb-2">{getRankIcon(index)}</div>
              <Badge className={`mx-auto ${getRankBadge(index).className}`}>
                {getRankBadge(index).text}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <h3 className="font-bold text-lg">{club.name}</h3>
              {(club.city || club.state) && (
                <div className="flex items-center justify-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{[club.city, club.state].filter(Boolean).join(', ')}</span>
                </div>
              )}
              <div className="text-2xl font-bold" style={{ color: 'var(--rotaract-pink)' }}>
                {club.points} pts
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ranking completo */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ranking completo</h2>
        {rankedClubs.map((club, index) => (
          <Card key={club.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-6">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg ${
                      index < 3 ? 'text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                    style={index < 3 ? { backgroundColor: 'var(--rotaract-pink)' } : {}}
                  >
                    {index + 1}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900">{club.name}</h3>
                    {(club.city || club.state) && (
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{[club.city, club.state].filter(Boolean).join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {index < 3 && getRankIcon(index)}
                  <span className="text-2xl font-bold" style={{ color: 'var(--rotaract-pink)' }}>
                    {club.points}
                  </span>
                  <span className="text-gray-500">pts</span>
                  {index < 3 && (
                    <Badge className={getRankBadge(index).className}>
                      {getRankBadge(index).text}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabla pública por categorías (solo lectura) */}
      {showTable && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Table2 className="w-5 h-5" />
              Puntajes por mes y categoría
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left font-semibold sticky left-0 bg-gray-100 z-10 min-w-[200px]">
                    Club Rotaract
                  </th>
                  {ENGrane_MONTHS.map((month) => (
                    <th
                      key={month.key}
                      colSpan={month.categories.reduce((n, c) => n + c.subcategories.length, 0)}
                      className="border border-gray-300 p-2 text-center font-semibold text-white"
                      style={{ backgroundColor: month.headerColor }}
                    >
                      {month.label}
                    </th>
                  ))}
                  <th className="border border-gray-300 p-2 font-semibold bg-gray-200">Total</th>
                </tr>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-1 sticky left-0 bg-gray-50 z-10" />
                  {flattenedCols.map(({ sub }) => (
                    <th
                      key={sub.key}
                      className="border border-gray-300 p-1 font-normal text-gray-700"
                    >
                      {sub.label}
                    </th>
                  ))}
                  <th className="border border-gray-300 p-1 font-normal">Total</th>
                </tr>
              </thead>
              <tbody>
                {rankedClubs.map((club) => (
                  <tr key={club.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2 sticky left-0 bg-white font-medium">
                      {club.name}
                    </td>
                    {flattenedCols.map(({ monthKey, sub }) => (
                      <td key={`${club.id}-${monthKey}-${sub.key}`} className="border border-gray-300 p-2 text-center">
                        {getScore(club.id, monthKey, sub.key) || '-'}
                      </td>
                    ))}
                    <td className="border border-gray-300 p-2 font-semibold text-center" style={{ color: 'var(--rotaract-pink)' }}>
                      {club.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Info sistema de puntuación 
      <Card className="bg-gradient-to-r from-pink-50 to-yellow-50 border-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5" style={{ color: 'var(--rotaract-pink)' }} />
            <span>Sistema de puntuación Engrane Challenge</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Los puntos se asignan por mes en cada categoría: Pago Cuota Distrital (Tesorería, DEI), Junta
            (Serv. Internacional, Protocolo, Capacitación, etc.), Fomento Profesional, Asistencia Junta,
            Reporte Boletín. Cada subcategoría tiene un máximo de puntos; el administrador carga los
            puntajes obtenidos por cada club.
          </p>
          <p className="text-sm text-gray-600">
            <strong>WordPress:</strong> Para guardar y cargar los datos, configura en tu backend el endpoint{' '}
            <code className="bg-gray-200 px-1 rounded">GET/POST wp-json/rotaract/v1/engrane-challenge</code> y
            la autenticación JWT. El cuerpo del POST debe ser{' '}
            <code className="bg-gray-200 px-1 rounded">{'{ clubs, scores }'}</code>.
          </p>
        </CardContent>
      </Card>*/}
    </div>
  );
}
