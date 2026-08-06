import {
   Card,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";

import { SIGN_IN_FORM_STYLES } from "@/constants/styles";
import { ReactNode } from "react";

interface EmptyStateCardProps {
   title: string;
   description: string;
   action?: ReactNode;
}

export function EmptySummaries({
   title,
   description,
   action,
}: Readonly<EmptyStateCardProps>) {
   return (
      <Card>
         <CardHeader className={SIGN_IN_FORM_STYLES.header}>
            <CardTitle className={SIGN_IN_FORM_STYLES.title}>{title}</CardTitle>

            <CardDescription className="text-center">
               {description}
            </CardDescription>
         </CardHeader>
         {action && (
            <CardFooter className={SIGN_IN_FORM_STYLES.footer}>
               {action}
            </CardFooter>
         )}
      </Card>
   );
}
