import "cypress-wait-until";

describe("Step Function Execution", () => {
  let stateMachineArn: string;
  before(() => {
    cy.env(["stateMachineArn"]).then((env) => {
      stateMachineArn = env.stateMachineArn;
    });
  });

  it("Execute the state machine and validate the execution", () => {
    cy.task("startStepFunction", {
      stateMachineArn,
      input: { someKey: "someValue" },
    }).then((executionArn) => {
      cy.log(`Execution started: ${executionArn}`);

      // polling: reintenta hasta que el status ya no sea RUNNING
      cy.waitUntil(
        () =>
          cy
            .task("getExecutionStatus", { executionArn })
            .then((result: any) => {
              return result.status !== "RUNNING" ? result : false;
            }),
        {
          timeout: 30000,
          interval: 2000,
        }
      ).then((result: any) => {
        debugger;
        expect(result.status).to.eq("SUCCEEDED");
        expect(result.output).to.have.property("someExpectedKey");
      });
    });
  });
});

//arn:aws:states:us-east-1:883425315864:stateMachine:cypress-test-state-machine