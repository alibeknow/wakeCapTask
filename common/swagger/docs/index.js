module.exports = {
  '/assets': {
    post: {
      tags: ['Asset'],
      summary: 'Add Asset',
      operationId: 'AddAsset',
      parameters: [],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AddAssetRequest'
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
          }
        },
        required: true
      },
      responses: {
        responses: {
          200: {
            description: 'Ok',
            headers: {},
            content: {
              'application/json': {
                example: {
                  example: {
                    success: true,
                    message: 'Asset log created successfully',
                    data: null
                  }
                }
              }
            }
          },
          400: {
            description: 'Bad request'
          },
          500: {
            description: 'Server Error'
          },
          401: {
            description: 'UnAuthorized'
          }
        },
        deprecated: false
      }
    }
  },
  '/reports': {
    get: {
      tags: ['Report'],
      summary: 'List Reports',
      operationId: 'ListReports',
      parameters: [
        {
          name: 'page',
          in: 'query',
          description: 'Page',
          style: 'form',
          explode: true,
          schema: {
            type: 'integer',
            format: 'int32',
            example: 1
          }
        },
        {
          name: 'limit',
          in: 'query',
          description: 'Limit',
          style: 'form',
          explode: true,
          schema: {
            type: 'integer',
            format: 'int32',
            example: 25
          }
        },
        {
          name: 'clientId',
          in: 'query',
          description: 'Client Id',
          style: 'form',
          explode: true,
          schema: {
            type: 'string',
            example: '5eea8e23bd9d7e1411bddf71'
          }
        },
        {
          name: 'siteId',
          in: 'query',
          description: 'Site Id',
          style: 'form',
          explode: true,
          schema: {
            type: 'string',
            example: '5eeaa8a4c80dab2da1f9e986'
          }
        }
      ],
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          content: {
            'application/json': {
              example: {
                example: {
                  success: true,
                  message: 'Done successfully.',
                  data: {
                    count: 1,
                    limit: 25,
                    page: 1,
                    pages: 1,
                    list: [
                      {
                        _id: '5eeacd7296c8365d1e33532c',
                        absentWorkers: [
                          {
                            _id: '5eeac176918c954c754678f8',
                            name: 'test worker 1'
                          }
                        ],
                        lateWorkers: [
                          {
                            _id: '5eeaa9acc80dab2da1f9e987',
                            name: 'test worker'
                          }
                        ],
                        clientId: {
                          _id: '5eea8e23bd9d7e1411bddf71',
                          name: 'test'
                        },
                        siteId: {
                          _id: '5eeaa8a4c80dab2da1f9e986',
                          name: 'Test'
                        },
                        totalAbsentWorkers: 1,
                        totalActiveHours: 0.03,
                        totalInActiveHours: 0.03,
                        totalLateWorkers: 1,
                        createdAt: '2020-06-18T02:12:02.066Z',
                        updatedAt: '2020-06-18T02:12:02.066Z',
                        __v: 0
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Server Error'
        },
        401: {
          description: 'UnAuthorized'
        }
      },
      deprecated: false
    }
  },
  '/sites': {
    post: {
      tags: ['Site'],
      summary: 'Add Site',
      operationId: 'AddSite',
      parameters: [],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AddSiteRequest'
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
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          content: {
            'application/json': {
              example: {
                example: {
                  success: true,
                  message: 'Site added successfully',
                  data: null
                }
              }
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Server Error'
        },
        401: {
          description: 'UnAuthorized'
        }
      },
      deprecated: false
    }
  },
  '/clients': {
    post: {
      tags: ['Client'],
      summary: 'Add Client',
      operationId: 'AddClient',
      parameters: [],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AddClientRequest'
            },
            example: {
              name: 'Alibek Nauryzbayev',
              phoneNumber: '+7777 0999431',
              email: 'alibek.amazing@gmail.com'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          content: {
            'application/json': {
              example: {
                example: {
                  success: true,
                  message: 'Client created successfully',
                  data: null
                }
              }
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Server Error'
        },
        401: {
          description: 'UnAuthorized'
        }
      },
      deprecated: false
    }
  },
  '/workers': {
    post: {
      tags: ['Worker'],
      summary: 'Add Worker',
      operationId: 'AddWorker',
      parameters: [],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AddWorkerRequest'
            },
            example: {
              name: 'test worker',
              clientId: '5eea8e23bd9d7e1411bddf71',
              siteId: '5eeaa8a4c80dab2da1f9e986'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          content: {
            'application/json': {
              example: {
                example: {
                  success: true,
                  message: 'Worker added successfully.',
                  data: null
                }
              }
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Server Error'
        },
        401: {
          description: 'UnAuthorized'
        }
      },
      deprecated: false
    }
  }
};
