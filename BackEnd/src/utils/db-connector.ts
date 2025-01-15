import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: 'mysql',
  define: {
    timestamps: true,
    createdAt: true,
    updatedAt: true
  },
  logging: console.log
});

const connectDb = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ Kết nối tới database được thiết lập thành công');
    await sequelize.sync();
    console.log('✅ Đồng bộ hóa bảng thành công!');
  } catch (error) {
    console.log('❌ Không thể kết nối tới database', error);
    throw error;
  }
};

export { sequelize, connectDb };
