

import { auth } from "$lib/auth";
import { eq, sql } from 'drizzle-orm';
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from '$lib/server/db';
import {  persons, parents, studentParentRelations, tutors, students, locations, schools, tutorStudentMatches } from '$lib/server/db/schema'

export const load: PageServerLoad = async ({ params, request }) => {
    const session = await auth.api.getSession({
        headers: request.headers,
    });
    if (!session) {
        redirect(302, "/login");
    }

    const {id} =  params;

   
    try {
       const student = await db
 .select({
   id: students.id,
   firstName: persons.firstName,
   lastName: persons.lastName,
   gender: persons.gender,
   phone: persons.phone,
   age: sql<number>`EXTRACT(YEAR FROM AGE(CURRENT_DATE, ${persons.dateOfBirth}))`.as('age'),
   grade: students.grade,
   naturalOrSocial: students.naturalOrSocial,
   location: locations.name,
   school: schools.name, 
   fee: students.fee,
   specificLocation: students.specificLocation,
   notes: students.notes,
   isActive: students.isActive
 })
 .from(students)
 .innerJoin(persons, eq(students.personId, persons.id))
 .innerJoin(schools, eq(students.school, schools.id)) 
 .innerJoin(locations, eq(students.location, locations.id))
 .orderBy(students.id)
.where(eq(students.id, id)).then(rows => rows[0]); 

  const parent = await db.select({
      id: parents.id,
      firstName: persons.firstName,
      lastName: persons.lastName,
      phone: persons.phone,
      gender: persons.gender,
      notes: parents.notes,
      isPrimary: studentParentRelations.isPrimary,
      isActive: parents.isActive
       
    })
    .from(studentParentRelations)
    .innerJoin(parents, eq(studentParentRelations.parentId, parents.id))
    .innerJoin(persons, eq(parents.personId, persons.id))
    .where(eq(studentParentRelations.studentId, id));

     const matches = await db.select({
          id: tutors.id,
          firstName: persons.firstName,
          lastName: persons.lastName,
          phone: persons.phone,
          gender: persons.gender,
          qualifications: tutors.qualifications,
          hourlyRate: tutors.hourlyRate,
          experience: tutors.experience,
          matchDate: tutorStudentMatches.matchDate,
          notes: tutors.notes,
          isActive: tutors.isActive
           
        })
        .from(tutorStudentMatches)
        .innerJoin(tutors, eq(tutorStudentMatches.tutorId, tutors.id))
        .innerJoin(persons, eq(tutors.personId, persons.id))
        .where(eq(tutorStudentMatches.studentId, id));

        return {
            
            student,
            parent,
            matches
        };
    } catch (error) {
        console.error('Failed to load parents:', error);

        // Optionally, you can throw an error to show a message in the UI
        // throw error(500, 'Failed to load employees');

        return {
            parent: [],
            student: [],
            matches: [],
            error: 'Failed to load student'
            
        };
    }
};