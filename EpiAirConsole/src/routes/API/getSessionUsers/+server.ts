import { error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

export const GET = async ({ request }) => {
    const client = new PrismaClient();

    try {
        const url = new URL(request.url);
        const sessionId = url.searchParams.get('sessionId');

        if (!sessionId) {
            throw error(400, 'Missing required "sessionID" field');
        }

        const existingSession = await client.session.findUnique({
            where: {
                accessID: sessionId,
            },
        });

        if (!existingSession) {
            throw error(401, 'Session not found');
        }

        const users = await client.user.findMany({
            where: {
                sessionID: existingSession.id,
            },
        });

        const userNames = users.map(user => user.name);

        return new Response(JSON.stringify({ userNames }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        if (err.status === 401 || err.status === 400) {
            return new Response(
                JSON.stringify({ message: err.message }),
                { status: err.status, headers: { 'Content-Type': 'application/json' } }
            );
        }

        console.error('Unexpected error:', err);

        return new Response(
            JSON.stringify({ message: 'Failed to fetch users' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    } finally {
        await client.$disconnect();
    }
};
