import UserQuery from './user/query';
import PostQuery from './post/query';
import CommentQuery from './comment/query';

import UserMutation from './user/mutation';
import PostMutation from './post/mutation';
import CommentMutation from './comment/mutation';

const resolvers = {
  Query: {
    ...UserQuery,
    ...PostQuery,
    ...CommentQuery
  },
  Mutation: {
    ...UserMutation,
    ...PostMutation,
    ...CommentMutation
  },
};

export default resolvers;