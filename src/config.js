import log from 'loglevel';

// Production configuration (used when app is bundled via 'npm run build')
const prod = {
  backend: 'https://admission-toolbe.devbstaging.com/api',
  logLevel: 'error',
};

// Development configuration (used when served locally via 'npm start')
const dev = {
  backend: 'http://localhost:8080/api',
  logLevel: 'debug',
};

// Common configuration (used in both production and development)
const common = {};

// END OF CONFIGURATION - Do not change below this line
// ----------------------------------------------------

const config = process.env.NODE_ENV === 'production' ? prod : dev;
if (!config.backend) throw new Error('Backend URL not configured');

log.setDefaultLevel(config.logLevel || 'error');

export default Object.freeze({
  ...config,
  ...common,

  // Remove trailing slash if present:
  get backendURL() {
    return this.backend.replace(/\/$/, '');
  },
});
