"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = ({ env }) => ({
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
exports.default = config;
