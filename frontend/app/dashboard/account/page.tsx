import { ProfileForm } from "@/components/form/profile-form";
import { ProfileImageForm } from "@/components/form/profile-image-form";
import { requireSession } from "@/lib/dal";
import { getUserMeService } from "@/services/auth";

export default async function AccountPage() {
   await requireSession();
   const user = await getUserMeService();
   const userImage = user?.image;

   return (
      <div className="flex flex-row gap-8 w-full max-w-full px-28">
         <ProfileForm user={user} className="" />
         <ProfileImageForm image={userImage} className="" />
      </div>
   );
}
