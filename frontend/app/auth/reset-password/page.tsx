import { ResetPassword } from "@/components/reset-password";

export default async function ResetPasswordPage({
   searchParams,
}: {
   searchParams?: Promise<{ code?: string }>;
}) {
   const resolvedSearchParams = await searchParams;
   const code = resolvedSearchParams?.code || "";

   return <ResetPassword code={code} />;
}
