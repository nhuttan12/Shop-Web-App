import logger from '../utils/logger.js';
import { Role } from '../entities/Role.js';
import { Status } from '../entities/Status.js';
import { ErrorHandler } from '../utils/error-handling.js';

export class RolesBaseData {
  async insertBaseRoleData() {
    logger.silly('Get status data');
    const activeStatus: Status | null = await Status.findOneBy({
      name: 'Active',
    });

    logger.debug(`Check active status exists`);
    if (!activeStatus) {
      logger.error(
        'Active status not found in database. Ensure status data is seeded first.'
      );
      throw new ErrorHandler(
        'Active status not found. Seed status data first.',
        404
      );
    }

    // logger.silly('Base data for inserting into roles table');
    const roleData: {name: string, status: Status}[] = [
      {name: 'Admin', status: activeStatus},
      {name: 'Mod', status: activeStatus},
      {name: 'User', status: activeStatus},
    ];

    try {
      logger.silly('Inserting role data');
      await Role.createQueryBuilder()
        .insert()
        .into(Role)
        .values(roleData)
        .orIgnore()
        .execute();
    } catch (error: any) {
      logger.error(`Error inserting role data: ${error.message}`);
      throw error;
    }
  }
}
