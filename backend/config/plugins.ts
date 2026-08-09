import type { Core } from "@strapi/strapi";

const config = ({
   env,
}: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
   email: {
      config: {
         provider: "sendgrid",
         providerOptions: {
            apiKey: env("SENDGRID_API_KEY"),
         },
         settings: {
            defaultFrom: env("SENDGRID_EMAIL"),
            defaultReplyTo: env("SENDGRID_EMAIL"),
         },
      },
   },

   ...(env("APP_RUNTIME") === "remote" && {
      upload: {
         config: {
            provider: "cloudinary",
            providerOptions: {
               cloud_name: env("CLOUDINARY_NAME"),
               api_key: env("CLOUDINARY_KEY"),
               api_secret: env("CLOUDINARY_SECRET"),
            },
            actionOptions: {
               upload: {},
               delete: {},
            },
         },
      },
   }),
});

export default config;
