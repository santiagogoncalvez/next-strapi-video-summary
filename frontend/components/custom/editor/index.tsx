"use client";

import { useState } from "react";

import { EditorWrapper } from "@/components/custom/editor/editor-wrapper";
import { DeleteButton } from "@/components/custom/delete-button";

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { SubmitButton } from "@/components/form/submit-button";
import { FormError } from "@/components/form/form-error";

import { Summary } from "@/types/strapi";
import { SUMMARY_UPDATE_FORM_STYLES } from "@/constants/styles";

interface SummaryUpdateFormProps {
   summary: Summary;
}

export function SummaryUpdateForm({
   summary,
}: Readonly<SummaryUpdateFormProps>) {
   const [content, setContent] = useState(summary.content);

   return (
      <div className={SUMMARY_UPDATE_FORM_STYLES.container}>
         <form className="w-full">
            <Card>
               <CardHeader className={SUMMARY_UPDATE_FORM_STYLES.header}>
                  <CardTitle className={SUMMARY_UPDATE_FORM_STYLES.title}>
                     Editar resumen
                  </CardTitle>

                  <CardDescription>
                     Modifica el título o el contenido de tu resumen antes de
                     guardarlo.
                  </CardDescription>
               </CardHeader>

               <CardContent className={SUMMARY_UPDATE_FORM_STYLES.content}>
                  <div className={SUMMARY_UPDATE_FORM_STYLES.fieldGroup}>
                     <Label htmlFor="title">Título</Label>

                     <Input
                        id="title"
                        name="title"
                        placeholder="Título del resumen"
                        defaultValue={summary.title}
                     />

                     {/* Más adelante */}
                     <FormError error={undefined} />
                  </div>

                  <div className={SUMMARY_UPDATE_FORM_STYLES.fieldGroup}>
                     <Label>Contenido</Label>

                     <input type="hidden" name="content" value={content} />

                     <EditorWrapper
                        markdown={summary.content}
                        onChange={setContent}
                        className={SUMMARY_UPDATE_FORM_STYLES.editor}
                     />

                     {/* Más adelante */}
                     <FormError error={undefined} />
                  </div>
               </CardContent>

               <CardFooter className={SUMMARY_UPDATE_FORM_STYLES.footer}>
                  <DeleteButton
                     className={SUMMARY_UPDATE_FORM_STYLES.deleteButton}
                  />

                  <SubmitButton
                     className={SUMMARY_UPDATE_FORM_STYLES.submitButton}
                     text="Guardar cambios"
                     loadingText="Guardando cambios"
                  />
               </CardFooter>
            </Card>
         </form>
      </div>
   );
}
