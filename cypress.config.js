const { defineConfig } = require('cypress');

const urls = {
  prod: 'https://appcontact.adnetechsteam.online',
  dev: 'https://appcontact.adnetechsteam.online/dev',
  qa: 'https://appcontact.adnetechsteam.online/qa',
  staging: 'https://appcontact.adnetechsteam.online/staging',
};

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const envName = config.env.ENV || process.env.ENV || 'qa'; // default qa
      config.baseUrl = urls[envName];

      console.log('Running Cypress against:', envName, config.baseUrl);

      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});
