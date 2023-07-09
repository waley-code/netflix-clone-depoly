import { PrismaClient } from "@Prisma/client";


const client = global.prismadb || new PrismaClient();

if (process.env.NODE_ENV === 'production') global.prismadb = client;

export default client;