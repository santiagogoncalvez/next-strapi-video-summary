import { changePasswordAction, forgotPasswordAction, loginUserAction, logoutUserAction, registerUserAction, resendConfirmEmailAction, resetPasswordAction } from "./auth";
import { updateProfileAction, updateProfileImageAction } from "./profile";
import { createSummaryAction } from "./summary";

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
      updateProfileImageAction,
   },
   summarize: {
      createSummaryAction,
   },
};