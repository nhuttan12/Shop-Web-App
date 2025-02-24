import { ProductAdminDTO } from '../../../dtos/admin/product-admin-dto.js';
import { Product } from '../../../entities/Product.js';
import { ErrorHandler } from '../../../utils/error-handling.js';
import logger from '../../../utils/logger.js';
import { messageLog } from '../../../utils/message-handling.js';

export class ProductService {
  static async getProducts(page: number, limit: number) {
    try {
      //get the user skipping
      const skip: number = (page - 1) * limit;
      logger.debug(`Skip ${skip}`);

      const [products, total]: [Product[], number] = await Product.findAndCount(
        {
          skip: skip,
          take: limit,
          relations: ['category', 'status'],
          order: { id: 'ASC' },
        }
      );
      logger.debug(`Get products list and total ${total}`);

      //loop through users array and convert all elements to productDTO objects
      logger.silly('Convert all elements to userDTO objects');
      const productDTO: ProductAdminDTO[] = [];
      products.forEach(product => {
        productDTO.push(ProductAdminDTO.fromEntity(product));
      });

      //get the number of users in the last page
      const lastPage: number = Math.ceil(total / limit);
      logger.debug(`Get last page ${lastPage}`);

      return {
        data: productDTO,
        total,
        page,
        lastPage,
      };
    } catch (error) {
      logger.error(messageLog.errorInproductService+' getProducts function', error);
      throw new ErrorHandler(messageLog.errorInproductService, 500);
    }
  }
}
