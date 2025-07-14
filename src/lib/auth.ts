import { PUBLIC_BASE_URL } from "$env/static/public";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "$lib/server/db";
import { BETTER_AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";

export const auth = betterAuth({
	baseURL: PUBLIC_BASE_URL,
    secret: BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, {
		provider: "pg",
	}),

	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // 5 minutes
		},
	},	

emailAndPassword: {
		enabled: true,
			async sendResetPassword(url, user) {
			console.log("Reset password url:", url);
		},
	},

 	socialProviders: {
		google: {
			clientId: GOOGLE_CLIENT_ID || "",
			clientSecret: GOOGLE_CLIENT_SECRET || "",
		},
	},
	




});