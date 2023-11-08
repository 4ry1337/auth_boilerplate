import { Session } from "@prisma/client"
import prisma from "./prisma"

export default class SessionRepository {
  async getByUser(userId: string): Promise<Session[]> {
    return await prisma.session.findMany({
      where: {
        userId: userId,
      },
    })
  }

  async create(
    userId: string,
    jti: string,
    refreshToken: string,
  ): Promise<Session> {
    return await prisma.session.create({
      data: {
        id: jti,
        token: refreshToken,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
  }

  async update(jti: string, refreshToken: string): Promise<Session> {
    return await prisma.session.update({
      where: {
        id: jti,
      },
      data: {
        token: refreshToken,
      },
    })
  }

  async delete(jti: string): Promise<Session> {
    return await prisma.session.delete({
      where: {
        id: jti,
      },
    })
  }
}
