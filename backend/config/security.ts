// config/security.ts
export default ({ env }) => ({
   contentSecurityPolicy: {
      useDefaults: true,
      directives: {
         "connect-src": ["'self'", "https:"],
         "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "res.cloudinary.com", // <--- Agrega esto aquí
         ],
         "media-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "res.cloudinary.com", // <--- Y aquí por si subes videos/audio
         ],
      },
   },
});
