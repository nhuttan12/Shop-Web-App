import { sequelize } from '../utils/db-connector.js';
import { DataTypes, Model } from 'sequelize';

export default class Product extends Model {
  public id!: number
  public name!: string;
  public description!: string;
  public price!: number;
  public quantity!: number;
  public imageUrl!: string;
  public categoryId!: number;
  public statusId!: number;
}

Product.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statusId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'products',
    modelName: 'Product',
    timestamps: true,
  },
);