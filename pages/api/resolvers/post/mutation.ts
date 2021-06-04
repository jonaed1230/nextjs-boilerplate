import { Context } from '../../context'

interface CreatePostArgs {
  published: boolean;
  title: string
  authorId: number
}

interface DeletePostArgs {
  id: number
}

const Mutation = {
  createPost: async (
    _: any,
    { published, title, authorId }: CreatePostArgs,
    { prisma }: Context,
    info: any
  ) => {
    return prisma.post.create({
      data: {
        published,
        title,
        author: {
          connect: {
            id: authorId
          }
        }
      },
    })
  },
  deletePost: async (
    _: any,
    { id }: DeletePostArgs,
    { prisma }: Context,
  ) => {
    return prisma.post.delete({
      where: {
        id,
      },
    })
  },
}

export default Mutation