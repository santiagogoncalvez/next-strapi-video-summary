import { changePasswordAction, forgotPasswordAction, loginUserAction, logoutUserAction, registerUserAction, resendConfirmEmailAction, resetPasswordAction } from "./auth";
import { updateProfileAction } from "./profile";

export const actions = {
   auth: {
      registerUserAction,
      loginUserAction,
      logoutUserAction,
      resendConfirmEmailAction,
      forgotPasswordAction,
      resetPasswordAction,
      changePasswordAction,
   },
   profile: {
      updateProfileAction,
   },
};