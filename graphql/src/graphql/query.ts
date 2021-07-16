import {intArg, objectType} from "nexus";
import {Context} from "../context";
import {User, Category} from "./types";

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allUsers', {
      type: 'User',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany()
      },
    })

    t.nullable.field('getUserById', {
      type: 'User',
      args: {
        id: intArg()
      },
      resolve: async (_parent, _args, context: Context) => {
        return await context.prisma.user.findUnique({
          where: {id: _args.id}
        })
      },
    })

    // ----------------------BEGIN QUERY: TREND ----------------------
    t.nonNull.list.nonNull.field('getTrends', {
      type: 'Trend',
      resolve: async (_parent, _args, context: Context) => {
        return await context.prisma.trend.findMany();
      },
    })

    // Trend
    t.nullable.field('getTrendById', {
      type: 'Trend',
      args: {
        id: intArg()
      },
      resolve: async (_parent, _args, context: Context) => {
        return await context.prisma.trend.findUnique({
          where: {id: _args.id}
        })
      },
    })
    // ----------------------END QUERY: TREND ----------------------

    // ----------------------------------------------- END QUERY: Category
    t.nonNull.list.nonNull.field('getCategories', {
      type: 'Category',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.category.findMany()
      },
    })

    t.nullable.field('getCategoriesById', {
      type: 'Category',
      args: {
        id: intArg()
      },
      resolve: async (_parent, _args, context: Context) => {
        return await context.prisma.category.findUnique({
          where: {id: _args.id}
        })
      },
    })
    // ----------------------------------------------- END QUERY: Category

    // ----------------------------------------------- END QUERY: TrenSource
    t.nonNull.list.nonNull.field('getTrendSource', {
      type: 'TrendSource',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.trendSource.findMany()
      },
    })

    t.nullable.field('getTrendSourceById', {
      type: 'TrendSource',
      args: {
        id: intArg()
      },
      resolve: async (_parent, _args, context: Context) => {
        return await context.prisma.trendSource.findUnique({
          where: {id: _args.id}
        })
      },
    })
    // ----------------------------------------------- END QUERY: TrenSource

    // ----------------------------------------------- END QUERY: TrenEvalution
    t.nonNull.list.nonNull.field('getTrendEvalution', {
      type: 'TrendEvalution',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.trendEvalution.findMany()
      },
    })

    t.nullable.field('getTrendEvalutionById', {
      type: 'TrendEvalution',
      args: {
        id: intArg()
      },
      resolve: async (_parent, _args, context: Context) => {
        return await context.prisma.trendEvalution.findUnique({
          where: {id: _args.id}
        })
      },
    })
    // ----------------------------------------------- END QUERY: TrenEvalution

    // ----------------------------------------------- END QUERY: TrenEvalution
    t.nonNull.list.nonNull.field('getComments', {
      type: 'Comment',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.comment.findMany()
      },
    })

    t.nullable.field('getCommentById', {
      type: 'Comment',
      args: {
        id: intArg()
      },
      resolve: async (_parent, _args, context: Context) => {
        return await context.prisma.comment.findUnique({
          where: {id: _args.id}
        })
      },
    })
    // ----------------------------------------------- END QUERY: TrenEvalution
  },
})
