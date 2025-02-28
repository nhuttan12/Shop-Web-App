import logger from '../utils/logger.js';
import { Role } from '../entities/Role.js';
import { Status } from '../entities/Status.js';
import { ErrorHandler } from '../utils/error-handling.js';
import { messageLog } from '../utils/message/notify-message.js';

export class RolesBaseData {
  async insertBaseRoleData() {
    logger.silly('Get status data');
    const activeStatus: Status | null = await Status.findOneBy({
      name: 'Active',
    });

    logger.debug(messageLog.activeStatusNotFound);
    if (!activeStatus) {
      logger.error(messageLog.activeStatusNotFound);
      throw new ErrorHandler(
        messageLog.activeStatusNotFound,
        404
      );
    }

    // logger.silly('Base data for inserting into roles table');
    const roleData: { name: string; status: Status }[] = [
      { name: 'Admin', status: activeStatus },
      { name: 'Mod', status: activeStatus },
      { name: 'User', status: activeStatus },
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
