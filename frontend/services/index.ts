import { loginUserService, registerUserService } from "./auth";
import { updateProfileService } from "./profile";



export const services = {
   auth: {
      registerUserService,
      loginUserService,
   },
   profile: {
      updateProfileService,
   },
};
