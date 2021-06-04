import { Context } from '../../context';

interface GetPostArgs {
  id: number
}

interface GetPostsArgs {
  take: number,
  skip: number
}

const Query = {
  getPost:(_: any, { id }: GetPostArgs, { prisma }: Context, info: any) => {
    return prisma.post.findOne({
      where: {
        id,
      },
    });
  },
  getPosts: (_: any, { take, skip }: GetPostsArgs, { prisma }: Context, info: any) => {
    return prisma.post.findMany({
      take,
      skip,
    });
  }
};

export default Query;