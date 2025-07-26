import { auth } from "$lib/auth";
import { eq, and, sql } from 'drizzle-orm'
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { db } from '$lib/server/db';
import { roles, user, employees, persons } from '$lib/server/db/schema'

export const load: LayoutServerLoad = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers,
	});
	if (!session) {
		redirect(302, "/login");
	}

	const dbUser = await db
  .select({
    roleId: user.roleId
  })
  .from(user)
  .where(eq(user.id, session?.user.id))
  .then(rows => rows[0]);


	const roleDetails =  await db.select(
		{id: roles.id, 
		 name: roles.name, 
		 description: roles.description})
		.from(roles)
		.where(eq(roles.id, dbUser.roleId)).then(rows => rows[0]);
	

  const today = new Date();
const month = today.getMonth() + 1; 
const day = today.getDate();

    const birthdayPerson = await db.select(
		 {
		 gender: persons.gender,
		 firstName: persons.firstName, 
		 lastName: persons.lastName,
		 birthday: persons.dateOfBirth,
		 phone: persons.phone,
		 type: persons.type
		}
	)
	.from(persons)
	.where(
  and(
    sql`EXTRACT(MONTH FROM ${persons.dateOfBirth}) = ${month}`,
    sql`EXTRACT(DAY FROM ${persons.dateOfBirth}) = ${day}`
  )
);
	

	return {
		user: session.user,
		role: dbUser,
		roleDetails,
		birthdayPerson
	};
};