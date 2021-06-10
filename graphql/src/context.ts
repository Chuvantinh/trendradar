import {PrismaClient} from '@prisma/client'
import {operationAuthorized, verifyAuthKey} from "./authorization/authorization";

export interface Context {
  prisma: PrismaClient
  userId : number
}

const prisma = new PrismaClient()

export const context: Context = async ({req, connection}: any): Promise<Context> => {
  let header = {authToken: ''}
  if (connection) {
    header = connection.context
  } else {
    header.authToken = req.headers.authorization
  }

  // check if operation is excepted from auth
  let authRequired = true;
  if (req && req.body && req.body.query) {
    authRequired = await operationAuthorized(req.body);
  }
  const uid = await verifyAuthKey(header, authRequired);
  return {
    prisma: prisma,
    userId: uid,
  }
}
