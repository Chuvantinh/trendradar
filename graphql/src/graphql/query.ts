import {arg, intArg, interfaceType, list, nonNull, objectType, stringArg} from "nexus";
import {Context} from "../context";
import {TrendSearchInput} from "./types";

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

    // ---------------------- ----------------------------------------- BEGIN QUERY: TREND
    t.nullable.list.field('getTrends', {
      type: 'Trend',
      args: {
        data:
          arg({
            type: 'TrendSearchInput'
          }),
      },
      resolve: async (_parent, _args, context: Context, resolveInfo) => {
        let orderByField = _args.data.orderByField;
        let valueField = _args.data.valueField;

        let start = _args.data.start == null ? undefined : _args.data.start.toISOString();
        let end = _args.data.end == null ? undefined : _args.data.end.toISOString();

        let orderByObj = {};
        orderByObj[orderByField] = valueField;

        return await context.prisma.trend.findMany({
          where: {
            title: {
              contains: _args.data.search_string,
            },
            start:{
              gte: start
            },
            end:{
              lte: end
            },
            status: "ACTIVE"
          },
          orderBy: orderByObj
        });

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
    // --- END QUERY: TREND

    // ------------------------------------------------------------------------ BEGIN QUERY: Category
    t.nonNull.list.nonNull.field('getCategories', {
      type: 'Category',
      args:{
        isparent: intArg() // 0 is parent megatrend, 1 is all children, 2 is all
      },
      resolve:async (_parent, _args, context: Context) => {

        if( _args.isparent == 0){
          return await context.prisma.category.findMany({
            where: {
              parentId: 0
            }
          })

        }else if ( _args.isparent == 1){
          return await context.prisma.category.findMany({
            where: {
              NOT:{
                parentId: 0
              }
            }
          })
        }
        else if(_args.isparent == 2){
          return await context.prisma.category.findMany();
        }else if(_args.isparent == 3){// cate with subcate
          let data = await context.prisma.category.findMany({ // get parent category
            orderBy: {
              title: 'asc'
            },
            where: {
              parentId: 0
            }
          });

          if(data){
            for (let item of data){
                let sub = await context.prisma.category.findMany({
                  where: {
                    parentId: item.id
                  }
                });
                item.subCategory = sub;
            }
          }

          return data;
        }
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

    // --- END QUERY: Category

    // ----------------------------------------------------------------------- BEGIN QUERY: TrenSource
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
    // ----END QUERY: TrenSource

    // ------------------------------------------------------------------------ BEGIN QUERY: TrenEvalution
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

    t.nonNull.list.nonNull.field('getPortfolioEvalution',{
      type: 'Portfolio',
      resolve: async (_, args, context: Context) => {
        let deactive = 'DEACTIVE';
        return await context.prisma.$queryRaw`
          select "TrendEvalution"."trendId", sum("TrendEvalution"."effect") as "total_effect",
          count("TrendEvalution"."createdBy"), ROUND((sum("TrendEvalution"."effect")/count("TrendEvalution"."createdBy"))::numeric, 2) as average_effect,
          sum("TrendEvalution"."probability") as total_prgetListTrendso, ROUND((sum("TrendEvalution"."probability")/count("TrendEvalution"."createdBy"))::numeric, 2) as average_pro,
           ( sum("TrendEvalution"."probability") + sum("TrendEvalution"."effect") ) as total
           from "TrendEvalution" LEFT JOIN "Trend" ON "Trend"."id" = "TrendEvalution"."trendId"
           where "Trend"."status" != ${deactive}
           group by "TrendEvalution"."trendId" order by "total" desc
           ;`
      },
    })
    // left join "Trend" on "TrendEvalution".trendId = "Trend".id
    //  ' where "Trend".status != "DEACTIVE" ' +
    // ---- END QUERY: TrenEvalution

    // ----------------------------------------------------------------------------- BEGIN QUERY: Comment
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

    t.nullable.list.nullable.field('getCommentByTrendId', {
      type: 'Comment',
      args: {
        trendId: intArg()
      },
      resolve: async (_parent, _args, context: Context) => {
        return await context.prisma.comment.findMany({
          where: {trendID: _args.trendId}
        })
      },
    })
    // --- END QUERY: Comment
  },
})
