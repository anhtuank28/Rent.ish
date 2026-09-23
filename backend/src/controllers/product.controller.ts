import type { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service.js";

export class ProductController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query["page"] ? parseInt(req.query["page"] as string) : 1;
      const limit = req.query["limit"] ? parseInt(req.query["limit"] as string) : 12;
      const search = req.query["search"] as string | undefined;
      const size = req.query["size"] as string | undefined;
      const color = req.query["color"] as string | undefined;
      const minPrice = req.query["minPrice"] ? parseFloat(req.query["minPrice"] as string) : undefined;
      const maxPrice = req.query["maxPrice"] ? parseFloat(req.query["maxPrice"] as string) : undefined;
      const sortBy = req.query["sortBy"] as 'newest' | 'price_asc' | 'price_desc' | undefined;

      const result = await ProductService.getAllProducts({
        page,
        limit,
        search,
        size,
        color,
        minPrice,
        maxPrice,
        sortBy,
      });
      
      res.status(200).json({
        success: true,
        data: result.products,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id as string);
      
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO: Thêm Validation (VD: Zod) ở middleware trước khi vào controller
      const product = await ProductService.createProduct(req.body);
      
      res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductService.updateProduct(id as string, req.body);
      
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await ProductService.deleteProduct(id as string);
      
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
