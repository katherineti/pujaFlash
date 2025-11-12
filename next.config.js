/** @type {import('next').NextConfig} */
const nextConfig = {
  // CLAVE: Esto asegura que Next.js genere la carpeta 'out' para GitHub Pages.
//   output: 'export', 
  
  // CLAVE: Deshabilita la característica incompatible con el Static Export.
  // Esto evita que el compilador se queje si detecta la sintaxis 'use server'.
  experimental: {
    serverActions: false, // <-- SOLUCIÓN configuración que deshabilita las Server Actions:
  },

  // Opcional: Deshabilitar el logging de telemetría de Next.js
  // (Aunque esto no afecta la compilación, es buena práctica si no se va a usar un servidor)
  // devIndicators: {
  //   buildActivity: false,
  // },
};

module.exports = nextConfig;