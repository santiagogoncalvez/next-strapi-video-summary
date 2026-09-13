"use client";

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { PROFILE_FORM_STYLES, SIGN_IN_FORM_STYLES } from "@/constants/styles";
import { useTheme } from "next-themes";

interface Props {
   className?: string;
}

export function AccountAppearanceSection({ className }: Readonly<Props>) {
   const { theme, setTheme } = useTheme();

   return (
      <div className={PROFILE_FORM_STYLES.container}>
         <div className={cn("w-full", className)}>
            <Card>
               <CardHeader className={SIGN_IN_FORM_STYLES.header}>
                  <CardTitle className={PROFILE_FORM_STYLES.title}>
                     Apariencia
                  </CardTitle>

                  <CardDescription>
                     Elegí cómo querés ver RESU y personalizá el tema de la
                     plataforma.
                  </CardDescription>
               </CardHeader>

               <CardContent className={PROFILE_FORM_STYLES.content}>
                  <div
                     className={cn(
                        PROFILE_FORM_STYLES.fieldGroup,
                        "flex items-center justify-between gap-6",
                     )}
                  >
                     <div className="space-y-1">
                        <Label htmlFor="theme">Tema</Label>
                        <p className="text-sm text-muted-foreground">
                           Seleccioná el tema que querés usar.
                        </p>
                     </div>

                     <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger
                           id="theme"
                           size="lg"
                           className="w-[160px]"
                        >
                           <SelectValue placeholder="Tema" />
                        </SelectTrigger>

                        <SelectContent position="popper" align="end">
                           <SelectItem value="system">Sistema</SelectItem>
                           <SelectItem value="light">Claro</SelectItem>
                           <SelectItem value="dark">Oscuro</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
