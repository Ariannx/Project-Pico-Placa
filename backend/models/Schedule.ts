import { DataTypes, Model } from 'sequelize';
import sequelize from '../src/database/sequelize';

interface ScheduleAttributes {
  day: string
  forbiddenDigit: number[]
  hours: { startHour: string; endHour: string }[]
  active: boolean
}

class Schedule extends Model<ScheduleAttributes> { }

Schedule.init(
  {
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    forbiddenDigit: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    hours: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Schedule',
    tableName: 'schedule',
    timestamps: true
  }
);

export default Schedule;
