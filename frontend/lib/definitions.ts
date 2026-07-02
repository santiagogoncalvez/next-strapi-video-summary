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
