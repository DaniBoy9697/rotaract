/**
 * Configuración del Engrane Challenge según la estructura tipo Excel:
 * meses → categorías → subcategorías con puntos máximos.
 * El admin asigna puntos por club en cada subcategoría.
 */

export type Subcategory = {
  key: string;
  label: string;
  maxPoints: number;
};

export type Category = {
  key: string;
  label: string;
  subcategories: Subcategory[];
};

export type MonthConfig = {
  key: string;
  label: string;
  headerColor: string; // para estilo tipo Excel (azul JULIO, naranja AGOSTO)
  categories: Category[];
};

export const ENGrane_MONTHS: MonthConfig[] = [
  {
    key: 'julio',
    label: 'JULIO',
    headerColor: '#2196F3',
    categories: [
      {
        key: 'pago_cuota_julio',
        label: 'Pago Cuota Distrital',
        subcategories: [
          { key: 'tesoreria_julio', label: 'Tesorería', maxPoints: 100 },
          { key: 'dei_julio', label: 'DEI', maxPoints: 30 },
        ],
      },
      {
        key: 'junta_julio',
        label: 'Junta',
        subcategories: [
          { key: 'serv_internacional_julio', label: 'Serv. Internacional', maxPoints: 30 },
          { key: 'protocolo_julio', label: 'Protocolo', maxPoints: 30 },
          { key: 'capacitacion_julio', label: 'Capacitación', maxPoints: 50 },
        ],
      },
      {
        key: 'fomento_profesional_julio',
        label: 'Fomento Profesional',
        subcategories: [
          { key: 'servicio_club_julio', label: 'Servicio al Club', maxPoints: 100 },
        ],
      },
      {
        key: 'pago_cuota_julio_2',
        label: 'Pago Cuota Distrital (2)',
        subcategories: [
          { key: 'tesoreria_julio_2', label: 'Tesorería', maxPoints: 50 },
        ],
      },
      {
        key: 'asistencia_junta_julio',
        label: 'Asistencia Junta',
        subcategories: [
          { key: 'secretaria_julio', label: 'Secretaría', maxPoints: 30 },
        ],
      },
    ],
  },
  {
    key: 'agosto',
    label: 'AGOSTO',
    headerColor: '#FF9800',
    categories: [
      {
        key: 'junta_agosto',
        label: 'Junta',
        subcategories: [
          { key: 'medio_ambiente_agosto', label: 'Medio Ambiente', maxPoints: 30 },
          { key: 'servicio_comunidad_agosto', label: 'Servicio a la Comunidad', maxPoints: 30 },
          { key: 'membresia_agosto', label: 'Membresía', maxPoints: 30 },
          { key: 'imagen_publica_agosto', label: 'Imagen Pública', maxPoints: 30 },
          { key: 'servicio_club_agosto', label: 'Servicio al Club', maxPoints: 30 },
          { key: 'fundacion_rotaria_agosto', label: 'Fundación Rotaria', maxPoints: 30 },
          { key: 'honor_justicia_agosto', label: 'Honor y Justicia', maxPoints: 30 },
        ],
      },
      {
        key: 'reporte_boletin_agosto',
        label: 'Reporte Boletín',
        subcategories: [
          { key: 'imagen_boletin_agosto', label: 'Imagen', maxPoints: 30 },
          { key: 'serv_club_boletin_agosto', label: 'Serv. Club', maxPoints: 30 },
          { key: 'serv_co_boletin_agosto', label: 'Serv. Co', maxPoints: 30 },
        ],
      },
    ],
  },
];

/** Todas las columnas de puntuación en orden (para tabla admin): mes → categoría → subcategoría */
export function getFlattenedColumns(): { monthKey: string; categoryKey: string; sub: Subcategory }[] {
  const cols: { monthKey: string; categoryKey: string; sub: Subcategory }[] = [];
  for (const month of ENGrane_MONTHS) {
    for (const cat of month.categories) {
      for (const sub of cat.subcategories) {
        cols.push({ monthKey: month.key, categoryKey: cat.key, sub });
      }
    }
  }
  return cols;
}

export type ClubEngrane = {
  id: string | number;
  name: string;
  city?: string;
  state?: string;
};

/** Puntuación por club: [monthKey][subcategoryKey] = puntos */
export type ScoreMatrix = Record<string, Record<string, number>>;

export type EngraneChallengeData = {
  clubs: ClubEngrane[];
  scores: Record<string, ScoreMatrix>; // clubId -> monthKey -> subKey -> points
};

/** Calcula el total de puntos de un club a partir de la matriz de scores */
export function getClubTotalPoints(
  clubId: string | number,
  scores: Record<string, ScoreMatrix>
): number {
  const byMonth = scores[String(clubId)];
  if (!byMonth) return 0;
  let total = 0;
  for (const month of Object.values(byMonth)) {
    for (const pts of Object.values(month)) {
      total += Number(pts) || 0;
    }
  }
  return total;
}
