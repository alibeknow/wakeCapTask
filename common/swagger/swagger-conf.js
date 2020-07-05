module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'WakeCap task for backend',
    description: 'wakecap APIs documentation',
    termsOfService: 'http://wakecap.com/terms/',
    contact: {
      name: 'API Support',
      url: 'http://www.wakecap.com/support',
      email: 'support@wakecap.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    },
    version: '1.0'
  },
  servers: [
    {
      url: '{protocol}://localhost:3000/api/v0',
      description: 'Localhost server',
      variables: {
        protocol: {
          enum: ['http'],
          default: 'http'
        }
      }
    },
    {
      url: '{protocol}://wakecap.com/api/v0',
      description: 'For production to be added',
      variables: {
        protocol: {
          enum: ['http'],
          default: 'http'
        }
      }
    }
  ],
  tags: [
    {
      name: 'Client'
    },
    {
      name: 'Site'
    },
    {
      name: 'Worker'
    },
    {
      name: 'Asset'
    },
    {
      name: 'Report'
    }
  ]
};
