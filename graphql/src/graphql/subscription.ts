import {
  arg,
  floatArg,
  intArg,
  list,
  nonNull,
  nullable,
  objectType,
  stringArg,
  subscriptionField,
  subscriptionType
} from "nexus";
import { Context} from "../context";
import {Comment} from "./types";
// ref: https://www.youtube.com/watch?v=tvqJfgK331M
// prisma 2 subscription not working yet : https://github.com/prisma/prisma-client-js/issues/197
// export const Subscription = subscriptionType({
//   definition(t) {
//
//     t.boolean('newComment', {
//       type: 'Comment',
//       args: {
//         trendId: intArg()
//       },
//       description: "See newest Comment with each TrendID",
//       subscribe: async (_, args, context:Context) => {
//         //return ctx.prisma.asyncIterator<Comment>([USER_CREATED]),
//
//         return await context.prisma.$subscribe.comment({
//           mutation_in: "CREATED",
//           node: {
//             comment: {trendID: args.trendId}
//           }
//         }).node()
//       },
//       resolve: payload => payload
//     })
//   },
// })

export const newComment = subscriptionField('newComment', {
  type: Comment,
  args: {
    comment_string: stringArg()
  },
  subscribe: async (_parent, _args, context: Context) => {
    return context.prisma.$subscribe.comment({
      mutation_id: ['createComment', 'updateComment', 'deleteComment'],
      node: {comment: {content: _args.comment_string}}
    }).node()
  },
  resolve: (payload) => {
    return payload;
  }
});

