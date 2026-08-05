import {
   Card,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";

import { SIGN_IN_FORM_STYLES } from "@/constants/styles";
import { AppLink } from "./custom-link";

interface EmptyStateCardProps {
   title: string;
   description: string;
}

export function EmptySummaries({
   title,
   description,
}: Readonly<EmptyStateCardProps>) {
   return (
      <Card>
         <CardHeader className={SIGN_IN_FORM_STYLES.header}>
            <CardTitle className={SIGN_IN_FORM_STYLES.title}>{title}</CardTitle>

            <CardDescription className="text-center">
               {description}
            </CardDescription>
         </CardHeader>
         <CardFooter className={`${SIGN_IN_FORM_STYLES.footer}`}>
            <AppLink href="/dashboard" variant="outline">
               Crear nuevo resumen
            </AppLink>
         </CardFooter>
      </Card>
   );
}
