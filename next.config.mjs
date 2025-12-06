// libs
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: ['./messages/en.json', './messages/de.json'],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed turbopack configuration as it might not be compatible with next 14.1.0 or require different configuration
};

export default withNextIntl(nextConfig);
