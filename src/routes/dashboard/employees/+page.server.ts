import { auth } from "$lib/auth";
 import { eq } from 'drizzle-orm';
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { db } from '$lib/server/db';
import { employees, persons } from '$lib/server/db/schema'

export const load: LayoutServerLoad = async ({ request }) => {
    const session = await auth.api.getSession({
        headers: request.headers,
    });
    if (!session) {
        redirect(302, "/login");
    }

   
    try {
        const employeeList = await db.select().from(employees);
       
        const employeePersons = await db.select().from(persons).where(eq(persons.type, 'employee'));

        return {
            employeeList,
            employeePersons
        };
    } catch (error) {
        console.error('Failed to load employees:', error);

        // Optionally, you can throw an error to show a message in the UI
        // throw error(500, 'Failed to load employees');

        return {
            employeeList: [],
            employeePersons: [],
            error: 'Failed to load employees'
        };
    }
};