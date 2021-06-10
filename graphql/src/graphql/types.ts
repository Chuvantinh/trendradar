import {inputObjectType, objectType} from "nexus";

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

export {
  User,
  UserCreateInput,
  UserLogin,
  UserAuthPayload,
}
