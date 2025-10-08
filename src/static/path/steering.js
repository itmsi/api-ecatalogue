/**
 * Swagger Path Definitions for Steering Module
 */

const steeringPaths = {
  '/steering/get': {
    post: {
      tags: ['Steering'],
      summary: 'Get all steerings with pagination and filtering',
      description: 'Retrieve a paginated list of steerings with optional search and filtering capabilities',
      security: [
        {
          bearerAuth: []
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SteeringGetInput'
            },
            example: {
              page: 1,
              limit: 10,
              search: '',
              sort_by: 'created_at',
              sort_order: 'desc'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Successfully retrieved steerings list',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  },
                  data: {
                    $ref: '#/components/schemas/SteeringPaginationResponse'
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Bad request - validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - invalid or missing token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    }
  },
  '/steering/create': {
    post: {
      tags: ['Steering'],
      summary: 'Create new steering',
      description: 'Create a new steering record with optional type_steerings associations',
      security: [
        {
          bearerAuth: []
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SteeringInput'
            },
            example: {
              steering_name_en: 'Power Steering',
              steering_name_cn: '动力转向',
              steering_description: 'Power steering system',
              type_steerings: [
                {
                  type_steering_name_en: 'Electric Power Steering',
                  type_steering_name_cn: '电动助力转向',
                  type_steering_description: 'Electric power steering'
                },
                {
                  type_steering_name_en: 'Hydraulic Power Steering',
                  type_steering_name_cn: '液压助力转向',
                  type_steering_description: 'Hydraulic power steering'
                }
              ]
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Successfully created steering',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  message: {
                    type: 'string',
                    example: 'Steering berhasil dibuat'
                  },
                  data: {
                    $ref: '#/components/schemas/Steering'
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Bad request - validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - invalid or missing token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    }
  },
  '/steering/{id}': {
    get: {
      tags: ['Steering'],
      summary: 'Get steering by ID',
      description: 'Retrieve a single steering record by its ID including related type_steerings',
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Steering ID (UUID)',
          schema: {
            type: 'string',
            format: 'uuid'
          },
          example: '123e4567-e89b-12d3-a456-426614174000'
        }
      ],
      responses: {
        200: {
          description: 'Successfully retrieved steering',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  message: {
                    type: 'string',
                    example: 'Success'
                  },
                  data: {
                    $ref: '#/components/schemas/Steering'
                  }
                }
              }
            }
          }
        },
        404: {
          description: 'Steering not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - invalid or missing token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['Steering'],
      summary: 'Update steering',
      description: 'Update an existing steering record with type_steerings',
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Steering ID (UUID)',
          schema: {
            type: 'string',
            format: 'uuid'
          },
          example: '123e4567-e89b-12d3-a456-426614174000'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SteeringUpdateInput'
            },
            example: {
              steering_name_en: 'Hydraulic Power Steering',
              steering_name_cn: '液压助力转向',
              steering_description: 'Hydraulic power steering system',
              type_steerings: [
                {
                  type_steering_name_en: 'Hydraulic Assist',
                  type_steering_name_cn: '液压辅助',
                  type_steering_description: 'Hydraulic assist description'
                }
              ]
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Successfully updated steering',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  message: {
                    type: 'string',
                    example: 'Steering berhasil diupdate'
                  },
                  data: {
                    $ref: '#/components/schemas/Steering'
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Bad request - validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        404: {
          description: 'Steering not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - invalid or missing token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    },
    delete: {
      tags: ['Steering'],
      summary: 'Delete steering',
      description: 'Soft delete a steering record (data will not be permanently removed)',
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Steering ID (UUID)',
          schema: {
            type: 'string',
            format: 'uuid'
          },
          example: '123e4567-e89b-12d3-a456-426614174000'
        }
      ],
      responses: {
        200: {
          description: 'Successfully deleted steering',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  message: {
                    type: 'string',
                    example: 'Steering berhasil dihapus'
                  }
                }
              }
            }
          }
        },
        404: {
          description: 'Steering not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - invalid or missing token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    }
  }
};

module.exports = steeringPaths;

