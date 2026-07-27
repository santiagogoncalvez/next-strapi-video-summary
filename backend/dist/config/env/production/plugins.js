"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = ({ env, }) => ({
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
});
exports.default = config;
