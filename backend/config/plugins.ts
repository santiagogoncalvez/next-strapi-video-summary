import type { Core } from "@strapi/strapi";

const config = ({
   env,
}: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
   email: {
      config: {
         provider: "strapi-provider-email-brevo",
         providerOptions: {
            apiKey: env("BREVO_API_KEY"),
         },
         settings: {
            defaultSenderEmail: env("DEFAULT_SENDER_EMAIL"),
            defaultSenderName: env("DEFAULT_SENDER_NAME"),
            defaultReplyTo: env("DEFAULT_REPLY_TO"),
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
