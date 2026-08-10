import { Skeleton } from "@/components/ui/skeleton";

const styles = {
   container: "flex flex-col gap-8 w-2xl h-fit",
   profileForm: "space-y-4",
   profileImage: "space-y-4",
   skeleton: "animate-pulse",
   title: "h-8 w-1/3",
   input: "h-10 w-full",
   textarea: "h-24 w-full",
   button: "h-10 w-24",
   imageContainer: "h-48 w-full rounded-2xl",
};

export default function AccountLoading() {
   return (
      <div className="flex h-fit w-full justify-center items-center">
         <div className={styles.container}>
            {/* Profile Form Skeleton */}
            <div className={styles.profileForm}>
               <Skeleton className={`${styles.skeleton} ${styles.title}`} />
               <Skeleton className={`${styles.skeleton} ${styles.input}`} />
               <Skeleton className={`${styles.skeleton} ${styles.input}`} />
               <Skeleton className={`${styles.skeleton} ${styles.input}`} />
               <Skeleton className={`${styles.skeleton} ${styles.input}`} />
               <Skeleton className={`${styles.skeleton} ${styles.textarea}`} />
               <Skeleton className={`${styles.skeleton} ${styles.button}`} />
            </div>

            {/* Profile Image Skeleton */}
            <div className={styles.profileImage}>
               <Skeleton className={`${styles.skeleton} ${styles.title}`} />
               <Skeleton
                  className={`${styles.skeleton} ${styles.imageContainer}`}
               />
               <Skeleton className={`${styles.skeleton} ${styles.button}`} />
            </div>
         </div>
      </div>
   );
}
