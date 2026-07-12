import { ProfileForm } from "@/components/form/profile-form";
import { ProfileImageForm } from "@/components/form/profile-image-form";
import { requireSession } from "@/lib/dal";

export default async function AccountPage() {
   const { user } = await requireSession();
   console.log("user accoun page:", user);
   const userImage = user?.image;

   return (
      <div className="flex flex-row gap-8 w-full max-w-full px-28">
         <ProfileForm user={user} className="" />
         <ProfileImageForm image={userImage} className="" />
      </div>
   );
}
