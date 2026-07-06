import cypress from "cypress";
import path from "node:path";
import *  as fs from 'fs';

const environments: Record<string, { baseUrl: string; apiUrl: string }> = {
  prod: {
    baseUrl: "https://conduit.bondaracademy.com/",
    apiUrl: "https://conduit-api.bondaracademy.com/api/user",
  },
};

export default {
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

      const envFilePath = path.resolve(__dirname, `./cypress.env.${envName}.json`);
      if(fs.existsSync(envFilePath)) {
        const fileSecrets = JSON.parse(fs.readFileSync(envFilePath, "utf-8"));
        config.env = { ...config.env, ...fileSecrets };
      }

      return config;
      // implement node event listeners here
    },
  },
};
