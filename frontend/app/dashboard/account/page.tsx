import { ProfileForm } from "@/components/form/profile-form";
import { requireSession } from "@/lib/dal";
// import { ProfileImageForm } from "@/components/forms/profile-image-form";

export default async function AccountRoute() {
   const { user } = await requireSession();

   return (
      <div className="flex gap-4 w-full max-w-full px-20">
         <ProfileForm user={user} className="col-span-3" />
         {/* <ProfileImageForm image={userImage} className="col-span-2" /> */}
      </div>
   );
}
