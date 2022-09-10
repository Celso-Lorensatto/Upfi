const nextTranslate = require('next-translate');

module.exports = {
  async redirects() {
    return [
      {
        source: '/:path',
        destination: '/',
        permanent: true,
      },
    ];
  },
  ...nextTranslate(),
  typescript: {
    ignoreBuildErrors: true,
  },
};
