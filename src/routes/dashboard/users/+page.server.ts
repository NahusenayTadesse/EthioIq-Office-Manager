import { auth } from "$lib/auth";
import { desc, eq } from 'drizzle-orm';
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { db } from '$lib/server/db';
import { user, roles, session} from '$lib/server/db/schema'

export const load: LayoutServerLoad = async ({ request }) => {
    const currentsession = await auth.api.getSession({
        headers: request.headers,
    });
    if (!currentsession) {
        redirect(302, "/login");
    }

   
    try {
       const users = db
  .select({
    id: user.id,
    name: user.name,
    email: user.email,
    roleName: roles.name,
    emailVerified: user.emailVerified,
    isActive: user.isActive,
    
    
  })
  .from(user)
  .leftJoin(roles, eq(user.roleId, roles.id))
  .orderBy(desc(user.createdAt));




        return {
            users
        };
    } catch (error) {
        console.error('Failed to load users:', error);

        // Optionally, you can throw an error to show a message in the UI
        // throw error(500, 'Failed to load employees');

        return {
            users: [],
            error: 'Failed to load users'
        };
    }
};