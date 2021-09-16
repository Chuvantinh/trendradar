/**
 * Handle password with bcrypt
 */
import * as bcrypt from "bcrypt"

export const generatePassword = function (myPlaintextPassword: string, saltRounds: number ){
  return new Promise(((resolve, reject) => {
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      if(err){
        reject(err)
      }else
        resolve(hash)
    });
  }));
}

export const checkUser = function(password: any, passwordDB: any) {
  return new Promise(((resolve, reject) => {
    bcrypt.compare(password, passwordDB, function(err, result) {
      // result == true
      if (err) {
        reject(err)
      } else{
        resolve(result)
      }
    });
  }))

}
