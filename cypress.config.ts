import cypress from "cypress";
import path from "node:path";
import * as fs from "fs";
import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
  Bucket$,
} from "@aws-sdk/client-s3";

import {
  SFNClient,
  StartExecutionCommand,
  DescribeExecutionCommand,
  SFN,
} from "@aws-sdk/client-sfn";

const environments: Record<
  string,
  { baseUrl: string; apiUrl: string; awsRegion: string }
> = {
  prod: {
    baseUrl: "https://conduit.bondaracademy.com",
    apiUrl: "https://conduit-api.bondaracademy.com",
    awsRegion: "us-east-1",
  },
};

const s3 = new S3Client({ region: process.env.AWS_REGION || "us-east-1" });
const sfn = new SFNClient({ region: process.env.AWS_REGION || "us-east-1" });

export default {
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: false,
    json: true,
  },
  projectId: "5553yz",
  allowCypressEnv: false,
  video: true,
  screenshotOnRunFailure: true,
  e2e: {
    setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ) {
      const envName = config.env.environmentName || "dev";
      config.baseUrl = environments[envName]?.baseUrl;
      config.env.apiUrl = environments[envName]?.apiUrl;
      console.log(
        `Running tests in ${envName} environment with baseUrl: ${config.baseUrl} and apiUrl: ${config.env.apiUrl}`
      );

      const envFilePath = path.resolve(
        __dirname,
        `./cypress.env.${envName}.json`
      );
      if (fs.existsSync(envFilePath)) {
        const fileSecrets = JSON.parse(fs.readFileSync(envFilePath, "utf-8"));
        config.env = { ...config.env, ...fileSecrets };
      }

      on("task", {
        async startStepFunction({ stateMachineArn, input }) {
          const result = await sfn.send(
            new StartExecutionCommand({
              stateMachineArn,
              input: JSON.stringify(input),
            })
          );
          return result.executionArn;
        },

        async getExecutionStatus({ executionArn }) {
          const result = await sfn.send(
            new DescribeExecutionCommand({ executionArn })
          );
          return {
            status: result.status,
            output: result.output ? JSON.parse(result.output) : null,
          };
        },

        async uploadToS3({ bucket, key, filePath }) {
          const fileContent = fs.readFileSync(filePath);

          await s3.send(
            new PutObjectCommand({
              Bucket: bucket,
              Key: key,
              Body: fileContent,
            })
          );

          return true;
        },

        async fileExistsInS3({ bucket, key }) {
          try {
            await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
            return true;
          } catch (err: any) {
            if (err.name === "NotFound") return false;
            throw err;
          }
        },
      });

      return config;
      // implement node event listeners here
    },
  },
};
