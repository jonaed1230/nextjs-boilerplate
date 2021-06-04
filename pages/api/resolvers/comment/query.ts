import { Context } from '../../context';

interface GetCommentArgs {
  id: number
}

interface GetCommentsArgs {
  take: number,
  skip: number
}

const Query = {
  getComment:(_: any, { id }: GetCommentArgs, { prisma }: Context, info: any) => {
    return prisma.comment.findOne({
      where: {
        id,
      },
    });
  },
  getComments: (_: any, { take, skip }: GetCommentsArgs, { prisma }: Context, info: any) => {
    return prisma.comment.findMany({
      take,
      skip,
    });
  }
};

export default Query;