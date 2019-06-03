module.exports = {
  siteMetadata: {
    title: 'South Sudan WASH Platform (Admin)',
    description: 'A repository of documents by the WASH cluster in South Sudan',
    author: '@maxmalynowsky',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'South Sudan WASH Platform',
        short_name: 'SSD WASH IM',
        start_url: '/',
        background_color: '#009999',
        theme_color: '#009999',
        display: 'minimal-ui',
        icon: 'src/images/wash-icon.svg',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown',
        path: `${__dirname}/src/markdown`,
      },
    },
    'gatsby-plugin-netlify',
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-svg',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-plugin-typescript',
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
  ],
};
