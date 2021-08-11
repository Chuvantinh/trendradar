import {arg, floatArg, intArg, list, nonNull, nullable, objectType, stringArg, subscriptionType} from "nexus";
import { Context} from "../context";
// ref: https://www.youtube.com/watch?v=tvqJfgK331M
// prisma 2 subscription not working yet : https://github.com/prisma/prisma-client-js/issues/197
export const Subscription = subscriptionType({
  definition(t) {

    t.boolean('newComment', {
      type: 'Comment',
      args: {
        trendId: intArg()
      },
      description: "See newest Comment with each TrendID",
      subscribe: async (_, args, context:Context) => {
        //return ctx.prisma.asyncIterator<Comment>([USER_CREATED]),

        return await context.prisma.$subscribe.comment({
          mutation_in: "CREATED",
          node: {
            comment: {trendID: args.trendId}
          }
        }).node()
      },
      resolve: payload => payload
    })
  },
})

