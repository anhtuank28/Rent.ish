import { prisma } from '../config/prisma.js';
import { ApiError } from '../utils/ApiError.js';

export class CartService {
  // Lấy hoặc tạo mới giỏ hàng cho User
  async getCart(userId: string) {
    let cart = await prisma.cart.findUnique({
      where: { user_id: userId },
      include: {
        items: {
          include: {
            variant: {
              include: { product: true }
            }
          }
        }
      }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { user_id: userId },
        include: { items: { include: { variant: { include: { product: true } } } } }
      });
    }
    return cart;
  }

  // Merge giỏ hàng từ LocalStorage vào Database
  async mergeCart(userId: string, localItems: any[]) {
    const cart = await this.getCart(userId);

    for (const item of localItems) {
      // Kiểm tra trùng lặp
      const existingItem = await prisma.cartItem.findFirst({
        where: {
          cart_id: cart.id,
          variant_id: item.variantId,
          rental_start_date: new Date(item.rentalStartDate),
          rental_end_date: new Date(item.rentalEndDate)
        }
      });

      if (!existingItem) {
        await prisma.cartItem.create({
          data: {
            cart_id: cart.id,
            variant_id: item.variantId,
            rental_start_date: new Date(item.rentalStartDate),
            rental_end_date: new Date(item.rentalEndDate)
          }
        });
      }
    }

    return this.getCart(userId);
  }

  // Xóa 1 item khỏi giỏ
  async removeItem(userId: string, itemId: string) {
    const cart = await this.getCart(userId);
    
    // Xác minh item thuộc về cart này
    const item = await prisma.cartItem.findUnique({ where: { id: itemId } });
    if (!item || item.cart_id !== cart.id) {
      throw new ApiError(404, 'Cart item not found');
    }

    await prisma.cartItem.delete({ where: { id: itemId } });
    return this.getCart(userId);
  }
}

export const cartService = new CartService();
