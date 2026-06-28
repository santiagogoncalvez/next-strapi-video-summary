// app/confirm-email/page.tsx

import ConfirmEmail from "@/components/form/confirm-email";

export default async function ConfirmEmailPage({
   searchParams,
}: {
   searchParams?: Promise<{ email?: string }>;
}) {
   const resolvedSearchParams = await searchParams;
   const email = resolvedSearchParams?.email || "";

   return <ConfirmEmail email={email} />;
}
