import { Context } from '../../context';

interface GetUserArgs {
  id: number
}

interface GetUsersArgs {
  take: number,
  skip: number
}

const Query = {
  getUser:(_: any, { id }: GetUserArgs, { prisma }: Context, info: any) => {
    return prisma.user.findOne({
      where: {
        id,
      },
    });
  },
  getUsers: (_: any, { take, skip }: GetUsersArgs, { prisma }: Context, info: any) => {
    return prisma.user.findMany({
      take,
      skip,
    });
  }
};

export default Query;