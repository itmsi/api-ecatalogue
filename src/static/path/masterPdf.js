/**
 * API Path Definitions for Master PDF Module
 */

const masterPdfPaths = {
  '/master-pdf/get': {
    post: {
      tags: ['Master PDF'],
      summary: 'Get master PDF data with pagination and filtering',
      description: 'Retrieve a paginated list of master PDF files with optional filtering by search, status, category, and sorting',
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
              $ref: '#/components/schemas/MasterPdfGetInput'
            },
            example: {
              page: 1,
              limit: 10,
              search: '',
              sort_by: 'created_at',
              sort_order: 'desc',
              status: '',
              category: ''
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Successfully retrieved master PDF data',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MasterPdfListResponse'
              },
              example: {
                success: true,
                message: 'Data master PDF berhasil diambil',
                data: [
                  {
                    id: '550e8400-e29b-41d4-a716-446655440000',
                    name: 'Product Manual 2024',
                    description: 'Manual produk terbaru tahun 2024',
                    file_path: '/uploads/manuals/product_manual_2024.pdf',
                    file_size: 2048576,
                    category: 'manual',
                    status: 'active',
                    created_at: '2024-01-15T10:30:00Z',
                    updated_at: '2024-01-15T10:30:00Z'
                  }
                ],
                pagination: {
                  current_page: 1,
                  per_page: 10,
                  total: 25,
                  total_pages: 3,
                  has_next_page: true,
                  has_prev_page: false
                }
              }
            }
          }
        },
        400: {
          description: 'Bad request - Invalid input parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              },
              example: {
                success: false,
                message: 'Parameter pagination tidak valid. Page harus >= 1, limit harus 1-100'
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

module.exports = masterPdfPaths;
