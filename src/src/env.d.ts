/// <reference types="astro/client" />

// Opcional: si usas otros tipos personalizados
declare module '*.astro' {
  const component: any;
  export default component;
}