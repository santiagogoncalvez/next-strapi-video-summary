export interface NavBarLinks {
    link: { href: string; label: string };
    secondaryLink: { href: string; label: string };
}

export type Credentials = {
    username?: string;
    email?: string;
    identifier?: string;
    currentPassword?: string;
    password?: string;
    confirmPassword?: string;
    newPassword?: string;
    code?: string;
    passwordConfirmation?: string;
};

// Form state for form handling and server actions
// export type FormState = {
//     errors: Credentials;
//     values: Credentials;
//     message?: string;
//     success?: boolean;
// };

export type SessionPayload = {
    user: User;
    expiresAt: Date;
    jwt: Jwt;
};

export type Jwt = string;

export interface StrapiLoginResponse {
    jwt: Jwt;
    user: User;
}

export interface User {
    id: number
    documentId: string
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
    publishedAt: string
}
