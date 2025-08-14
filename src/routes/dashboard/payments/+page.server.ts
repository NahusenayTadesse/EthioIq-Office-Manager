import { auth } from "$lib/auth";
import { count, eq, sql, and } from 'drizzle-orm';
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from '$lib/server/db';

import {  persons, tutors, students, subjects, tutoringSessions, paymentMethods } from '$lib/server/db/schema'


export const load: PageServerLoad = async ({ request }) => {
    const session = await auth.api.getSession({
        headers: request.headers,
    });
    if (!session) {
        redirect(302, "/login");
    }


    try { 

        // Get number of sessions per tutor
        const tutorSessionCounts = await db
            .select({
            tutorId: tutors.id,
            sessionCount: sql`COUNT(${tutoringSessions.id})`
            })
            .from(tutoringSessions)
            .innerJoin(tutors, eq(tutoringSessions.tutorId, tutors.id))
            .where(eq(tutoringSessions.status, 'completed'))
            .groupBy(tutors.id);

        const tutorSessionsRaw = await db.select(
            {
            id: tutors.id,
            firstName: persons.firstName,
            lastName: persons.lastName,
            phone: persons.phone,
            status: tutoringSessions.status,    
            hourlyRate: tutors.hourlyRate,
            totalPayableHours: sql`SUM(COALESCE(${tutoringSessions.payableHours}, 0))`.as('totalPayableHours'),
            payment: sql`ROUND(${tutors.hourlyRate} * SUM(COALESCE(${tutoringSessions.payableHours}, 0)), 2)`.as('payment'),
            numberOfSessions: count(tutoringSessions.id).as('numberOfSessions'),
            }
        )
        .from(tutoringSessions)
        .innerJoin(tutors, eq(tutoringSessions.tutorId, tutors.id))
        .innerJoin(persons, eq(tutors.personId, persons.id))
        .where(and(eq(tutoringSessions.paidStatus, 'false'), eq(tutoringSessions.status, 'completed')))
        .groupBy(
            tutors.id,
            persons.firstName,
            persons.lastName,
            persons.phone,
            tutoringSessions.status,
            tutors.hourlyRate,
        );

        function to12Hour(dateStr: string | null) {
            if (!dateStr) return null;
            const date = new Date(dateStr);
            let hours = date.getHours();
            const minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // 0 should be 12
            const mins = minutes < 10 ? '0' + minutes : minutes;
            return `${hours}:${mins} ${ampm}`;
        }

       

        return {
            tutorSessionsRaw
        };
    } catch (error) {
        console.error("Error fetching tutor sessions:", error);
        return {
            tutorSessions: [],
            error: "Failed to load tutor sessions."
        };
    }

}