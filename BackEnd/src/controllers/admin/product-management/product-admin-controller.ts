import e, { NextFunction, Request, Response } from 'express';
import logger from '../../../utils/logger.js';
import { ErrorHandler } from '../../../utils/error-handling.js';
import { ProductService } from '../../../services/admin/products-service/product-service.js';
import { errorMessage } from '../../../utils/message/error-message.js';
import { notifyMessage } from '../../../utils/message/notify-message.js';

export class ProductAdminController {
  static async getProducts(req: Request, res: Response, next: NextFunction) {
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
      logger.error(
        errorMessage.errorInProductAdminController + ' getProducts function:',
        error
      );
      next(error);
    }
  }
  static async AddProduct(req: Request, res: Response, next: NextFunction) {
    try {
      //get infor from request
      logger.silly('Get infor from request');
      const { id, name, description, price, quantity, imageUrl, category } =
        req.body;

      //check exist id, name, description, price, quantity, imageUrl, category
      logger.silly(
        'Check exist id, name, description, price, quantity, imageUrl, category'
      );
      if (
        !id ||
        !name ||
        !description ||
        !price ||
        !quantity ||
        !imageUrl ||
        !category
      ) {
        logger.error(errorMessage.dataInvalid);
        throw new ErrorHandler(errorMessage.dataInvalid, 400);
      }

      //Checking id is number 
      if(isNaN(id)){
        logger.error(`Invalid product id ${id}`);
        throw new ErrorHandler(errorMessage.invalidProductId, 400);
      }
    } catch (error) {
      logger.error(
        errorMessage.errorInProductAdminController + ' AddProduct function:',
        error
      );
      next(new ErrorHandler(errorMessage.errorInAddProduct, 500));
    }
  }
  static async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      //get page from request and
      const page: number = Number(req.params.page) || 1;
      const limit: number = 10;
      const id: number = Number(req.params.id);
      logger.debug(
        'User id from request: ' + id,
        'page: ' + page + ' limit: ' + limit
      );

      //Checking id is number 
      if(isNaN(id)){
        logger.error(`Invalid product id ${id}`);
        throw new ErrorHandler(errorMessage.invalidProductId, 400);
      }

      //get user from ProductService base on id provided
      const result = ProductService.getProductById(id, page, limit);
      logger.debug('result: ' + JSON.stringify(result));

      res.status(200).json(result);
    } catch (error) {
      logger.error(
        errorMessage.errorInProductAdminController + ' getProductById function: ',
        error
      );
      next(error);
    }
  }
  static async getProductByName(req: Request, res: Response, next: NextFunction) {
    try {
      //get page from request and
      const page: number = Number(req.params.page) || 1;
      const limit: number = 10;
      const name: string = req.params.name;
      logger.debug(
        'Product name from request: ' + name,
        'page: ' + page + ' limit: ' + limit
      );

      //check user name is existing
      if(!name){
        logger.error('Name is null');
        throw new ErrorHandler(errorMessage.dataInvalid, 400); //data missing required fields
      }

      //get user from ProductService base on id provided
      const result = ProductService.getProductByName(name, page, limit);
      logger.debug('result: ' + JSON.stringify(result));

      res.status(200).json(result);
    } catch (error) {
      logger.error(
        errorMessage.errorInProductAdminController + ' getProductByName function: ',
        error
      );
      next(error);
    }
  }

  static async deleteProduct(req: Request, res: Response, next: NextFunction){
    try {
      //Get user id from request parameters
      const id: number=Number(req.params.id);
      logger.debug('User id from request: ' + id);

      //Checking id is number 
      if(isNaN(id)){
        logger.error(`Invalid product id ${id}`);
        throw new ErrorHandler(errorMessage.invalidProductId, 400);
      }

      //Update user
      logger.silly('Delete product');
      await ProductService.deleteProduct(id);

      res.status(200).json({message: notifyMessage.productDeleteSuccess});
    } catch (error) {
      logger.error(
        errorMessage.errorInProductAdminController + ' deleteProduct function: ',
        error
      );
      next(error);
    }
  }
}
