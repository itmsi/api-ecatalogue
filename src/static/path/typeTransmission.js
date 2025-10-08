/**
 * Swagger Path Definitions for Type Transmission Module
 */

const typeTransmissionPaths = {
  '/type_transmission/get': {
    post: {
      tags: ['Type Transmission'],
      summary: 'Get all type transmissions with pagination and filtering',
      description: 'Retrieve a paginated list of type transmissions with optional search and filtering capabilities',
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
              $ref: '#/components/schemas/TypeTransmissionGetInput'
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
          description: 'Successfully retrieved type transmissions list',
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
                    $ref: '#/components/schemas/TypeTransmissionPaginationResponse'
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Bad Request - Validation Error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - Invalid or missing token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal Server Error',
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
  '/type_transmission/create': {
    post: {
      tags: ['Type Transmission'],
      summary: 'Create new type transmission',
      description: 'Create a new type transmission record',
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
              $ref: '#/components/schemas/TypeTransmissionCreateInput'
            },
            example: {
              type_transmission_name_en: 'Manual Transmission',
              type_transmission_name_cn: '手动变速器',
              type_transmission_description: 'Transmission yang dioperasikan secara manual'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Type transmission created successfully',
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
                    example: 'Type transmission berhasil dibuat'
                  },
                  data: {
                    $ref: '#/components/schemas/TypeTransmissionResponse'
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Bad Request - Validation Error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - Invalid or missing token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal Server Error',
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
  '/type_transmission/{id}': {
    get: {
      tags: ['Type Transmission'],
      summary: 'Get type transmission by ID',
      description: 'Retrieve a single type transmission by its ID',
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
          description: 'Type transmission UUID',
          schema: {
            type: 'string',
            format: 'uuid'
          },
          example: '123e4567-e89b-12d3-a456-426614174000'
        }
      ],
      responses: {
        200: {
          description: 'Successfully retrieved type transmission',
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
                    $ref: '#/components/schemas/TypeTransmissionResponse'
                  }
                }
              }
            }
          }
        },
        404: {
          description: 'Type transmission not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - Invalid or missing token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal Server Error',
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
      tags: ['Type Transmission'],
      summary: 'Update type transmission',
      description: 'Update an existing type transmission by ID',
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
          description: 'Type transmission UUID',
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
              $ref: '#/components/schemas/TypeTransmissionUpdateInput'
            },
            example: {
              type_transmission_name_en: 'Automatic Transmission',
              type_transmission_name_cn: '自动变速器',
              type_transmission_description: 'Transmission yang beroperasi otomatis'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Type transmission updated successfully',
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
                    example: 'Type transmission berhasil diupdate'
                  },
                  data: {
                    $ref: '#/components/schemas/TypeTransmissionResponse'
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Bad Request - Validation Error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        404: {
          description: 'Type transmission not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - Invalid or missing token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal Server Error',
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
      tags: ['Type Transmission'],
      summary: 'Delete type transmission',
      description: 'Soft delete a type transmission by ID',
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
          description: 'Type transmission UUID',
          schema: {
            type: 'string',
            format: 'uuid'
          },
          example: '123e4567-e89b-12d3-a456-426614174000'
        }
      ],
      responses: {
        200: {
          description: 'Type transmission deleted successfully',
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
                    example: 'Type transmission berhasil dihapus'
                  }
                }
              }
            }
          }
        },
        404: {
          description: 'Type transmission not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - Invalid or missing token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal Server Error',
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

module.exports = typeTransmissionPaths;
