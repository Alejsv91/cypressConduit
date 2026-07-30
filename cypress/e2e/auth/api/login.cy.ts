import { APIEndpoints } from "../../../support/constants/api-endpoints";
import { Credentials } from "../../../types/credentials.interfaces";
import { User } from "../../../types/user.interfaces";
import { realUser } from "../../../support/factories/userFactory";
import { fakeCredentials } from "../../../support/factories/credentialsFactory";

describe("Login test for Login", () => {
  let apiUrl: string;
  let credentials: Credentials;

  before(() => {
    cy.env(["apiUrl", "EMAIL", "PASSWORD"]).then((env) => {
      apiUrl = env.apiUrl;
      credentials = {
        email: env.EMAIL,
        password: env.PASSWORD,
      };
    });
    console.log(`${apiUrl}${APIEndpoints.LOGIN}`);
  });

  it("Successfull Login", () => {
    cy.loginByApi(credentials).then((response) => {
      expect(response.status).to.eq(200);
      realUser().then((expectedUser) => {
        let userResponse: User = { ...response.body.user };
        expect(userResponse.bio).to.eq(expectedUser.bio);
        expect(userResponse.email).to.eq(expectedUser.email);
        expect(userResponse.image).to.eq(expectedUser.image);
        expect(userResponse.token).to.not.NaN;
        expect(userResponse.username).to.eq(userResponse.username);
      });
    });
  });

  it("When user  don't add password", () => {
    credentials.password = "";
    cy.loginByApi(credentials).then((response) => {
      //Should be 422 Unprocessable
      expect(response.status).to.equal(422);
    });
  });

  it("when user don't add email", () => {
    credentials.email = "";
    credentials.password = "fakePassword";
    cy.loginByApi(credentials).then((response) => {
      expect(response.status).to.equal(422);
    });
  });

  it("When user add invalid credentials", () => {
    console.log(`This is the fake credentials ${fakeCredentials.email}`);
    cy.loginByApi(fakeCredentials).then((response) => {
      //Should be 403 forbidden
      expect(response.status).to.equal(403);
    });
  });
});
