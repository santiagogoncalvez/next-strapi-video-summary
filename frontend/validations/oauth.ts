import { z } from "zod";

export const OAuthProviderSchema = z.enum(["google", "github"]);

export type OAuthProvider = z.infer<typeof OAuthProviderSchema>;
