import { changePasswordAction, forgotPasswordAction, loginUserAction, logoutUserAction, registerUserAction, resendConfirmEmailAction, resetPasswordAction } from "./auth";

export const actions = {
    auth: {
        registerUserAction,
        loginUserAction,
        logoutUserAction,
        resendConfirmEmailAction,
        forgotPasswordAction,
        resetPasswordAction,
        changePasswordAction
    }
}