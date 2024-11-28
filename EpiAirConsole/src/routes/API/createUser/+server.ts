import { error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

export const POST = async ({ request }) => {
    const client = new PrismaClient();

    try {
        const body = await request.json();

        if (!body.username) {
            throw error(400, 'Missing required "username" field');
        }

        const user = await client.user.create({
            data: {
                name: body.username,
            },
        });

        return new Response(JSON.stringify({ userId: user.id }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error('Error creating user:', err);

        return new Response(JSON.stringify({ message: 'Failed to create user' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        await client.$disconnect();
    }
};
