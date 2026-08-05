import { AccountSecuritySection } from "@/components/custom/account-security-section";
import { ProfileForm } from "@/components/form/profile-form";
import { ProfileImageForm } from "@/components/form/profile-image-form";
import { getUserMeService } from "@/services/auth";

export default async function AccountPage() {
   const user = await getUserMeService();
   const userImage = user?.image;

   return (
      <div className="flex flex-col gap-8 max-w-full  items-center justify-center h-fit">
         <ProfileForm user={user} className="" />
         <ProfileImageForm image={userImage} className="" />
         <AccountSecuritySection />
      </div>
   );
}
