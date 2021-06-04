import { Context } from '../../context'

interface CreateUserArgs {
  email: string
  name: string
  password: string
}

interface UpdateUserArgs {
  id: number
}

const Mutation = {
  createUser: async (
    _: any,
    { email, name, password }: CreateUserArgs,
    { prisma }: Context,
    info: any
  ) => {
    return prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    })
  },
  deleteUser: async (
    _: any,
    { id }: UpdateUserArgs,
    { prisma }: Context,
    info: any
  ) => {
    return prisma.user.delete({
      where: {
        id,
      },
    })
  },
}

export default Mutation