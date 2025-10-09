declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FC<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  const src: string; // para import default si lo necesitaras
  export default src;
}