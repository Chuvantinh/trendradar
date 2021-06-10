import * as dotenv from 'dotenv'
dotenv.config();

const APP_PRIVATE_KEY = process.env.APP_PRIVATE_KEY;
const TOKEN_EXPIRY_TIME = parseInt(process.env.TOKEN_EXPIRY_TIME);
const ALLOW_INTROSPECTION = process.env.ALLOW_INTROSPECTION;

export {
 APP_PRIVATE_KEY,
 TOKEN_EXPIRY_TIME,
  ALLOW_INTROSPECTION
}



