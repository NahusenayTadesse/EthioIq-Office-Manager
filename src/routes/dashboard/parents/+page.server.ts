import { auth } from "$lib/auth";
import { desc, eq, count } from 'drizzle-orm';
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { db } from '$lib/server/db';
import {  parents, persons, studentParentRelations } from '$lib/server/db/schema'

export const load: LayoutServerLoad = async ({ request }) => {
    const session = await auth.api.getSession({
        headers: request.headers,
    });
    if (!session) {
        redirect(302, "/login");
    }

   
    try {
       const allParents = await db
 .select({
    id: parents.id,
    firstName: persons.firstName,
    lastName: persons.lastName,
    gender: persons.gender,
    studentCount: count(studentParentRelations.studentId).as('studentCount'),
    isActive: parents.isActive
  })
  .from(parents)
  .innerJoin(persons, eq(parents.personId, persons.id)) 
  .leftJoin(studentParentRelations, eq(parents.id, studentParentRelations.parentId))
  .groupBy(
  parents.id,
  persons.firstName,
  persons.lastName,
  persons.gender,
  parents.isActive
)
  .orderBy(parents.id);



        return {
            allParents
        };
    } catch (error) {
        console.error('Failed to load employees:', error);

        // Optionally, you can throw an error to show a message in the UI
        // throw error(500, 'Failed to load employees');

        return {
            allParents: [],
            error: 'Failed to load Parents'
        };
    }
};