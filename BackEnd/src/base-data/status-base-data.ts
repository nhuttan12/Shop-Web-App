import logger from '../utils/logger.js';
import { Status } from '../entities/Status.js';

export class StatusBaseData {
  async insertBaseStatusData() {
    logger.silly('Status data for insert into status database');
    const statusData = [
      { name: 'Active' },
      { name: 'Inactive' },
      { name: 'Pending' },
      { name: 'Deleted' },
      { name: 'Banned' },
      { name: 'Expired' },
    ];

    try{
      logger.silly('Inserting status data');
      await Status.createQueryBuilder()
        .insert()
        .into(Status)
        .values(statusData)
        .orIgnore()
        .execute();
    }catch (error: any) {
      logger.error(`Error inserting role data: ${error.message}`);
      throw error;
    }
  }
}
