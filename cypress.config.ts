import { defineConfig } from 'cypress';

export default defineConfig({
  screenshotOnRunFailure: false,
  video: false,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'reports/json',
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    baseUrl: 'https://reqres.in/api',
  },
});
