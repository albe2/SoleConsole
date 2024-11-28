import { error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

export const POST = async ({ request }) => {
    const client = new PrismaClient();

    try {
        const body = await request.json();

        if (!body.sessionCode || !body.userID) {
            throw error(400, 'Missing required "sessionID" or "userID" field');
        }

        const existingSession = await client.session.findUnique({
            where: {
                accessID: body.sessionCode,
            },
        });

        if (!existingSession) {
            throw error(400, 'No session found for the session');
        }

        const userId = parseInt( body.userID );
        await client.user.update({
            where: {
                id: userId,
            },
            data: {
                sessionID: existingSession.id,
            },
        });

        return new Response(JSON.stringify({ message: 'User linked to session successfully' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error('Error linking user to session:', err);

        return new Response(JSON.stringify({ message: 'Failed to link user to session' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        await client.$disconnect();
    }
};
