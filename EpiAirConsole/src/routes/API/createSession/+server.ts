import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export const GET = async () => {
    try {
        let randomNumber: number;
        let isUnique = false;

        do {
            randomNumber = Math.floor(Math.random() * 90000) + 10000;

            const existingSession = await client.session.findUnique({
                where: {
                    accessID: randomNumber.toString(),
                },
            });

            isUnique = !existingSession;
        } while (!isUnique);

        await client.session.create({
            data: {
                accessID: randomNumber.toString(),
            },
        });

        return new Response(JSON.stringify({ accessID: randomNumber }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error('Erreur lors de la création de la session :', err);

        return new Response(JSON.stringify({ message: 'Failed to create session' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        await client.$disconnect();
    }
};
