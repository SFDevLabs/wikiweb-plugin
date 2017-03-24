import { version } from '../chrome/manifest.prod.json';

const env = process.env.NODE_ENV || 'development';
const config = {
  development: {
    rootURL: 'https://localhost',
    gaTrackingCode: 'UA-90661699-1',
  },
  production: {
    rootURL: 'https://wikiweb.org',
    gaTrackingCode: 'UA-90661699-2',
  }
};

module.exports = {
  ...config[env],
  version
};
