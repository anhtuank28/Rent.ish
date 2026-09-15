import { prisma } from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";

export class ProductService {
  /**
   * Lấy danh sách sản phẩm (có phân trang)
   * Chỉ lấy những sản phẩm chưa bị xóa mềm (deleted_at: null)
   */
  static async getAllProducts(page: number = 1, limit: number = 12) {
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: { deleted_at: null },
        skip,
        take: limit,
        orderBy: { created_at: "desc" },
        // Chỉ lấy những thông tin cơ bản để hiển thị ngoài danh sách
        select: {
          id: true,
          name: true,
          rental_price: true,
          retail_price: true,
          // Có thể đếm số lượng biến thể hoặc lấy ảnh đại diện (nếu có sau này)
        },
      }),
      prisma.product.count({ where: { deleted_at: null } }),
    ]);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Lấy chi tiết 1 sản phẩm bao gồm cả biến thể và tồn kho
   */
  static async getProductById(id: string) {
    const product = await prisma.product.findFirst({
      where: { 
        id, 
        deleted_at: null 
      },
      include: {
        variants: {
          include: {
            inventory: true, // Lấy luôn danh sách mã vạch để biết số lượng tồn
          },
        },
      },
    });

    if (!product) {
      throw ApiError.notFound("Không tìm thấy sản phẩm");
    }

    return product;
  }

  /**
   * Tạo sản phẩm mới (dành cho Admin)
   */
  static async createProduct(data: {
    name: string;
    description?: string;
    retail_price: number;
    rental_price: number;
  }) {
    const product = await prisma.product.create({
      data,
    });
    return product;
  }

  /**
   * Cập nhật thông tin sản phẩm (dành cho Admin)
   */
  static async updateProduct(id: string, data: any) {
    // Kiểm tra xem có tồn tại không
    await this.getProductById(id);

    const product = await prisma.product.update({
      where: { id },
      data,
    });
    return product;
  }

  /**
   * Xóa mềm sản phẩm (dành cho Admin)
   * Không xóa thật khỏi DB mà chỉ set thời gian bị xóa
   */
  static async deleteProduct(id: string) {
    // Kiểm tra xem có tồn tại không
    await this.getProductById(id);

    await prisma.product.update({
      where: { id },
      data: {
        deleted_at: new Date(),
      },
    });
    
    return { success: true, message: "Đã xóa sản phẩm thành công" };
  }
}
