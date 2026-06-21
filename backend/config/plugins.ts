import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
    email: {
        config: {
            provider: "sendgrid",
            providerOptions: {
                apiKey: env("SENDGRID_API_KEY"), // Required
            },
            settings: {
                defaultFrom: env("SENDGRID_EMAIL"),
                defaultReplyTo: env("SENDGRID_EMAIL"),
            },
        },
    },
});

export default config;
