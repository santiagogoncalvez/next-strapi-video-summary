"use client";
import { cn } from "@/lib/utils";
import { AuthUser } from "@/types/strapi";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { SubmitButton } from "./submit-button";

interface ProfileFormProps {
   user?: AuthUser | null;
}

const styles = {
   form: "space-y-4 w-full",
   container: "space-y-4 flex flex-col w-full",
   topRow: "flex gap-4",
   nameRow: "flex gap-4",
   fieldGroup: "space-y-2 w-full",
   textarea: "resize-none border rounded-md w-full h-[224px] p-2",
   buttonContainer: "flex justify-end",
   countBox:
      "flex items-center justify-center h-8 w-full rounded-md border border-input/80 bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/90 focus-visible:outline-none",
   creditText: "font-bold text-md mx-1",
};

export function ProfileForm({
   user,
   className,
}: ProfileFormProps & {
   readonly className?: string;
}) {
   if (!user) {
      return (
         <div className={cn(styles.form, className)}>
            <p>No se pudieron cargar los datos del perfil.</p>
         </div>
      );
   }

   return (
      <form className={cn(styles.form, className)}>
         <div className={styles.container}>
            <div className={styles.topRow}>
               <Input
                  id="username"
                  name="username"
                  placeholder="pablo"
                  defaultValue={user.username || ""}
                  disabled
               />
               <Input
                  id="email"
                  name="email"
                  placeholder="pablo@gmail.com"
                  defaultValue={user.email || ""}
                  disabled
               />
               <CountBox text={user.credits || 0} />
            </div>

            <div className={styles.nameRow}>
               <div className={styles.fieldGroup}>
                  <Input
                     id="firstName"
                     name="firstName"
                     placeholder="Primer nombre"
                     defaultValue={user.firstName || ""}
                  />
               </div>
               <div className={styles.fieldGroup}>
                  <Input
                     id="lastName"
                     name="lastName"
                     placeholder="Segundo nombre"
                     defaultValue={user.lastName || ""}
                  />
               </div>
            </div>
            <div className={styles.fieldGroup}>
               <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Escribe tu biografía aquí..."
                  className={styles.textarea}
                  defaultValue={user.bio || ""}
               />
            </div>
         </div>
         <div className={styles.buttonContainer}>
            <SubmitButton
               text="Actualizar perfil"
               loadingText="Guardando perfil"
            />
         </div>
      </form>
   );
}

function CountBox({ text }: { text: number }) {
   const color = "text-primary";
   return (
      <div className={styles.countBox}>
         Tú tienes<span className={cn(styles.creditText, color)}>{text}</span>
         crédito(s)
      </div>
   );
}
