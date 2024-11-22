import { error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

export const POST = async ({ request }) => {
    const client = new PrismaClient();

    try {
        const body = await request.json();
        if (!body.username) {
            throw error(400, 'Missing required "username" field');
        }

        await client.user.create({
            data: {
                name: body.username,
            },
        });

        return new Response(null, { status: 201 });
    } catch (err) {

        return new Response(JSON.stringify({ message: 'Failed to create user' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        await client.$disconnect();
    }
};
