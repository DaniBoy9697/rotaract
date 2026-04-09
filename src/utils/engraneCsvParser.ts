/**
 * Parser de CSV para Engrane Challenge.
 * Formato esperado: primera fila = cabeceras (id, name, city, state, <subkey1>, <subkey2>, ...).
 * Filas siguientes: valores. Las columnas de puntuación deben coincidir con las subcategorías de engraneChallenge.ts.
 */

import {
  getFlattenedColumns,
  ENGrane_MONTHS,
  type ClubEngrane,
  type EngraneChallengeData,
  type ScoreMatrix,
} from '../config/engraneChallenge';

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if ((c === ',' && !inQuotes) || c === '\t') {
      result.push(current.trim());
      current = '';
    } else {
      current += c;
    }
  }
  result.push(current.trim());
  return result;
}

export function parseEngraneCsv(csvText: string): { data: EngraneChallengeData } | { error: string } {
  const lines = csvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length < 2) {
    return { error: 'El CSV debe tener al menos una fila de cabeceras y una de datos.' };
  }

  const flattened = getFlattenedColumns();
  const headerLine = lines[0];
  const headers = parseCsvLine(headerLine).map((h) => h.toLowerCase().replace(/\s+/g, '_'));

  const idxId = headers.findIndex((h) => h === 'id');
  const idxName = headers.findIndex((h) => h === 'name' || h === 'nombre');
  const idxCity = headers.findIndex((h) => h === 'city' || h === 'ciudad');
  const idxState = headers.findIndex((h) => h === 'state' || h === 'estado');

  if (idxId === -1 || idxName === -1) {
    return { error: 'El CSV debe tener columnas "id" y "name" (o "nombre").' };
  }

  const subKeyToMonth: Record<string, string> = {};
  for (const { monthKey, sub } of flattened) {
    subKeyToMonth[sub.key] = monthKey;
  }

  const scoreColIndices: { subKey: string; monthKey: string; index: number }[] = [];
  for (let i = 0; i < headers.length; i++) {
    const h = headers[i];
    if (h in subKeyToMonth) {
      scoreColIndices.push({ subKey: h, monthKey: subKeyToMonth[h], index: i });
    }
  }

  const clubs: ClubEngrane[] = [];
  const scores: Record<string, ScoreMatrix> = {};

  for (let rowIdx = 1; rowIdx < lines.length; rowIdx++) {
    const cells = parseCsvLine(lines[rowIdx]);
    const id = cells[idxId]?.trim();
    const name = cells[idxName]?.trim();
    if (!id || !name) continue;

    const clubId = String(id);
    clubs.push({
      id: clubId,
      name: name || '',
      city: idxCity >= 0 ? cells[idxCity]?.trim() : undefined,
      state: idxState >= 0 ? cells[idxState]?.trim() : undefined,
    });

    scores[clubId] = {};
    for (const month of ENGrane_MONTHS) {
      scores[clubId][month.key] = {};
      for (const col of flattened) {
        if (col.monthKey === month.key) {
          scores[clubId][month.key][col.sub.key] = 0;
        }
      }
    }
    for (const { subKey, monthKey, index } of scoreColIndices) {
      const raw = cells[index];
      const num = raw === '' || raw === undefined ? 0 : Number(raw);
      if (!Number.isNaN(num) && scores[clubId]?.[monthKey]) {
        scores[clubId][monthKey][subKey] = Math.max(0, num);
      }
    }
  }

  if (clubs.length === 0) {
    return { error: 'No se encontraron filas de clubes válidas (id y name requeridos).' };
  }

  return {
    data: { clubs, scores },
  };
}

/** Genera cabeceras CSV de ejemplo para plantilla */
export function getEngraneCsvHeaders(): string {
  const flattened = getFlattenedColumns();
  const headers = ['id', 'name', 'city', 'state', ...flattened.map((c) => c.sub.key)];
  return headers.join(',');
}
