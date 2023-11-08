import {Prisma, Profile} from "@prisma/client"
import prisma from "./prisma"
import {DefaultArgs} from "@prisma/client/runtime/library"
import {take} from "../shared/constants/search"

export default class ProfileRepostiry {
  async search(
    q?: string,
    p: number = 0,
    include?: Prisma.ProfileInclude<DefaultArgs>,
  ): Promise<Profile[]> {
    return await prisma.profile.findMany({
      take: take,
      skip: take * p,
      where: {
        OR: [
          {
            userEmail: {
              search: q,
            },
          },
          {
            name: {
              search: q,
            },
          },
        ],
      },
      include,
    })
  }

  async getById(
    id: string,
    include?: Prisma.ProfileInclude<DefaultArgs>,
  ): Promise<Profile | null> {
    return await prisma.profile.findUnique({
      where: {
        id: id,
      },
      include,
    })
  }

  async getByEmail(
    email: string,
    include?: Prisma.ProfileInclude<DefaultArgs>,
  ): Promise<Profile | null> {
    return await prisma.profile.findUnique({
      where: {
        userEmail: email,
      },
      include,
    })
  }
  async update(
    id: string,
    name?: string,
    avatar?: string,
    bio?: string,
  ): Promise<Profile> {
    return await prisma.profile.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        avatar: avatar,
        bio: bio,
      },
    })
  }

  async delete(id: string): Promise<Profile> {
    return await prisma.profile.delete({
      where: {
        id: id,
      },
    })
  }
}
