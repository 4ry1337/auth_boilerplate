import {Post} from "@prisma/client"
import prisma from "./prisma"
import {take} from "../shared/constants/search"

export default class PostRepository {
  async getById(postId: number): Promise<Post | null> {
    return await prisma.post.findUnique({
      where: {
        id: postId,
      },
    })
  }

  async search(
    q?: string,
    p: number = 0,
    publishedFrom?: Date,
    publishedTO?: Date,
  ): Promise<Post[]> {
    return await prisma.post.findMany({
      take,
      skip: take * p,
      where: {
        OR: [
          {
            title: {
              search: q,
            },
          },
          {
            content: {
              search: q,
            },
          },
        ],
        published: {
          gte: publishedFrom,
          lte: publishedTO,
        },
      },
    })
  }

  async create(email: string, title: string) {
    return await prisma.post.create({
      data: {
        title: title,
        user: {
          connect: {
            userEmail: email,
          },
        },
      },
    })
  }

  async update(postId: number, content?: string, files?: string[], publish?: Date) {
    return await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        content: content,
        files: files,
        published: publish,
      },
    })
  }

  async delete(id: number) {
    return await prisma.post.delete({
      where: {
        id: id,
      },
    })
  }
}
