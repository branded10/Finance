/** @type {import('next').NextConfig} */


module.exports = {
    reactStrictMode: true,
    images: {
      domains: ["links.papareact.com", "lh3.googleusercontent.com"],
    },
    experimental: {
      appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    webpack: (config) => {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      };
      return config;
    },
  };