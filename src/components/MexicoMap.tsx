import React, { useEffect, useMemo, useRef, useState } from 'react';

import { ReactComponent as MexicoSVG } from '../assets/mx.svg';

export type StateKey = 'Veracruz' | 'Morelos' | 'Tlaxcala' | 'Puebla' | 'Guerrero';

type MexicoMapProps = {
  selected: StateKey | '';
  setSelected: React.Dispatch<React.SetStateAction<StateKey | ''>>;
  counts: Record<StateKey, number>;
  className?: string;
};

/** Normaliza strings (quita acentos, mayúsculas, espacios) */
function norm(s: string) {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '');
}

/** Alias comunes que suelen venir en SVGs de México */
const ALIASES: Record<string, StateKey> = {
  // Veracruz
  'veracruz': 'Veracruz',
  'veracruzdeignaciodelallave': 'Veracruz',
  'mx-ver': 'Veracruz',
  'mxver': 'Veracruz',
  // Puebla
  'puebla': 'Puebla',
  'mx-pue': 'Puebla',
  'mxpue': 'Puebla',
  // Tlaxcala
  'tlaxcala': 'Tlaxcala',
  'mx-tla': 'Tlaxcala',
  'mxtla': 'Tlaxcala',
  // Morelos
  'morelos': 'Morelos',
  'mx-mor': 'Morelos',
  'mxmor': 'Morelos',
  // Guerrero
  'guerrero': 'Guerrero',
  'mx-gro': 'Guerrero',
  'mxgro': 'Guerrero',
};

/** Centroides fijos para viewBox 0 0 1000 630 (mx.svg). Se usan si el SVG no expone name/id por estado. */
const FALLBACK_CENTROIDS: Record<StateKey, { x: number; y: number }> = {
  Veracruz: { x: 760, y: 355 },
  Puebla: { x: 650, y: 320 },
  Tlaxcala: { x: 662, y: 298 },
  Morelos: { x: 618, y: 358 },
  Guerrero: { x: 558, y: 438 },
};

/** Intenta inferir el nombre del estado a partir de atributos típicos del path */
function inferStateKey(el: Element): StateKey | null {
  const candidates = [
    el.getAttribute('data-name'),
    el.getAttribute('name'),
    el.getAttribute('title'),
    el.getAttribute('id'),
    el.getAttribute('class'),
  ].filter(Boolean) as string[];

  for (const c of candidates) {
    const n = norm(c);
    if (n in ALIASES) return ALIASES[n];
    // a veces vienen separados por espacios, ej: "state mx-ver Puebla"
    const parts = n.split(/[^a-z]/g).filter(Boolean);
    for (const p of parts) {
      if (p in ALIASES) return ALIASES[p];
      // match directo con nombres sin acento
      if (['veracruz', 'puebla', 'tlaxcala', 'morelos', 'guerrero'].includes(p)) {
        return (p.charAt(0).toUpperCase() + p.slice(1)) as StateKey;
      }
    }
  }
  return null;
}

export default function MexicoMap({
  selected,
  setSelected,
  counts,
  className,
}: MexicoMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewBox, setViewBox] = useState<string | null>(null);

  /** Datos calc: bbox center por estado + referencia al elemento path del estado */
  const [centers, setCenters] = useState<
    Partial<Record<StateKey, { x: number; y: number }>>
  >({});
  const [pathByState, setPathByState] = useState<
    Partial<Record<StateKey, SVGGraphicsElement>>
  >({});

  // Escala del radio por conteo (suave)
  const getRadius = (count: number) => {
    if (!count) return 0;
    const base = 8;
    return base + Math.sqrt(count) * 4;
  };

  /** Colores */
  const colorActive = 'var(--rotaract-pink)';
  const colorBase = 'var(--rotaract-blue)';

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const svg: SVGSVGElement | null = root.querySelector('svg');
    if (!svg) return;

    // viewBox del SVG original (mx.svg usa 0 0 1000 630)
    const vb = svg.getAttribute('viewBox') || '0 0 1000 630';
    queueMicrotask(() => setViewBox(vb));

    // Selecciona shapes candidatos a estado
    const shapeSel = 'path, polygon, polyline';
    const shapes = Array.from(svg.querySelectorAll<SVGGraphicsElement>(shapeSel));

    const newCenters: Partial<Record<StateKey, { x: number; y: number }>> = {};
    const newPaths: Partial<Record<StateKey, SVGGraphicsElement>> = {};

    shapes.forEach((el) => {
      const key = inferStateKey(el);
      if (!key) return;

      try {
        const box = el.getBBox();
        const cx = box.x + box.width / 2;
        const cy = box.y + box.height / 2;

        newCenters[key] = { x: cx, y: cy };
        newPaths[key] = el;

        // Interacción: click para seleccionar
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => {
          setSelected((prev) => (prev === key ? '' : key));
        });
        // Hover (simple)
        el.addEventListener('mouseenter', () => {
          el.style.filter = 'brightness(1.05)';
        });
        el.addEventListener('mouseleave', () => {
          el.style.filter = '';
        });
      } catch {
        // algunos elementos pueden no soportar getBBox bien
      }
    });

    queueMicrotask(() => {
      setCenters(newCenters);
      setPathByState(newPaths);
    });

    // Limpieza (remover listeners si se desmonta o cambia el svg)
    return () => {
      shapes.forEach((el) => {
        const clone = el.cloneNode(true) as SVGGraphicsElement;
        el.replaceWith(clone);
      });
    };
  }, [/* se ejecuta una vez; si cambias el archivo svg, fuerza key en el wrapper */]);

  // Pintado de estados segun selección
  useEffect(() => {
    Object.entries(pathByState).forEach(([k, el]) => {
      const state = k as StateKey;
      const isActive = selected === state;
      el?.setAttribute('fill', isActive ? colorActive : colorBase);
      el?.setAttribute('fill-opacity', isActive ? '0.25' : '0.15');
      el?.setAttribute('stroke', isActive ? colorActive : colorBase);
      el?.setAttribute('stroke-opacity', '0.6');
      el?.setAttribute('stroke-width', isActive ? '3' : '2');
    });
  }, [selected, pathByState]);

  const overlayCircles = useMemo(() => {
    const items: Array<{
      key: StateKey;
      x: number;
      y: number;
      r: number;
      count: number;
    }> = [];

    (Object.keys(counts) as StateKey[]).forEach((st) => {
      const c = counts[st] || 0;
      if (c <= 0) return;
      // Usar centro del SVG si existe, si no centroide fijo para viewBox 1000x630
      const center = centers[st] ?? FALLBACK_CENTROIDS[st];
      if (!center) return;
      items.push({
        key: st,
        x: center.x,
        y: center.y,
        r: getRadius(c),
        count: c,
      });
    });

    return items;
  }, [counts, centers]);


  return (
    <div ref={containerRef} className={`relative ${className ?? ''}`}>
      {/* SVGR - mapa base */}
      <MexicoSVG className="w-full h-auto select-none block" />

      {/* Fallback si usaras raw string:
      <div
        className="w-full h-auto select-none"
        dangerouslySetInnerHTML={{ __html: rawSvg }}
      />
      */}

      {/* Capa overlay: misma viewBox, posición absoluta para alinear pines con el mapa */}
      {viewBox && (
        <svg
          viewBox={viewBox}
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {overlayCircles.map(({ key, x, y, r, count }) => {
            const isActive = selected === key;
            return (
              <g key={key}>
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill={isActive ? colorActive : colorBase}
                  fillOpacity={isActive ? 0.85 : 0.7}
                  stroke="white"
                  strokeWidth={2}
                  // Para permitir click, ponemos pointer-events en el círculo
                  className="pointer-events-auto cursor-pointer"
                  onClick={() => setSelected(isActive ? '' : key)}
                />
                <text
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  fontSize={14}
                  fontWeight={700}
                  fill="white"
                >
                  {count}
                </text>
                <text
                  x={x}
                  y={y + r + 16}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={500}
                  fill={colorActive}
                >
                  {key}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
