"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = ({ env }) => ({
    email: {
        config: {
            provider: 'sendgrid', // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
            providerOptions: {
                apiKey: env('SENDGRID_API_KEY'), // TODO: crear api key y crear la variable de entorno. Hacerlo
            },
            settings: {
                defaultFrom: 'juliasedefdjian@strapi.io',
                defaultReplyTo: 'juliasedefdjian@strapi.io',
                testAddress: 'santiago.goncalvez.dev@gmail.com',
            },
        },
    },
});
exports.default = config;
