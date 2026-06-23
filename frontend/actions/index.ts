import { loginUserAction, logoutUserAction, registerUserAction, resendConfirmEmailAction } from "./auth";

export const actions = {
    auth: {
        registerUserAction,
        loginUserAction,
        logoutUserAction,
        resendConfirmEmailAction,
    }
}