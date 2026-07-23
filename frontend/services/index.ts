import {
   changePasswordService,
   confirmEmailService,
   forgotPasswordService,
   loginUserService,
   registerUserService,
   resetPasswordService,
} from "./auth";
import { fileDeleteService, fileUploadService } from "./file";
import { updateProfileImageService, updateProfileService } from "./profile";
import {
   generateTranscript,
   generateSummary,
   saveSummaryService,
   updateSummaryService,
   deleteSummaryService,
} from "./summary";

export const services = {
   auth: {
      registerUserService,
      loginUserService,
      confirmEmailService,
      forgotPasswordService,
      resetPasswordService,
      changePasswordService,
   },
   profile: {
      updateProfileService,
      updateProfileImageService,
   },
   file: {
      fileUploadService,
      fileDeleteService,
   },
   summary: {
      generateTranscript,
      generateSummary,
      saveSummaryService,
      updateSummaryService,
      deleteSummaryService,
   },
};
