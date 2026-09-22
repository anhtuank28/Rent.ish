import type { Request, Response, NextFunction } from "express";
import { BookingService } from "../services/booking.service.js";

export class BookingController {
  
  static async checkAvailability(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: productId } = req.params;
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        res.status(400).json({ success: false, message: "Vui lòng cung cấp startDate và endDate" });
        return;
      }

      const availableUnits = await BookingService.checkAvailability(
        productId as string,
        startDate as string,
        endDate as string
      );

      res.status(200).json({
        success: true,
        data: availableUnits,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { address, paymentMethod, items } = req.body;
      
      const booking = await BookingService.checkoutCart(userId, address, paymentMethod, items);
      
      res.status(201).json({
        success: true,
        message: "Đặt thuê thành công",
        data: booking,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMyOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const orders = await BookingService.getMyOrders(userId);
      
      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await BookingService.getAllBookings();
      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const booking = await BookingService.getBookingById(id as string);
      
      res.status(200).json({
        success: true,
        data: booking,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status) {
        res.status(400).json({ success: false, message: "Trạng thái (status) không được để trống" });
        return;
      }

      const booking = await BookingService.updateStatus(id as string, status);
      
      res.status(200).json({
        success: true,
        message: "Cập nhật trạng thái thành công",
        data: booking,
      });
    } catch (error) {
      next(error);
    }
  }
}
