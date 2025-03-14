import { NextFunction, Request, Response } from 'express';
import logger from '../../../utils/logger.js';
import { CategoryService } from '../../../services/admin/category-service/category-service.js';
import { errorMessage } from '../../../utils/message/error-message.js';
import { ErrorHandler } from '../../../utils/error-handling.js';

export class CategoryAdminController {
  static async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      //get page from request
      const page: number = Number(req.params.page) || 1;
      const limit: number = 10;
      logger.debug('page: ' + page + ' limit: ' + limit);

      //get users from UserService and send response to client
      const result = await CategoryService.getCateories(page, limit);
      logger.debug('result: ' + JSON.stringify(result));

      res.status(200).json(result);
    } catch (error) {
      logger.error(
        `${errorMessage.errorInCategoryAdminController} ${CategoryAdminController.getCategories.name} function:`,
        error
      );
      next(error);
    }
  }

  static async getCategoryById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
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
      if (isNaN(id)) {
        logger.error(`Invalid product id ${id}`);
        throw new ErrorHandler(errorMessage.invalidCategoryId, 400);
      }

      //get user from ProductService base on id provided
      const result = CategoryService.getCategoryById(id, page, limit);
      logger.debug('result: ' + JSON.stringify(result));

      res.status(200).json(result);
    } catch (error) {
      logger.error(
        `${errorMessage.errorInCategoryAdminController} ${CategoryAdminController.getCategories.name} function:`,
        error
      );
      next(error);
    }
  }

static async getCategoryByName(req: Request, res: Response, next: NextFunction) {
    try {
      //get page from request and
      const page: number = Number(req.params.page) || 1;
      const limit: number = 10;
      const name: string = req.params.name;
      logger.debug(
        'category name from request: ' + name,
        'page: ' + page + ' limit: ' + limit
      );

      //check user name is existing
      if(!name){
        logger.error('Name is null');
        throw new ErrorHandler(errorMessage.dataInvalid, 400); //data missing required fields
      }

      //get user from ProductService base on id provided
      const result = CategoryService.getCategoryByName(name, page, limit);
      logger.debug('result: ' + JSON.stringify(result));

      res.status(200).json(result);
    } catch (error) {
      logger.error(
        errorMessage.errorInProductAdminController + ` ${this.getCategoryByName.name} function:`,
        error
      );
      next(error);
    }
  }
}
