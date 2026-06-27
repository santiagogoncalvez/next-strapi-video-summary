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
    user?: any;
    expiresAt?: Date;
    jwt?: string;
};