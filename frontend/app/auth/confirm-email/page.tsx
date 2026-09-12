import GeneralLoading from "@/components/custom/general-loader";
import ConfirmEmail from "@/components/form/confirm-email";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Confirmar correo electrónico",
   description:
      "Confirmá tu correo electrónico para activar tu cuenta de resu.",
};

function ConfirmEmailContent({
   searchParams,
}: {
   searchParams?: Promise<{ email?: string }>;
}) {
   return (
      <Suspense fallback={<GeneralLoading />}>
         <ConfirmEmailWithEmail searchParams={searchParams} />
      </Suspense>
   );
}

async function ConfirmEmailWithEmail({
   searchParams,
}: {
   searchParams?: Promise<{ email?: string }>;
}) {
   const resolvedSearchParams = await searchParams;
   const email = resolvedSearchParams?.email || "";

   return <ConfirmEmail email={email} />;
}

export default function ConfirmEmailPage({
   searchParams,
}: {
   searchParams?: Promise<{ email?: string }>;
}) {
   return <ConfirmEmailContent searchParams={searchParams} />;
}
