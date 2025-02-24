import { NextFunction, Request, Response } from "express";
import logger from "../../../utils/logger.js";
import { ErrorHandler } from "../../../utils/error-handling.js";
import { messageLog } from "../../../utils/message-handling.js";
import { ProductService } from "../../../services/admin/products-service/product-service.js";

export class ProductAdminController{
  static async getProducts(req: Request, res: Response, next: NextFunction){
    try {
      //get page from request
      const page: number = Number(req.params.page) || 1;
      const limit: number = 10;
      logger.debug('page: ' + page + ' limit: ' + limit);

      //get users from UserService and send response to client
      const result = await ProductService.getProducts(page, limit);
      logger.debug('result: ' + JSON.stringify(result));

      res.status(200).json(result);
    } catch (error) {
      logger.error(messageLog.errorInProductAdminController, error);
      next(new ErrorHandler(messageLog.errorInProductAdminController, 500));
    } 
  }
}