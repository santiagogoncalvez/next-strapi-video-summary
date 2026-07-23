"use client";
import { useState, useRef, Fragment } from "react";
import { StrapiImage } from "./strapi-image";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ImagePickerProps {
   id: string;
   name: string;
   label: string;
   showCard?: boolean;
   defaultValue?: string;
   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function generateDataUrl(file: File, callback: (imageUrl: string) => void) {
   const reader = new FileReader();
   reader.onload = () => callback(reader.result as string);
   reader.readAsDataURL(file);
}

function ImagePreview({ dataUrl }: { readonly dataUrl: string }) {
   return (
      <StrapiImage
         src={dataUrl}
         alt="preview"
         height={200}
         width={200}
         className="rounded-2xl w-full object-cover"
      />
   );
}

function ImageCard({
   dataUrl,
   fileInput,
   className,
}: {
   readonly dataUrl: string;
   readonly fileInput: React.RefObject<HTMLInputElement | null>;
   className: string;
}) {
   const imagePreview = dataUrl ? (
      <ImagePreview dataUrl={dataUrl} />
   ) : (
      <p className="w-full text-center">No se ha seleccionado ninguna imagen</p>
   );

   return (
      <div className={cn("w-full relative", className)}>
         <div className=" flex items-center space-x-4 rounded-2xl border border-input/80 p-2 w-xs aspect-square">
            {imagePreview}
         </div>
         <button
            onClick={() => fileInput.current?.click()}
            className="w-full absolute inset-0"
            type="button"
         ></button>
      </div>
   );
}

export default function ImagePicker({
   id,
   name,
   label,
   defaultValue,
}: Readonly<ImagePickerProps>) {
   const fileInput = useRef<HTMLInputElement>(null);
   const [dataUrl, setDataUrl] = useState<string | null>(defaultValue ?? null);

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) generateDataUrl(file, setDataUrl);
   };

   return (
      <Fragment>
         <div className="hidden">
            <Label htmlFor={name}>{label}</Label>
            <Input
               type="file"
               id={id}
               name={name}
               onChange={handleFileChange}
               ref={fileInput}
               accept="image/*"
            />
         </div>
         <ImageCard
            dataUrl={dataUrl ?? ""}
            fileInput={fileInput}
            className="max-w-xs"
         />
      </Fragment>
   );
}
