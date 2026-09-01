import {
   changePasswordService,
   confirmEmailService,
   forgotPasswordService,
   loginUserService,
   registerUserService,
   resetPasswordService,
} from "./auth";
import { addFavoriteSummaryService } from "./favorite/add-favorite-summary";
import { deleteFavoriteSummaryService } from "./favorite/delete-favorite-summary";
import { fileDeleteService, fileUploadService } from "./file";
import { updateProfileImageService, updateProfileService } from "./profile";
import {
   generateTranscript,
   generateSummary,
   saveSummaryService,
   updateSummaryService,
   deleteSummaryService,
   countTokens,
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
      countTokens
   },
   favorite:{
deleteFavoriteSummaryService,
addFavoriteSummaryService
   }
};
