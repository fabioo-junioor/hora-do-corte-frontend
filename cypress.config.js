import { defineConfig } from "cypress";

export default defineConfig({
  choromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation: false
  },
});