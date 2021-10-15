import { server } from "../server";
// import gql from 'graphql-tag';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import {generatePassword} from "../authorization/bcrypt";

// it is an error of nexus : https://github.com/graphql-nexus/nexus/issues/100
// https://github.com/graphql-nexus/nexus/issues/351
describe("Test Mutation with apollo server", () => {
  it('test plus number', async () => {
    const userAccount = {email: "chuvantinh1991@gmail.com", name: "chuvantinh1991@gmail.com", password: "chuvantinh1991A123!"}
    const signupUser =  `
      mutation signupUser($data: UserCreateInput!) {
        signupUser(data: $data){
          id
          name
        }
      }
    `;
      expect(2 + 2).toBe(4);

    // run query against the server and snapshot the output
     const res = await server.executeOperation({ query: signupUser, variables: { data: userAccount} });
     expect(res).toMatchSnapshot();
  });
});

// // https://nexusjs.org/docs/getting-started/tutorial/chapter-testing-your-api


describe("Test generatePassword with Bcrypt", () => {
  it('should return a number ', async function () {
    let generatedPassword = await generatePassword("abcd@123A!", 10);
    // console.log(generatedPassword);
    expect(generatedPassword).toBeTruthy();
  });
})


describe("Test JWT TOKEN", () => {
  it('should return a number ', function () {
    let token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) ,
      userid: 1
    }, "123");

    console.log("token" + token);
    expect(token).toBeTruthy();
  });
})


describe("test plus", () => {
  it('should be equal', function () {
    expect(2+2).toBe(4);
  });
})
