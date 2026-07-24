import { APIEndpoints } from "../../../support/constants/api-endpoints";
import { Credentials } from "../../../types/credentials.interfaces";
import { User } from "../../../types/user.interfaces";
import { realUser } from "../../../support/factories/userFactory";

describe("Login test for Login", () => {
  let apiUrl: string;
  let credentials: Credentials = { email: "", password: "" };
  let expectedUser = 

  before(() => {
    cy.env(["apiUrl", "EMAIL", "PASSWORD"]).then((env) => {
      debugger;
      apiUrl = env.apiUrl;
      credentials = {
        email: env.EMAIL,
        password: env.PASSWORD,
      };
    });
    console.log(`${apiUrl}${APIEndpoints.LOGIN}`);
  });

  it("Successfull Login", () => {
    console.log(`${apiUrl}${APIEndpoints.LOGIN}`);
    cy.request({
      method: "POST",
      url: `${apiUrl}${APIEndpoints.LOGIN}`,
      body: {
        user: {
          email: credentials.email,
          password: credentials.password,
        },
      },
    }).then((response) => {
        
        debugger;
        let userResponse: User = {...response.body};
        expect(response.status).to.eq(200);
        expect(userResponse.bio).to.eq(userResponse.bio);
        expect(userResponse.email).to.eq(userResponse.email);
        expect(userResponse.image).to.eq(userResponse.image);
        expect(userResponse.token).to.not.NaN;
        expect(userResponse.username).to.eq(userResponse.username);
      

    });
  });
});
