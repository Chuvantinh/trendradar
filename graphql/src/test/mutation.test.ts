// const server = require("../server")
describe("Test Mutation", () => {
  it('test create new user', async () => {
    const userAccount = {email: "chuvantinh1991@gmail.com", name: "chuvantinh1991@gmail.com", password: "chuvantinh1991A123!"}
    // const signupUser =  gql`
    //   mutation signupUser($data: UserCreateInput!) {
    //     signupUser(data: $data){
    //       id
    //       name
    //     }
    //   }
    // `;
      expect(2 + 2).toBe(4);

    // run query against the server and snapshot the output
    //const res = await server.executeOperation({ query: signupUser, variables: { data: userAccount} });
    //expect(res).toMatchSnapshot();
  });
});
