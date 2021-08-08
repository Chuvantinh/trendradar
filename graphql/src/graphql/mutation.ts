import {arg, floatArg, intArg, list, nonNull, nullable, objectType, stringArg} from "nexus";
import {context, Context} from "../context";
import {User, UserCreateInput, UserLogin, UserAuthPayload, Category, Status, TrendSourceCreateInput, ListIdCategory} from "./types";
import {checkUser, generatePassword} from "../authorization/bcrypt";
import {jwtToken} from "../authorization/authorization"
import {GraphQLList} from "graphql";
import kmeans from "kmeans-ts";
import { KMeans, Vectors, Utils } from "kmeans-ts";

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('signupUser', {
      type: 'User',
      args: {
        data: nonNull(
          arg({
            type: 'UserCreateInput',
          }),
        )
      },
      resolve: async (_, args, context: Context) => {
        // hash password before save in the database
        let generatedPassword = await generatePassword(args.data.password, 10);

        return context.prisma.user.create({
          data: {
            name: args.data.name,
            email: args.data.email,
            password: generatedPassword,
          },
        })
      },
    })

    t.field('login', {
      type: 'String',
      args: {
        data: nonNull(
          arg({
            type: 'UserAuthPayload'
          })
        )
      },
      resolve: async (_, args, context: Context) => {
        // check email and password is equals or not with bcrypt
        try{
          const user = await context.prisma.user.findUnique({
            where: {
              email: args.data.email
            }
          });
          let checkPassword = await checkUser(args.data.password, user.password);
          if (checkPassword){
            // if the user in the system , return jwt token with payload is uid
           return jwtToken(user.id);
          }else{
            return '';
          }
        }catch (e) {
          console.log(e);
        }
      }
    })

// ############################################################################### BEGIN CATEGORY MUTATION
    t.nonNull.field('createCategory', {
      type: 'Category',
      args: {
        data: nonNull(
          arg({
            type: 'CategoryCreateInput',
          }),
        ),
      },
      resolve: async (_, args, context: Context) => {
        return await context.prisma.category.create({
          data: {
            title: args.data.title,
            description: args.data.description,
            parentId: args.data.parentId,
            status: "ACTIVE",
            createdUser: {
              connect: { id: context.userId}
            }
          },
        })
      },
    })

    t.nonNull.field('updateCategory', {
      type: 'Category',
      args: {
        data: nonNull(
          arg({
            type: 'CategoryCreateInput',
          }),
        ),
        id: intArg()
      },
      resolve: async (_, args, context: Context) => {
        return await context.prisma.category.update({
          where: { id: args.id},
          data: {
            title: args.data.title,
            description: args.data.description,
            parentId: args.data.parentId,
            status: args.data.status,
            updatedUser: {
              connect: { id: context.userId}
            }
          },
        })
      },
    })

    t.nonNull.field('deleteCategory', {
      type: 'Category',
      args: {
        id: intArg()
      },
      resolve: async (_, args, context: Context) => {
        return await context.prisma.category.delete({
          where: { id: args.id},
        })
      },
    })
// END CATEGORY MUTATION

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ BEGIN TREND MUTATION
    t.nonNull.field('createTrend', {
      type: 'Trend',
      args: {
        data: nonNull(
          arg({
            type: 'TrendCreateInput',
          }),
        ),
        categoriesId: list(stringArg()),
        source: list(TrendSourceCreateInput)
      },
      resolve: async (_, args, context: Context) => {

        // handle list id of category to [{id: 1}, {id: 2}]
        // [
        //
        //   {
        //     category: {
        //       connect: id
        //     }
        //   }
        // ]

        let listCate:any[] = [];
        if(args.categoriesId){
          for(let item of args.categoriesId){
            let obj = {
              "category": {
                "connect": {
                  id: parseInt(item)
                }
              }
            };

            listCate.push(obj);
          }
        }


        console.log(listCate);

        return await context.prisma.trend.create({
          data: {
            title: args.data.title,
            description: args.data.description,
            status: args.data.status,
            images: args.data.images,
            videos: args.data.videos,
            createdUser: {
              connect: { id: context.userId}
            },
            categories: {
              create: listCate
            },
            source:{
              create: args.source
            }
          },
        })

      },
    })

    t.nonNull.field('updateTrend', {
      type: 'Trend',
      args: {
        data: nonNull(
          arg({
            type: 'TrendCreateInput',
          }),
        ),
        id: intArg(),
        source: list(TrendSourceCreateInput),
      },
      resolve: async (_, args, context: Context) => {
        // check array of catId , then create array for connect.

        return await context.prisma.trend.update({
          where: {id: args.id},
          data: {
            title: args.data.title,
            description: args.data.description,
            status: args.data.status,
            images: args.data.images,
            videos: args.data.videos,
            updatedUser: {
              connect: { id: context.userId}
            },
            source:{
              create: args.source
            }
          },
        })
      },
    })

    t.nonNull.field('deleteTrend', {
      type: 'Trend',
      args: {
        id: intArg()
      },
      resolve: async (_, args, context: Context) => {
        return await context.prisma.trend.delete({
          where: {id: args.id},
        })
      },
    })

    // https://github.com/GoldinGuy/K-Means-TS
    // clustering hier in typescript
    t.nonNull.field('TrendCluster', {
      type: 'TrendCluster',
      args: {
        input_data: list(list(floatArg())),
        number_cluster: intArg(),
        max_interation: intArg()
      },
      resolve: async (_, args, context: Context) => {
        //let output: any = kmeans(args.input_data, args.number_cluster,null, args.max_interation);
        //console.log(output);
        //return output;
        let input_data: Array<Array<number>> = [
          [1, 12, 14, 4, 25, 35, 22, 3, 14, 5, 51, 2, 23, 24, 15],
          [7, 34, 15, 34, 17, 11, 34, 2, 35, 18, 52, 34, 33, 21],
          [5, 19, 35, 17, 35, 18, 12, 45, 23, 56, 23, 45, 16, 3]
        ];
        let data: KMeans = kmeans(args.input_data, args.number_cluster, null, args.max_interation);

        return data;
      },
    })

    // t.nullable.field('TrendCluster', {
    //   type: 'TrendCluster',
    //   args:{
    //     input_data: list(intArg()),
    //     number_cluster: intArg(),
    //     max_interation: intArg()
    //   },
    //   resolve: async (_, args, context: Context) => {
    //     let output: Array<Array<number>> = kmeans(args.input_data, args.number_cluster, null, args.max_interation);
    //     return null;
    //   }
    // })

// ++++ END TREND MUTATION

// ---------------------------------------------------------------------------- BEGIN TrendSource MUTATION
    t.nonNull.field('createTrendSource', {
      type: 'TrendSource',
      args: {
        data: nonNull(
          arg({
            type: 'TrendSourceCreateInput',
          }),
        ),
        trendId: intArg()
      },
      resolve: async (_, args, context: Context) => {
        return await context.prisma.trendSource.create({
          data: {
            title: args.data.title,
            description: args.data.description,
            url: args.data.url,
            source: args.data.source,
            createdUser: {
              connect: { id: context.userId}
            },
            trend:{
              connect: { id: args.trendId}
            }
          },
        })
      },
    })

    t.nonNull.field('updateTrendSource', {
      type: 'TrendSource',
      args: {
        data: nonNull(
          arg({
            type: 'TrendSourceCreateInput',
          }),
        ),
        id: intArg()
      },
      resolve: async (_, args, context: Context) => {
        return await context.prisma.trendSource.update({
          where: {id: args.id},
          data: {
            title: args.data.title,
            description: args.data.description,
            url: args.data.url,
            source: args.data.source,
            updatedUser: {
              connect: { id: context.userId}
            }
          },
        })
      },
    })

    t.nonNull.field('deleteTrendSource', {
      type: 'TrendSource',
      args: {
        id: intArg()
      },
      resolve: async (_, args, context: Context) => {
        return await context.prisma.trendSource.delete({
          where: {id: args.id}
        })
      },
    })
// ----- END TrendSource MUTATION

// ********************************************************************************************* BEGIN TREND_EVALUTION
    t.nonNull.field('createTrendEvalution', {
      type: 'TrendEvalution',
      args: {
        data: nonNull(
          arg({
            type: 'TrendEvalutionCreateInput',
          }),
        ),
        trendId: intArg(),
      },
      resolve: async (_, args, context: Context) => {
        return await context.prisma.trendEvalution.create({
          data: {
            effect: args.data.effect,
            probability: args.data.probability,
            during: args.data.during,
            createdUser:{
              connect: {id: context.userId}
            },
            trend: {
              connect:
                { id: args.trendId },
            },
          },
        })
      },
    })

    t.nonNull.field('updateTrendEvalution', {
      type: 'TrendEvalution',
      args: {
        data: nonNull(
          arg({
            type: 'TrendEvalutionCreateInput',
          }),
        ),
        trendID: intArg(),
        idEvalution: intArg()
      },
      resolve: async (_, args, context: Context) => {
        return await context.prisma.trendEvalution.update({
          where: {id: args.idEvalution},
          data: {
            effect: args.data.effect,
            probability: args.data.probability,
            during: args.data.during,
            updatedUser: {
              connect: { id: context.userId}
            },
            trend: {
              connect: {id: args.trendID}
            },
          },
        })
      },
    })

    t.nonNull.field('deleteTrendEvalution', {
      type: 'TrendEvalution',
      args: {
        id: intArg()
      },
      resolve: async (_, args, context: Context) => {
        return await context.prisma.trendEvalution.delete({
          where: {id: args.id},
        })
      },
    })
// ******** END TREND_EVALUTION

    // ************************************ BEGIN Comment Table
    t.nonNull.field('createComment', {
      type: 'Comment',
      args: {
        data: nonNull(
          arg({
            type: 'CommentCreateInput',
          }),
        ),
        trendId: intArg(),
      },
      resolve: async (_, args, context: Context) => {
        return await context.prisma.comment.create({
          data: {
            content: args.data.content,
            createdUser:{
              connect: {id: context.userId}
            },
            trend: {
              connect:
                { id: args.trendId },
            },
          },
        })
      },
    })

    t.nonNull.field('updateComment', {
      type: 'Comment',
      args: {
        data: nonNull(
          arg({
            type: 'CommentCreateInput',
          }),
        ),
        trendID: intArg(),
        idEvalution: intArg()
      },
      resolve: async (_, args, context: Context) => {
        return await context.prisma.comment.update({
          where: {id: args.idEvalution},
          data: {
            content: args.data.content,
            updatedUser: {
              connect: { id: context.userId}
            },
            trend: {
              connect: {id: args.trendID}
            },
          },
        })
      },
    })

    t.nonNull.field('deleteComment', {
      type: 'Comment',
      args: {
        id: intArg()
      },
      resolve: async (_, args, context: Context) => {
        return await context.prisma.comment.delete({
          where: {id: args.id},
        })
      },
    })
// ************************************ BEGIN Comment Table

  },
})
