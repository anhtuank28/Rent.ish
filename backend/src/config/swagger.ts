export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Rent-ish Fashion Rental API",
    version: "1.0.0",
    description: "Tài liệu API chính thức của nền tảng thuê trang phục thiết kế Rent-ish. Hỗ trợ xác thực JWT cookie, kiểm tra trùng lịch thông minh bằng GiST exclusion constraint daterange của PostgreSQL, Hybrid Cart đồng bộ guest ➔ user, và phân quyền quản trị ADMIN.",
    contact: {
      name: "Rent-ish Engineering Team",
      email: "engineering@rent.ish"
    }
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "Development Server (Local)"
    },
    {
      url: "https://rent-ish-backend.onrender.com",
      description: "Production Server (Render Cloud)"
    }
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "accessToken",
        description: "JWT access token được lưu trữ tự động trong httpOnly cookie khi đăng nhập."
      },
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Token dạng Bearer Header trong trường hợp client không hỗ trợ cookie."
      }
    },
    schemas: {
      ApiError: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: { type: "string", example: "Lỗi kiểm tra dữ liệu đầu vào" },
          errors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                field: { type: "string" },
                message: { type: "string" }
              }
            }
          }
        }
      },
      User: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          email: { type: "string", format: "email" },
          fullName: { type: "string", example: "Nguyễn Văn A" },
          role: { type: "string", enum: ["USER", "ADMIN"], example: "USER" },
          created_at: { type: "string", format: "date-time" }
        }
      },
      ProductVariant: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          size: { type: "string", example: "M" },
          color: { type: "string", example: "Đỏ Rượu" },
          sku: { type: "string", example: "DH-ELIANA-RED-M" }
        }
      },
      Product: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string", example: "Đầm Dạ Hội Eliana Xẻ Đùi" },
          description: { type: "string", example: "Chất liệu lụa cao cấp xẻ tà quyến rũ." },
          rental_price: { type: "number", example: 600000 },
          retail_price: { type: "number", example: 4500000 },
          image_url: { type: "string", format: "uri" },
          variants: {
            type: "array",
            items: { $ref: "#/components/schemas/ProductVariant" }
          }
        }
      },
      Booking: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          user_id: { type: "string", format: "uuid" },
          total_price: { type: "number", example: 600000 },
          status: { type: "string", enum: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"], example: "PENDING" },
          created_at: { type: "string", format: "date-time" }
        }
      }
    }
  },
  tags: [
    { name: "Health", description: "Kiểm tra trạng thái hoạt động của server" },
    { name: "Auth", description: "Đăng ký, Đăng nhập, Quản lý phiên và lấy thông tin User" },
    { name: "Products", description: "Danh mục sản phẩm, bộ lọc tìm kiếm và quản lý sản phẩm" },
    { name: "Availability", description: "Kiểm tra tình trạng trống (chống trùng lịch GiST PostgreSQL)" },
    { name: "Bookings", description: "Tạo đơn đặt thuê, checkout giỏ hàng và quản lý đơn" },
    { name: "Cart", description: "Quản lý giỏ hàng Hybrid (LocalStorage + Database merge)" },
    { name: "Users", description: "Quản trị người dùng và phân quyền (Dành riêng cho ADMIN)" }
  ],
  paths: {
    "/api/health": {
      get: {
        tags: ["Health"],
        summary: "Kiểm tra tình trạng server (Health Check)",
        responses: {
          200: {
            description: "Server đang chạy bình thường",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "Rent-ish API is running 🚀" },
                    timestamp: { type: "string", format: "date-time" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Đăng ký tài khoản mới",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", format: "email", example: "customer@gmail.com" },
                  password: { type: "string", minLength: 8, example: "Password123" },
                  first_name: { type: "string", example: "Anh" },
                  last_name: { type: "string", example: "Nguyễn" },
                  phone: { type: "string", example: "0901234567" }
                }
              }
            }
          }
        },
        responses: {
          201: { description: "Đăng ký thành công" },
          400: { description: "Email đã tồn tại hoặc dữ liệu không hợp lệ" }
        }
      }
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Đăng nhập và nhận JWT Cookie",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", format: "email", example: "user@example.com" },
                  password: { type: "string", example: "your_password" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Đăng nhập thành công, set cookie accessToken và refreshToken" },
          401: { description: "Email hoặc mật khẩu không chính xác" }
        }
      }
    },
    "/api/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Lấy thông tin tài khoản hiện tại từ phiên đăng nhập",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        responses: {
          200: {
            description: "Thông tin người dùng",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/User" }
                  }
                }
              }
            }
          },
          401: { description: "Chưa đăng nhập hoặc token không hợp lệ" }
        }
      }
    },
    "/api/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Đăng xuất và xóa cookie",
        responses: {
          200: { description: "Đăng xuất thành công" }
        }
      }
    },
    "/api/products": {
      get: {
        tags: ["Products"],
        summary: "Lấy danh sách sản phẩm (có bộ lọc & phân trang)",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 }, description: "Số trang" },
          { name: "limit", in: "query", schema: { type: "integer", default: 12 }, description: "Số món trên 1 trang" },
          { name: "search", in: "query", schema: { type: "string" }, description: "Từ khóa tìm kiếm theo tên hoặc mô tả" },
          { name: "size", in: "query", schema: { type: "string" }, description: "Kích cỡ variant (S, M, L, Freesize...)" },
          { name: "color", in: "query", schema: { type: "string" }, description: "Màu sắc" },
          { name: "minPrice", in: "query", schema: { type: "number" }, description: "Giá thuê tối thiểu" },
          { name: "maxPrice", in: "query", schema: { type: "number" }, description: "Giá thuê tối đa" }
        ],
        responses: {
          200: {
            description: "Danh sách sản phẩm phù hợp",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Product" }
                    },
                    pagination: {
                      type: "object",
                      properties: {
                        page: { type: "integer" },
                        limit: { type: "integer" },
                        total: { type: "integer" },
                        totalPages: { type: "integer" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Products"],
        summary: "Tạo sản phẩm mới (ADMIN)",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "retail_price", "rental_price"],
                properties: {
                  name: { type: "string", example: "Đầm Dạ Hội Sequins Ánh Kim" },
                  description: { type: "string", example: "Đính kết hạt lấp lánh." },
                  rental_price: { type: "number", example: 850000 },
                  retail_price: { type: "number", example: 6000000 },
                  image_url: { type: "string", format: "uri" },
                  variants: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        size: { type: "string", example: "M" },
                        color: { type: "string", example: "Vàng Gold" },
                        sku: { type: "string", example: "DH-GOLD-M-1" },
                        inventory_count: { type: "integer", example: 2 }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          201: { description: "Tạo sản phẩm thành công" },
          401: { description: "Chưa đăng nhập" },
          403: { description: "Yêu cầu quyền ADMIN" }
        }
      }
    },
    "/api/products/{id}": {
      get: {
        tags: ["Products"],
        summary: "Lấy thông tin chi tiết một sản phẩm",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }
        ],
        responses: {
          200: { description: "Chi tiết sản phẩm kèm variants và tồn kho" },
          404: { description: "Không tìm thấy sản phẩm" }
        }
      },
      delete: {
        tags: ["Products"],
        summary: "Xóa mềm một sản phẩm (ADMIN)",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }
        ],
        responses: {
          200: { description: "Xóa sản phẩm thành công" },
          403: { description: "Yêu cầu quyền ADMIN" }
        }
      }
    },
    "/api/products/{id}/availability": {
      get: {
        tags: ["Availability"],
        summary: "Kiểm tra tình trạng trống (Availability) bằng GiST daterange constraint",
        description: "Kiểm tra xem sản phẩm có unit nào trống trong khoảng ngày [startDate, endDate] hay không mà không bị trùng lịch với bất kỳ đơn thuê nào khác.",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" }, description: "ID sản phẩm" },
          { name: "startDate", in: "query", required: true, schema: { type: "string", format: "date", example: "2026-10-01" } },
          { name: "endDate", in: "query", required: true, schema: { type: "string", format: "date", example: "2026-10-05" } }
        ],
        responses: {
          200: {
            description: "Danh sách inventory units còn trống",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          inventory_unit_id: { type: "string", format: "uuid" },
                          barcode: { type: "string" },
                          size: { type: "string" },
                          color: { type: "string" }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          400: { description: "Ngày bắt đầu phải trước ngày kết thúc" }
        }
      }
    },
    "/api/bookings/checkout": {
      post: {
        tags: ["Bookings"],
        summary: "Checkout giỏ hàng để tạo đơn thuê",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["address"],
                properties: {
                  address: {
                    type: "object",
                    required: ["fullName", "phone", "street", "city", "district", "ward"],
                    properties: {
                      fullName: { type: "string", example: "Trần Thị Mai" },
                      phone: { type: "string", example: "0912345678" },
                      street: { type: "string", example: "123 Lê Lợi" },
                      city: { type: "string", example: "Hà Nội" },
                      district: { type: "string", example: "Hoàn Kiếm" },
                      ward: { type: "string", example: "Tràng Tiền" }
                    }
                  },
                  paymentMethod: { type: "string", default: "COD", example: "COD" }
                }
              }
            }
          }
        },
        responses: {
          201: { description: "Tạo đơn đặt thuê thành công" },
          409: { description: "Xung đột lịch thuê (GiST constraint báo trùng ngày với khách khác)" }
        }
      }
    },
    "/api/bookings/my-orders": {
      get: {
        tags: ["Bookings"],
        summary: "Lấy lịch sử đơn hàng của người dùng hiện tại",
        security: [{ cookieAuth: [] }],
        responses: {
          200: { description: "Danh sách đơn hàng của khách" }
        }
      }
    },
    "/api/bookings/admin/all": {
      get: {
        tags: ["Bookings"],
        summary: "Lấy toàn bộ đơn hàng trong hệ thống (ADMIN)",
        security: [{ cookieAuth: [] }],
        responses: {
          200: { description: "Toàn bộ đơn hàng" },
          403: { description: "Yêu cầu quyền ADMIN" }
        }
      }
    },
    "/api/bookings/{id}/status": {
      patch: {
        tags: ["Bookings"],
        summary: "Cập nhật trạng thái đơn hàng (ADMIN)",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["status"],
                properties: {
                  status: { type: "string", enum: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"] }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Cập nhật trạng thái thành công" }
        }
      }
    },
    "/api/cart": {
      get: {
        tags: ["Cart"],
        summary: "Lấy giỏ hàng của người dùng",
        security: [{ cookieAuth: [] }],
        responses: {
          200: { description: "Dữ liệu giỏ hàng" }
        }
      }
    },
    "/api/cart/merge": {
      post: {
        tags: ["Cart"],
        summary: "Đồng bộ giỏ hàng LocalStorage vào Database khi đăng nhập",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  localItems: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        variantId: { type: "string", format: "uuid" },
                        rentalStartDate: { type: "string", format: "date-time" },
                        rentalEndDate: { type: "string", format: "date-time" }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Đồng bộ giỏ hàng thành công" }
        }
      }
    },
    "/api/users": {
      get: {
        tags: ["Users"],
        summary: "Danh sách tài khoản người dùng (ADMIN)",
        security: [{ cookieAuth: [] }],
        responses: {
          200: { description: "Danh sách người dùng" },
          403: { description: "Yêu cầu quyền ADMIN" }
        }
      }
    },
    "/api/users/{id}/role": {
      patch: {
        tags: ["Users"],
        summary: "Phân quyền USER hoặc ADMIN (ADMIN)",
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["role"],
                properties: {
                  role: { type: "string", enum: ["USER", "ADMIN"] }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Cập nhật quyền thành công" }
        }
      }
    }
  }
};
