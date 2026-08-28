"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
   CircleCheckIcon,
   InfoIcon,
   TriangleAlertIcon,
   Loader2Icon,
   XCircleIcon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
   const { theme = "system" } = useTheme();

   return (
      <Sonner
         theme={theme as ToasterProps["theme"]}
         className="toaster group"
         icons={{
            success: <CircleCheckIcon className="size-4" strokeWidth={1.5} />,
            info: <InfoIcon className="size-4" strokeWidth={1.5} />,
            warning: <TriangleAlertIcon className="size-4" strokeWidth={1.5} />,
            error: <XCircleIcon className="size-4" strokeWidth={1.5} />,
            loading: (
               <Loader2Icon className="size-4 animate-spin" strokeWidth={1.5} />
            ),
         }}
         style={
            {
               "--normal-bg": "var(--popover)",
               "--normal-text": "var(--popover-foreground)",
               "--normal-border": "var(--border)",
               "--border-radius": "var(--radius)",
               //  "box-shadow": "none !important",
            } as React.CSSProperties
         }
         toastOptions={{
            classNames: {
               toast: "cn-toast shadow-xs! font-geist",
            },
         }}
         {...props}
      />
   );
};

export { Toaster };
