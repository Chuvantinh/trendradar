import { ApolloServer } from 'apollo-server'
import { schema } from '../schema'
import { context } from '../context'

const server = new ApolloServer({
  schema: schema,
  context: context,
})

export {
  server
}
