import * as jwt from "jsonwebtoken"
import {APP_PRIVATE_KEY, TOKEN_EXPIRY_TIME} from "../config/env.config";
import {gql, AuthenticationError} from 'apollo-server';
import {ALLOW_INTROSPECTION} from "../config/env.config";

// these Operations are permitted without valid jwt token
const WHITELIST = [
  'login',
  'signupUser',
]

const operationAuthorized = async (requestBody: any): Promise<boolean> => {
  // check if operation is excepted from auth
  let authRequired = true;
  if (requestBody.operationName === "IntrospectionQuery") {
    // special case for Introspection Queries - allow them without token in Debug mode

    if (ALLOW_INTROSPECTION) {
      // authRequired = false;
    }
  } else {

    requestBody = requestBody.query;
    const obj = gql`${requestBody}`;
    const def = (obj.definitions as any[]);
    const sel = (def as any[]).length > 0 ? (def as any[])[0].selectionSet.selections as any[] : undefined;
    if (def.length === 1 && sel && sel.length === 1) {
      // if on Whitelist no auth required
      // if contains -> false, if no as false -> authRequired must true
      authRequired = !WHITELIST.includes(sel[0].name.value);

      console.log(`Auth Required: ${authRequired}`);
    } else {
      // authRequired still true
      console.log("authRequired is still true");
      // console.log(`Operation Length: ${def.length} - ${sel.length}`);
    }
  }
  return authRequired;

}

const assertAlive = (token: any) => {
  const now = Date.now().valueOf() / 1000
  let decoded = jwt.decode(token);
  if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
    throw new Error(`token expired: ${JSON.stringify(decoded)}`)
  }

  if (typeof decoded.nbf !== 'undefined' && decoded.nbf > now) {
    throw new Error(`token not yet valid: ${JSON.stringify(decoded)}`)
  }
}

const verifyAuthKey = async (authHeader: { authToken: string }, tokenRequired: boolean) => {
  // case: need to check
  if (authHeader.authToken && tokenRequired) {
    try {

      const token = authHeader.authToken.replace('Bearer ', '');

      try {
        assertAlive(token)
      } catch (error) {
        throw new AuthenticationError('Token expired' + error);
      }

      return new Promise((resolve, reject) => {
       let verified = jwt.verify(token, "2021")
        resolve(verified.userid);
      })

    } catch (error) {
      throw new AuthenticationError('Token verification failed and token is ' + authHeader.authToken);
    }
  } else { // do  not have token
    if (tokenRequired) {// if must check as true ->
      throw new AuthenticationError('Access Denied');
    } else {
      // console.log('Anonymous Connection Allowed');
    }
    return null;
    // console.log('Anonymous Connection Attempt?');
  }
}

const jwtToken = function (userId: number) {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY_TIME,
    userid: userId
  }, APP_PRIVATE_KEY);
}

export {
  verifyAuthKey,
  operationAuthorized,
  jwtToken
}
