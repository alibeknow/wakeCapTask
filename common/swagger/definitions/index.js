module.exports = {
  AddAssetRequest: {
    title: 'AddAssetRequest',
    required: ['coordinates', 'is_active', 'duration', 'worker_id'],
    type: 'object',
    properties: {
      coordinates: {
        $ref: '#/components/schemas/Coordinates'
      },
      is_active: {
        type: 'boolean'
      },
      duration: {
        type: 'integer',
        format: 'int32'
      },
      worker_id: {
        type: 'string'
      }
    },
    example: {
      coordinates: {
        coordinates: [50.22222, 30.11111],
        type: 'Point'
      },
      is_active: true,
      duration: 100,
      worker_id: '5eeaa9acc80dab2da1f9e987'
    }
  },
  Coordinates: {
    title: 'Coordinates',
    required: ['coordinates', 'type'],
    type: 'object',
    properties: {
      coordinates: {
        type: 'array',
        items: {
          type: 'number'
        },
        description: ''
      },
      type: {
        type: 'string'
      }
    },
    example: {
      coordinates: [50.22222, 30.11111],
      type: 'Point'
    }
  },
  AddSiteRequest: {
    title: 'AddSiteRequest',
    required: [
      'clientId',
      'name',
      'coordinates',
      'timezone',
      'startingHour',
      'endingHour',
      'lateThresholdHour',
      'totalInactiveHours'
    ],
    type: 'object',
    properties: {
      clientId: {
        type: 'string'
      },
      name: {
        type: 'string'
      },
      coordinates: {
        type: 'array',
        items: {
          type: 'integer',
          format: 'int32'
        },
        description: ''
      },
      timezone: {
        type: 'string'
      },
      startingHour: {
        type: 'integer',
        format: 'int32'
      },
      endingHour: {
        type: 'integer',
        format: 'int32'
      },
      lateThresholdHour: {
        type: 'integer',
        format: 'int32'
      },
      totalInactiveHours: {
        type: 'integer',
        format: 'int32'
      }
    },
    example: {
      clientId: '5eea8e23bd9d7e1411bddf71',
      name: 'test site',
      coordinates: [1000, 2000],
      timezone: 'America/Los_Angeles',
      startingHour: 8,
      endingHour: 17,
      lateThresholdHour: 1,
      totalInactiveHours: 1
    }
  },
  AddWorkerRequest: {
    title: 'AddWorkerRequest',
    required: ['name', 'clientId', 'siteId'],
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      clientId: {
        type: 'string'
      },
      siteId: {
        type: 'string'
      }
    },
    example: {
      name: 'test worker',
      clientId: '5eea8e23bd9d7e1411bddf71',
      siteId: '5eeaa8a4c80dab2da1f9e986'
    }
  }
};
