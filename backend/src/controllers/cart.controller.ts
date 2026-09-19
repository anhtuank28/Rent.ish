import type { Request, Response, NextFunction } from 'express';
import { cartService } from '../services/cart.service.js';

export class CartController {
  getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const cart = await cartService.getCart(userId);
      res.status(200).json({ success: true, data: cart });
    } catch (error) {
      next(error);
    }
  };

  mergeCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const { localItems } = req.body;
      const cart = await cartService.mergeCart(userId, localItems || []);
      res.status(200).json({ success: true, data: cart });
    } catch (error) {
      next(error);
    }
  };

  removeItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const { itemId } = req.params;
      const cart = await cartService.removeItem(userId, itemId);
      res.status(200).json({ success: true, data: cart });
    } catch (error) {
      next(error);
    }
  };
}

export const cartController = new CartController();
