import {arg, nonNull, objectType} from "nexus";
import {context, Context} from "../context";
import {User, UserCreateInput, UserLogin, UserAuthPayload} from "./types";
import {checkUser, generatePassword} from "../authorization/bcrypt";
import {jwtToken} from "../authorization/authorization"

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
        ),
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
      resolve: async (_, args, context: Context) =>{
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
  },
})
