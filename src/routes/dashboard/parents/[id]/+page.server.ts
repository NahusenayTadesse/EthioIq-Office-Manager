

import { auth } from "$lib/auth";
import { eq } from 'drizzle-orm';
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from '$lib/server/db';
import { employees, persons, parents, studentParentRelations } from '$lib/server/db/schema'

export const load: PageServerLoad = async ({ params, request }) => {
    const session = await auth.api.getSession({
        headers: request.headers,
    });
    if (!session) {
        redirect(302, "/login");
    }

    const {id} =  params;

   
    try {
       const parent = await db
 .select(
    {firstName: persons.firstName,
     lastName: persons.lastName,
     gender: persons.gender,
     phone: persons.phone,
     salary: employees.salary,
     birthday: persons.dateOfBirth,
     address: persons.address,
     position: employees.position,
     isActive: employees.isActive


    }

 )
  .from(employees)
  .innerJoin(persons, eq(employees.personId, persons.id))
  .where(eq(employees.id, id)).then(rows => rows[0]);

        return {
            employee
        };
    } catch (error) {
        console.error('Failed to load employees:', error);

        // Optionally, you can throw an error to show a message in the UI
        // throw error(500, 'Failed to load employees');

        return {
            employee: [],
            error: 'Failed to load employees'
        };
    }
};