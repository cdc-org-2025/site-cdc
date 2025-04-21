const withNextIntl = require('next-intl/plugin')('./next-intl.config.ts');

module.exports = withNextIntl({
  reactStrictMode: true,
  env: {
    baseUrlDomain: process.env.NEXT_PUBLIC_API_URL
  }
});

