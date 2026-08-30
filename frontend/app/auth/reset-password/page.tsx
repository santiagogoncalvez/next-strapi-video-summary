import GeneralLoading from "@/components/custom/general-loader";
import { ResetPassword } from "@/components/form/reset-password";
import { Suspense } from "react";

function ResetPasswordContent({
   searchParams,
}: {
   searchParams?: Promise<{ code?: string }>;
}) {
   return (
      <Suspense fallback={<GeneralLoading />}>
         <ResetPasswordWithCode searchParams={searchParams} />
      </Suspense>
   );
}

async function ResetPasswordWithCode({
   searchParams,
}: {
   searchParams?: Promise<{ code?: string }>;
}) {
   const resolvedSearchParams = await searchParams;
   const code = resolvedSearchParams?.code || "";

   return <ResetPassword code={code} />;
}

export default function ResetPasswordPage({
   searchParams,
}: {
   searchParams?: Promise<{ code?: string }>;
}) {
   return <ResetPasswordContent searchParams={searchParams} />;
}
