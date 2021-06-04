import { PrismaClient, PrismaClientOptions } from '@prisma/client'

class Prisma extends PrismaClient {
  constructor(options?: PrismaClientOptions) {
    super(options)
  }
}

const prisma = new Prisma();

export interface Context {
  prisma: Prisma,
  select: any
}

export function createContext(): Context {
  return {
    prisma,
    select: {},
  }
}