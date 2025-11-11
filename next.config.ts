// libs
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
// types
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: ['./messages/en.json', './messages/de.json'],
  },
});

const nextConfig: NextConfig = {
  turbopack: {
    // Workaround Turbopack error for `clsx/clsx.d.mts` by ignoring type-only .d.mts files
    rules: {
      '*.d.mts': { loaders: ['empty'] },
    },
    resolveAlias: {
      // Force clsx to resolve to its JS entry to avoid .d.mts resolution issues
      clsx: require.resolve('clsx'),
    },
  },
};

export default withNextIntl(nextConfig);
