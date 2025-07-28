import { auth } from "$lib/auth";
import { asc, eq } from 'drizzle-orm';
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
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
       const employeeList = await db
 .select({
    id: employees.id,
    firstName: persons.firstName,
    lastName: persons.lastName,
    gender: persons.gender,
    position: employees.position,
    isActive: employees.isActive
  })
  .from(employees)
  .innerJoin(persons, eq(employees.personId, persons.id))
  .where(eq(persons.type, 'employee')).orderBy(asc(employees.id));

  const positionList = await db.select({position: employees.position}).from(employees);

   
        return {
            employeeList,
            positionList
        };
    } catch (error) {
        console.error('Failed to load employees:', error);

        // Optionally, you can throw an error to show a message in the UI
        // throw error(500, 'Failed to load employees');

        return {
            employeeList: [],
            error: 'Failed to load employees'
        };
    }
};