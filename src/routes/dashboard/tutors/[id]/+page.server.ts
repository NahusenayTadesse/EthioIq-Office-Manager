

import { auth } from "$lib/auth";
import { eq, sql } from 'drizzle-orm';
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from '$lib/server/db';
import {  persons, parents, tutors, students, locations, tutorStudentMatches } from '$lib/server/db/schema'

export const load: PageServerLoad = async ({ params, request }) => {
    const session = await auth.api.getSession({
        headers: request.headers,
    });
    if (!session) {
        redirect(302, "/login");
    }

    const {id} =  params;

   
    try {
       const tutor = await db
 .select({
    id: tutors.id,
    firstName: persons.firstName,
    lastName: persons.lastName,
    gender: persons.gender,
    age: sql<number>`EXTRACT(YEAR FROM AGE(CURRENT_DATE, ${persons.dateOfBirth}))`.as('age'),
    phone: persons.phone,
    naturalOrSocial: tutors.naturalOrSocial,
    qualification: tutors.qualifications,
    location: locations.name,
    specificLocation: tutors.specificLocation,
    hourlyRate: tutors.hourlyRate,
    experience: tutors.experience,
    gradePreference: tutors.gradePreference,
    hireDate: tutors.hireDate,
    notes: tutors.notes,
    isActive: tutors.isActive
 })
 .from(tutors)
 .innerJoin(persons, eq(tutors.personId, persons.id))
 .innerJoin(locations, eq(tutors.location, locations.id))
 .orderBy(tutors.id)
 .where(eq(tutors.id, id)).then(rows => rows[0]); 

  const matches = await db.select({
      id: students.id,
      firstName: persons.firstName,
      lastName: persons.lastName,
      phone: persons.phone,
      gender: persons.gender,
      matchDate: tutorStudentMatches.matchDate,
      notes: students.notes,
      isActive: students.isActive
       
    })
    .from(tutorStudentMatches)
    .innerJoin(students, eq(tutorStudentMatches.studentId, students.id))
    .innerJoin(persons, eq(students.personId, persons.id))
    .where(eq(tutorStudentMatches.tutorId, id));

        return {
            
         tutor,
         matches
        };
    } catch (error) {
        console.error('Failed to load Tutor:', error);

        // Optionally, you can throw an error to show a message in the UI
        // throw error(500, 'Failed to load employees');

        return {
            tutor: [],
            matches: [],
            error: 'Failed to load Tutor'
            
        };
    }
};