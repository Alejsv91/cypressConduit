describe("S3 File Upload", () => {
  let bucket: string;
  let key: string;

  beforeEach(() => {
    cy.env(["S3_BUCKET"]).then((env) => {
      bucket = env.S3_BUCKET;
      key = `test-upload/test-${Date.now()}.txt`;
      cy.task("uploadToS3", {
        bucket,
        key,
        filePath: "cypress/fixtures/test-upload.txt",
      });
    });
  });

  it("Validate file exist in S3", () => {
    cy.task("fileExistsInS3", { bucket, key }).should("be.true");
  });
});
