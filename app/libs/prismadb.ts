import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;

// const prisma = new PrismaClient();

// export default prisma;

// export const prisma = global.prisma || new PrismaClient({
//     log: ['query']
//   }
