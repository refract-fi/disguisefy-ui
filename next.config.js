module.exports = {
    webpack(config) {
        config.module.rules.push({
          test: /\.svg$/i,
          issuer: { and: [/\.(js|ts|md)x?$/] },
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                svgoConfig: { plugins: [{ removeViewBox: false }] },
              },
            },
          ],
        });
        return config;
      },
    async redirects() {
      return [
        {
          source: '/:id',
          destination: '/:id/assets',
          permanent: false
        }
      ]
    }
};