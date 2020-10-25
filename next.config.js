const withPlugins = require('next-compose-plugins')

const optimizedImages = require('next-optimized-images')
const { resolve } = require('path')

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@public/assets'] = resolve(__dirname, 'public/assets')
    return config
  },
  trailingSlash: true,
}

const optimizedImagesConfig = {
  images: {
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif', 'ico']
  },
  limit: 8192,
  optimze: true,
  cacheFolder: 'node_modules/optimized-images-loader/.cache',
  name: '[name]-[contenthash].[ext]',
  outputPath: 'static/chunks/images/',
  publicPath: '/_next/static/chunks/images/',
  mozjpeg: {
    quality: 85,
  },
  oxipng: {
    optimizationLevel: 3,
  },
  gifsicle: {},
  webp: {
    quality: 85,
  },
  svgo: {},

}

module.exports = withPlugins(
  [
    [
      optimizedImages, optimizedImagesConfig
    ],
  ],
  nextConfig
)