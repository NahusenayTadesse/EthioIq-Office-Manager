import { PUBLIC_BASE_URL } from "$env/static/public";
import { createAuthClient } from "better-auth/svelte";

export const authClient = createAuthClient({
	baseURL: PUBLIC_BASE_URL,
	trustedOrigins: ["http://192.168.119.79:5173"]

});

export const { signIn, signUp, useSession } = authClient;