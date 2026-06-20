import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
    email: {
        config: {
            provider: 'sendgrid', // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
            providerOptions: {
                apiKey: env('SENDGRID_API_KEY'), // TODO: crear api key y crear la variable de entorno.
            },
            settings: {
                defaultFrom: 'juliasedefdjian@strapi.io',
                defaultReplyTo: 'juliasedefdjian@strapi.io',
                testAddress: 'santiago.goncalvez.dev@gmail.com',
            },
        },
    },
});

export default config;
