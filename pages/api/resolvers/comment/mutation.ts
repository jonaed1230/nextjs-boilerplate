import { Context } from '../../context'

interface CreateCommentArgs {
  contain: string;
  postId: number;
  authorId: number;
}

interface DeleteCommentArgs {
  id: number;
}

const Mutation = {
  createComment: async (
    _: any,
    { contain, postId, authorId }: CreateCommentArgs,
    { prisma }: Context,
  ) => {
    return prisma.comment.create({
      data: {
        contain,
        author: {
          connect: {
            id: authorId
          }
        },
        post: {
          connect: {
            id: postId,
          }
        }
      },
    })
  },
  deleteComment: async (
    _: any,
    { id }: DeleteCommentArgs,
    { prisma }: Context,
  ) => {
    return prisma.comment.delete({
      where: {
        id,
      },
    })
  },
}

export default Mutation