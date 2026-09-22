import { prisma } from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";

export interface ProductFilterOptions {
  page?: number | undefined;
  limit?: number | undefined;
  search?: string | undefined;
  size?: string | undefined;
  color?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
}

export class ProductService {
  /**
   * Lấy danh sách sản phẩm (có phân trang và bộ lọc linh hoạt)
   * Chỉ lấy những sản phẩm chưa bị xóa mềm (deleted_at: null)
   */
  static async getAllProducts(
    optionsOrPage: number | ProductFilterOptions = 1,
    limitArg: number = 12
  ) {
    const options: ProductFilterOptions =
      typeof optionsOrPage === "number"
        ? { page: optionsOrPage, limit: limitArg }
        : optionsOrPage;

    const page = options.page && options.page > 0 ? options.page : 1;
    const limit = options.limit && options.limit > 0 ? options.limit : 12;
    const skip = (page - 1) * limit;

    const where: any = { deleted_at: null };

    // Tìm kiếm theo tên hoặc mô tả
    if (options.search && options.search.trim() !== "") {
      const searchTerm = options.search.trim();
      where.OR = [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
      ];
    }

    // Lọc theo khoảng giá thuê
    if (options.minPrice !== undefined || options.maxPrice !== undefined) {
      where.rental_price = {};
      if (options.minPrice !== undefined) {
        where.rental_price.gte = options.minPrice;
      }
      if (options.maxPrice !== undefined) {
        where.rental_price.lte = options.maxPrice;
      }
    }

    // Lọc theo size hoặc màu sắc của variant
    if (options.size || options.color) {
      const variantFilter: any = {};
      if (options.size && options.size.toLowerCase() !== "all") {
        variantFilter.size = { equals: options.size, mode: "insensitive" };
      }
      if (options.color && options.color.toLowerCase() !== "all") {
        variantFilter.color = { equals: options.color, mode: "insensitive" };
      }
      if (Object.keys(variantFilter).length > 0) {
        where.variants = {
          some: variantFilter,
        };
      }
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: "desc" },
        // Chỉ lấy những thông tin cơ bản để hiển thị ngoài danh sách
        select: {
          id: true,
          name: true,
          description: true,
          rental_price: true,
          retail_price: true,
          image_url: true,
          images: true,
          variants: true,
        },
      }),
      prisma.product.count({ where }),
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
    image_url?: string;
    images?: string[];
    retail_price: number;
    rental_price: number;
    variants?: Array<{
      size: string;
      color: string;
      sku: string;
      inventory_count?: number;
    }>;
  }) {
    const { variants, images, ...rest } = data;
    const finalImages = images && images.length > 0 ? images : (rest.image_url ? [rest.image_url] : []);
    const productData = {
      ...rest,
      image_url: finalImages[0] || rest.image_url || null,
      images: finalImages,
    };

    return await prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: productData,
      });

      const variantsToCreate = (variants && variants.length > 0)
        ? variants
        : [{ size: "Freesize", color: "Tiêu chuẩn", sku: `SKU-${Date.now().toString(36).toUpperCase()}`, inventory_count: 3 }];

      for (const v of variantsToCreate) {
        const variant = await tx.productVariant.create({
          data: {
            product_id: product.id,
            size: v.size,
            color: v.color,
            sku: v.sku,
          }
        });

        const count = v.inventory_count || 3;
        for (let i = 1; i <= count; i++) {
          await tx.inventoryUnit.create({
            data: {
              variant_id: variant.id,
              barcode: `BC-${v.sku}-${i}`,
              status: "AVAILABLE",
            }
          });
        }
      }

      return product;
    });
  }

  /**
   * Cập nhật thông tin sản phẩm (dành cho Admin)
   */
  static async updateProduct(id: string, data: any) {
    // Kiểm tra xem có tồn tại không
    await this.getProductById(id);

    const { images, ...rest } = data;
    const updateData: any = { ...rest };
    if (images !== undefined) {
      updateData.images = images;
      if (images.length > 0) {
        // Tự động đồng bộ ảnh đầu tiên trong mảng làm ảnh đại diện chính
        updateData.image_url = images[0];
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
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
