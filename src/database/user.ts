import {Prisma, Role, User} from "@prisma/client"
import prisma from "./prisma"
import {v4 as uuidv4} from "uuid"
import {DefaultArgs} from "@prisma/client/runtime/library"
import {take} from "../shared/constants/search"

export default class UserRepository {
  async search(
    q?: string,
    p: number = 0,
    include?: Prisma.UserInclude<DefaultArgs>,
  ) {
    return await prisma.user.findMany({
      take: take,
      skip: take * p,
      where: {
        email: {
          search: q,
        },
      },
      include,
    })
  }
  async getUserById(id: string, include?: Prisma.UserInclude<DefaultArgs>) {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      include,
    })
  }
  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
  }
  async create(
    email: string,
    password: string,
    include?: Prisma.UserInclude<DefaultArgs>,
  ) {
    return await prisma.user.create({
      data: {
        email: email,
        password: password,
        profile: {
          connectOrCreate: {
            create: {},
            where: {
              userEmail: email,
            },
          },
        },
      },
      include,
    })
  }
  async update(
    userId: string,
    role?: Role,
    emailVerified?: Date,
    password?: string,
  ) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role,
        emailVerified,
        password,
      },
    })
  }
  async delete(userId: string) {
    return await prisma.user.delete({
      where: {
        id: userId,
      },
    })
  }
}
