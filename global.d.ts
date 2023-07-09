import {PrismaClient} from '@Prisma/client';
declare global {
    namespace globalThis {
        var prismadb: PrismaClient
    }
}