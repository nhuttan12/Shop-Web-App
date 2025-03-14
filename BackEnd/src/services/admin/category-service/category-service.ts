import { CategoryAdminDTO } from '../../../dtos/admin/category-admin-dto.js';
import { Category } from '../../../entities/Category.js';
import { ErrorHandler } from '../../../utils/error-handling.js';
import logger from '../../../utils/logger.js';
import { errorMessage } from '../../../utils/message/error-message.js';

export class CategoryService {
  static getCateories = async (page: number, limit: number) => {
    try {
      //get the user skipping
      const skip: number = (page - 1) * limit;
      logger.debug(`Skip ${skip}`);

      const [categories, total]: [Category[], number] =
        await Category.findAndCount({
          skip: skip,
          take: limit,
          relations: ['category', 'status'],
          order: { id: 'ASC' },
        });
      logger.debug(`Get categories list and total ${total}`);

      //loop through users array and convert all elements to categoryDTO objects
      logger.silly('Convert all elements to categoryDTO objects');
      const categoryDTO: CategoryAdminDTO[] = [];
      categories.forEach((category) => {
        categoryDTO.push(CategoryAdminDTO.fromEntity(category));
      });

      //get the number of users in the last page
      const lastPage: number = Math.ceil(total / limit);
      logger.debug(`Get last page ${lastPage}`);

      return {
        data: categoryDTO,
        total,
        page,
        lastPage,
      };
    } catch (error) {
      logger.error(
        errorMessage.errorInproductService + ` ${this.getCateories.name} function:`,
        error
      );
      throw new ErrorHandler(errorMessage.errorInGetAllCategories, 500);
    }
  };

  static getCategoryById = async (id: number, page: number, limit: number) => {
    try {
      //get the product skipping
      const skip: number = (page - 1) * limit;
      logger.debug(`Skip ${skip}`);

      //get products list with id
      const [categories, total]: [Category[], number] =
        await Category.createQueryBuilder('categories')
          .leftJoinAndSelect('categorlies.status', 'status')
          .where('cast(categories.id as char) like :idPattern', {
            idPattern: `%${id}%`,
          })
          .orderBy('categories.id', 'ASC')
          .skip(skip)
          .take(limit)
          .getManyAndCount();
      logger.debug(`Get categories list and total ${total}`);

      //loop through users array and convert all elements to categoryDTO objects
      logger.silly('Convert all elements to categoryDTO objects');
      const categoryDTO: CategoryAdminDTO[] = [];
      categories.forEach((category) => {
        categoryDTO.push(CategoryAdminDTO.fromEntity(category));
      });

      //get the number of users in the last page
      const lastPage: number = Math.ceil(total / limit);
      logger.debug(`Get last page ${lastPage}`);

      return {
        data: categoryDTO,
        total,
        page,
        lastPage,
      };
    } catch (error) {
      logger.error(
        errorMessage.errorInproductService + ` ${this.getCategoryById.name} function:`,
        error
      );
      throw new ErrorHandler(errorMessage.errorInGetAllCategories, 500);
    }
  };

  static async getCategoryByName(name: string, page: number, limit: number) {
    try {
      //get the user skipping
      const skip: number = (page - 1) * limit;
      logger.debug(`Skip ${skip}`);

      //get categories list with id
      const [categories, total]: [Category[], number] =
        await Category.createQueryBuilder('categories')
          .leftJoinAndSelect('categories.status', 'status')
          .where('categories.name like :namePattern', {
            namePattern: `%${name}%`,
          })
          .orderBy('categories.id', 'ASC')
          .skip(skip)
          .take(limit)
          .getManyAndCount();
      logger.debug(`Get categories list and total ${total}`);
      
      //loop through users array and convert all elements to productDTO objects
      logger.silly('Convert all elements to userDTO objects');
      const categoryDTO: CategoryAdminDTO[] = [];
      categories.forEach(category => {
        categoryDTO.push(CategoryAdminDTO.fromEntity(category));
      });

      //get the number of users in the last page
      const lastPage: number = Math.ceil(total / limit);
      logger.debug(`Get last page ${lastPage}`);

      return {
        data: categoryDTO,
        total,
        page,
        lastPage,
      };
    } catch (error) {
      logger.error(
        errorMessage.errorInproductService + ` ${this.getCategoryByName.name} function`,
        error
      );
      throw new ErrorHandler(errorMessage.errorInGetCategoryByName, 500);
    }
  }
}
