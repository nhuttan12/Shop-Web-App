import { ProductAdminDTO } from '../../../dtos/admin/product-admin-dto.js';
import { Product } from '../../../entities/Product.js';
import { ErrorHandler } from '../../../utils/error-handling.js';
import logger from '../../../utils/logger.js';
import { Status } from '../../../entities/Status.js';
import { errorMessage } from '../../../utils/message/error-message.js';
import { messageLog } from '../../../utils/message/message-log.js';

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
      products.forEach((product) => {
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
      logger.error(
        messageLog.errorInproductService + ' getProducts function',
        error
      );
      throw new ErrorHandler(errorMessage.errorInGetAllProducts, 500);
    }
  }

  static async getProductById(id: number, page: number, limit: number) {
    try {
      //get the product skipping
      const skip: number = (page - 1) * limit;
      logger.debug(`Skip ${skip}`);

      //get products list with id
      const [products, total]: [Product[], number] =
        await Product.createQueryBuilder('product')
          .leftJoinAndSelect('product.category', 'category')
          .leftJoinAndSelect('product.status', 'status')
          .where('cast(product.id as char) like :idPattern', {
            idPattern: `%${id}%`,
          })
          .orderBy('product.id', 'ASC')
          .skip(skip)
          .take(limit)
          .getManyAndCount();
      logger.debug(`Get products list and total ${total}`);

      //loop through users array and convert all elements to productDTO objects
      logger.silly('Convert all elements to userDTO objects');
      const productDTO: ProductAdminDTO[] = [];
      products.forEach((product) => {
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
      logger.error(
        messageLog.errorInproductService + ' getProductById function',
        error
      );
      throw new ErrorHandler(errorMessage.errorInGetProductById, 500);
    }
  }

  static async getProductByName(name: string, page: number, limit: number) {
    try {
      //get the user skipping
      const skip: number = (page - 1) * limit;
      logger.debug(`Skip ${skip}`);

      //get products list with id
      const [products, total]: [Product[], number] =
        await Product.createQueryBuilder('product')
          .leftJoinAndSelect('product.category', 'category')
          .leftJoinAndSelect('product.status', 'status')
          .where('product.name like :namePattern', {
            namePattern: `%${name}%`,
          })
          .orderBy('product.id', 'ASC')
          .skip(skip)
          .take(limit)
          .getManyAndCount();
      logger.debug(`Get products list and total ${total}`);

      //loop through users array and convert all elements to productDTO objects
      logger.silly('Convert all elements to userDTO objects');
      const productDTO: ProductAdminDTO[] = [];
      products.forEach((product) => {
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
      logger.error(
        messageLog.errorInproductService + ' getProductByName function',
        error
      );
      throw new ErrorHandler(errorMessage.errorInGetProductByName, 500);
    }
  }

  static async deleteProduct(id: number) {
    try {
      //find product with product id
      const product: Product | null = await Product.findOneBy({ id });
      logger.debug(`Product ${product}`);

      //checking product exists
      if (!product) {
        logger.error('Product not found');
        throw new ErrorHandler(errorMessage.productNotFound, 404);
      }

      //find status with status name
      const status: Status | null = await Status.findOneBy({ name: 'Delete' });
      logger.debug(`Status: ${status}`);

      //checking status exists
      if (!status) {
        logger.error('Status not found');
        throw new ErrorHandler(errorMessage.invalidStatus, 404);
      }

      //soft delete product
      await Product.createQueryBuilder()
        .update(Product)
        .set({
          status: status,
        })
        .where('id= :id', { id })
        .execute();
      logger.debug('Status updated');
    } catch (error) {
      logger.error(
        messageLog.errorInproductService + ' deleteProduct function',
        error
      );
      throw new ErrorHandler(errorMessage.errorInDeleteProduct, 500);
    }
  }
}
