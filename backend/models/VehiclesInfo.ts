import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../src/database/sequelize';

interface VehicleInfoAttributes {
  plate: string;
  brand: string;
  model: string;
  version: string;
  chasis: string;
  year: string;
}

class VehicleInfo extends Model<VehicleInfoAttributes> { }

VehicleInfo.init(
  {
    plate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chasis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'VehiclesInfo',
    tableName: 'vehicles-info',
    timestamps: true,
  }
);

export default VehicleInfo;
