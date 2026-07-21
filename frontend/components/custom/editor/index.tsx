"use client";
import { useState } from "react";
import { EditorWrapper } from "@/components/custom/editor/editor-wrapper";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/form/submit-button";
import { DeleteButton } from "../delete-button";
import { Summary } from "@/types/strapi";

interface SummaryUpdateFormProps {
   summary: Summary;
}

const styles = {
   container: "flex flex-col relative overflow-hidden",
   titleInput: "mb-3",
   editor: "h-200 overflow-y-auto",
   buttonContainer: "mt-3",
   updateButton: "inline-block",
   deleteFormContainer: "absolute bottom-0 right-2",
   deleteButton: "",
};

export function SummaryUpdateForm({ summary }: SummaryUpdateFormProps) {
   const [content, setContent] = useState(summary.content);

   return (
      <div className={styles.container}>
         <form>
            <Input
               id="title"
               name="title"
               type="text"
               placeholder={"Title"}
               defaultValue={summary.title || ""}
               className={styles.titleInput}
            />

            <input type="hidden" name="content" value={content} />

            <div>
               <EditorWrapper
                  markdown={summary.content}
                  onChange={setContent}
                  className={styles.editor}
               />
            </div>

            <div className={styles.buttonContainer}>
               <div className={styles.updateButton}>
                  <SubmitButton
                     text="Actualizar resumen"
                     loadingText="Actualizando resumen"
                  />
               </div>
            </div>
         </form>

         <div className={styles.deleteFormContainer}>
            <form onSubmit={() => console.log("DELETE FORM SUBMITTED")}>
               <DeleteButton className={styles.deleteButton} />
            </form>
         </div>
      </div>
   );
}
