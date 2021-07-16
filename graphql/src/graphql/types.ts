import {enumType, inputObjectType, objectType} from "nexus";
import {context, Context} from "../context";
import {type} from "os";

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('name')
    t.nonNull.string('email')
  },
})

//for login return
const UserLogin = objectType({
  name: 'UserLogin',
  definition(t){
    t.nonNull.string('token')
  }
})

// for login parameters
const UserAuthPayload = inputObjectType({
  name: 'UserAuthPayload',
  definition(t) {
    t.string('email')
    t.string('password')
  },
})



const UserCreateInput = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.nonNull.string('email')
    t.string('name')
    t.string('password')
  },
})

// for trend

// BEGIN CATEGORY
const Status = enumType({
  name: 'Status',
  members: ['ACTIVE', 'DEACTIVE'],
  description: 'Status when created is Active, and updatedStatus attempts deactive'
})

const ListIdCategory = inputObjectType({
  name: 'ListIdCategory',
  definition(t) {
    t.int('id')
  }
})

const Category = objectType({
  name: 'Category',
  // description: dedent`
  //   Simple Category Type for this project.
  //   A Category can contains many of trends and a trend can be stored in some cateogries.
  // `,
  definition(t){
    t.id('id')
    t.string('title')
    t.string('description')
    t.int('parentId')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.nonNull.field('deletedAt', { type: 'DateTime' })
    t.field('status', { type: 'Status'})
    t.field('createdBy', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.category
          .findUnique({
            where: { id: parent.id || undefined}
          })
          .createdUser()
      },
    })

    t.field('updatedBy', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.category
          .findUnique({
            where: { id: parent.id || undefined}
          })
          .updatedUser()
      },
    })

    t.field('deletedBy', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.category
          .findUnique({
            where: { id: parent.id || undefined}
          })
          .deletedUser()
      },
    })
  }
})

const CategoryCreateInput = inputObjectType({
  name: 'CategoryCreateInput',
  definition(t) {
    t.nonNull.string('title')
    t.string('description')
    t.int('parentId')
    t.field('status', {type: Status})
  },
})
// END CATEGORY

// BEGIN CategoriesOnTrend
const   CategoriesOnTrend= objectType({
  name: 'CategoriesOnTrend',
  definition(t){
    t.field('trendId', {
      type: 'Trend',
      resolve: (parent, _, context: Context) => {
        return context.prisma.categoriesOnTrend
          .findUnique({
            where: { trendId: parent.id}
          })
          .trend()
      }
    })

    t.field('catId', {
      type: 'Category',
      resolve: (parent, _, context: Context) => {
        return context.prisma.categoriesOnTrend
          .findUnique({
            where: { catId: parent.id}
          })
          .category()
      }
    })

    t.field('trends', {
      type: 'Trend',
      resolve: (parent, _, context: Context) => {
        return context.prisma.categoriesOnTrend
          .findUnique({
            where: { trendId: parent.id}
          })
          .trend()
      }
    })

    t.field('createdBy', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.category
          .findUnique({
            where: { id: parent.id}
          }).createdUser()
      },
    })

    t.field('updatedBy', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.category
          .findUnique({
            where: { id: parent.id || undefined}
          })
          .updatedUser()
      },
    })

    t.field('deletedBy', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.category
          .findUnique({
            where: { id: parent.id || undefined}
          })
          .deletedUser()
      },
    })
  }
})
// END CategoriesOnTrend


// BEGIN TREND Type
const TrendCreateInput = inputObjectType({
  name: 'TrendCreateInput',
  definition(t) {
    t.nonNull.string('title')
    t.string('description')
    t.field('status', {type: Status})
    t.string('images')
    t.string('videos')
  },
})

const Trend = objectType({
  name: 'Trend',
  definition(t){
    t.id('id')
    t.string('title')
    t.string('description')
    t.string('images')
    t.string('videos')

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.nonNull.field('deletedAt', { type: 'DateTime' })
    t.field('status', { type: 'Status'})

    t.field('categories', {
      type: 'CategoriesOnTrend',
      resolve: async (parent, _, context: Context) => {
        return await context.prisma.categoriesOnTrend.findFirst({
          where: {
            trendId: parent.id
          }
        })
      }
    })

    t.nullable.list.field('source', {
      type: 'TrendSource',
      resolve: async (parent, _, context: Context) => {
        return await context.prisma.trendSource.findMany({
          where: { trendId: parent.id || undefined }
        })
      }
    })

    t.nullable.list.field('trendEvalution', {
      type: 'TrendEvalution',
      resolve: async (parent, _, context: Context) => {
        return await context.prisma.trendEvalution.findMany({
          where: { trendId: parent.id || undefined }
        })
      }
    })

    t.nullable.list.field('comment', {
      type: 'Comment',
      resolve: async (parent, _, context: Context) => {
        return await context.prisma.comment.findMany({
          where: { trendID: parent.id || undefined }
        })
          .trend()
      }
    })

    t.field('createdBy', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.trend
          .findUnique({
            where: { id: parent.id}
          })
          .createdUser()
      },
    })

    t.field('updatedBy', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.trend
          .findUnique({
            where: { id: parent.id || undefined}
          })
          .updatedUser()
      },
    })

    t.field('deletedBy', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.trend
          .findUnique({
            where: { id: parent.id || undefined}
          })
          .deletedUser()
      },
    })
  }
})
// END TREND Type


// BEGIN TrendEvalution Type

const TrendEvalutionCreateInput = inputObjectType({
  name: 'TrendEvalutionCreateInput',
  definition(t) {
    t.float('effect')
    t.float('probability')
    t.string('during')
  },
})

const TrendEvalution = objectType({
  name: 'TrendEvalution',
  definition(t){
    t.id('id')
    t.field('trendId',{
      type: 'Trend',
      resolve: (parent, _, context: Context) => {
        return context.prisma.trendEvalution.findUnique({
          where: {id: parent.id || undefined}
        })
          .trend()
      }
      }
    )
    t.float('effect')
    t.float('probability')
    t.string('during')

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.nonNull.field('deletedAt', { type: 'DateTime' })

    t.field('createdBy', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.trendEvalution
          .findUnique({
            where: { id: parent.id || undefined}
          })
          .createdUser()
      },
    })

    t.field('updatedBy', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.trendEvalution
          .findUnique({
            where: { id: parent.id || undefined}
          })
          .updatedUser()
      },
    })

    t.field('deletedBy', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.trendEvalution
          .findUnique({
            where: { id: parent.id || undefined}
          })
          .deletedUser()
      },
    })
  }
})
// END TrendEvalution Type

// BEGIN TrendSource Type
const TrendSourceCreateInput = inputObjectType({
  name: 'TrendSourceCreateInput',
  definition(t) {
    t.string('title')
    t.string('description')
    t.string('url')
    t.list.nonNull.field('source', {type: Sources})
  },
})

const Sources = enumType({
  name: 'Sources',
  members: [  'Media','Publication','Internet','Database','Company','Paten','Seminar','Trade','Conferences','Travel', 'ExtendNetwork'],
  description: 'Status when created is Active, and updatedStatus attempts deactive'
})

const TrendSource = objectType({
  name: 'TrendSource',
  definition(t){
    t.id('id')
    t.string('title')
    t.string('description')
    t.string('url')

    t.list.nonNull.field('source', { type: Sources})

    t.field('trendId',{
        type: 'Trend',
        resolve: (parent, _, context: Context) => {
          return context.prisma.trendSource.findUnique({
            where: {id: parent.id || undefined}
          })
            .trend()
        }
      }
    )

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.nonNull.field('deletedAt', { type: 'DateTime' })

    t.field('createdBy', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.trendSource
          .findUnique({
            where: { id: parent.id || undefined}
          })
          .createdUser()
      },
    })

    t.field('updatedBy', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.trendSource
          .findUnique({
            where: { id: parent.id || undefined}
          })
          .updatedUser()
      },
    })

    t.field('deletedBy', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.trendSource
          .findUnique({
            where: { id: parent.id || undefined}
          })
          .deletedUser()
      },
    })
  }
})
// END TrendSource Type

// BEGIN Comment Type
const CommentCreateInput = inputObjectType({
  name: 'CommentCreateInput',
  definition(t) {
    t.string('content')
  },
})

const Comment = objectType({
  name: 'Comment',
  definition(t){
    t.id('id')
    t.string('content')

    t.field('trendId',{
        type: 'Trend',
        resolve: (parent, _, context: Context) => {
          return context.prisma.comment.findUnique({
            where: {id: parent.id || undefined}
          }).trend()
        }
      }
    )

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.nonNull.field('deletedAt', { type: 'DateTime' })

    t.field('createdBy', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.comment
          .findUnique({
            where: { id: parent.id || undefined}
          })
          .user()
      },
    })

    t.field('updatedBy', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.comment
          .findUnique({
            where: { id: parent.id || undefined}
          })
          .user()
      },
    })

    t.field('deletedBy', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.comment
          .findUnique({
            where: { id: parent.id || undefined}
          })
          .user()
      },
    })
  }
})
// END Comment Type

export {
  User,
  UserCreateInput,
  UserLogin,
  UserAuthPayload,

  Category,
  ListIdCategory,
  CategoriesOnTrend,
  CategoryCreateInput,

  Status,
  Sources,

  Trend,
  TrendCreateInput,

  TrendEvalution,
  TrendEvalutionCreateInput,

  TrendSource,
  TrendSourceCreateInput,

  Comment,
  CommentCreateInput

}
