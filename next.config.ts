// libs
import createNextIntlPlugin from "next-intl/plugin";
// types
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./messages/en.json",
  },
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
