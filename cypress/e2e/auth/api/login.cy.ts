import { APIEndpoints } from "../../../support/constants/api-endpoints";

describe("Login test for Login", () => {
    let apiUrl: string;
    before(()=>{        
        cy.env(['apiUrl', 'test', 'testA', 'URLAPI']).then((env)=>{
            debugger;
            apiUrl = env.apiUrl;

        });
        console.log(`${apiUrl}${APIEndpoints.LOGIN}`);
    })

  it("Successfull Login", () => {
    console.log(`${apiUrl}${APIEndpoints.LOGIN}`);
    cy.request({
        method: 'POST',
        url: `${apiUrl}${APIEndpoints.LOGIN}`,
        body: {
            user: {
                name: 'alejsv91@gmail.com',
                password: 'Abcd1234?!'
            }

        }
    }).then((response)=>{
        expect(response.status).to.eq(200);
    });

  });
});
