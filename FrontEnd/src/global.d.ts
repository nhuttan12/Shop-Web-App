//config for file css
declare module '*.css';

//config for svg file with extension ?react
declare module '*.svg?react' {
  import * as React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface ImportMetaEnv{
  readonly VITE_STATUS: string;
  readonly VITE_SERVER_PORT: string;
  readonly BACK_END_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}