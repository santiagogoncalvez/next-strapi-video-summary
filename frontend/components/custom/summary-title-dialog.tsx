"use client";

import { useCallback } from "react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { SummaryTitleForm } from "../form/summary-title-form";

interface SummaryTitleDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   title?: string;
   documentId?: string;
}

export function SummaryTitleDialog({
   open,
   onOpenChange,
   title,
   documentId,
}: Readonly<SummaryTitleDialogProps>) {
   const handleSuccess = useCallback(() => {
      onOpenChange(false);
   }, [onOpenChange]);

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="sm:max-w-md">
            <DialogHeader>
               <DialogTitle className="text-center">Cambiar nombre</DialogTitle>

               <DialogDescription className="text-center">
                  Elegí un nombre para identificar este resumen.
               </DialogDescription>
            </DialogHeader>

            <SummaryTitleForm
               title={title}
               documentId={documentId}
               onCancel={() => onOpenChange(false)}
               onSuccess={handleSuccess}
            />
         </DialogContent>
      </Dialog>
   );
}
