const withNextIntl = require('next-intl/plugin')('./next-intl.config.ts');

module.exports = withNextIntl({
  // Outras configs do Next.js
  reactStrictMode: true,
  experimental: {
    appDir: true
  }
});

