import Schedule from "../../models/Schedule";
import VehicleInfo from "../../models/VehiclesInfo";
import moment from 'moment';
import { IDataVehicleInfo } from "../controllers/vehicle-controller";

export interface IResConsultPicoPlacaService {
  canDrive: boolean
  date: string
  message: string
  plate: string
}

export const saveVehicleInfoService = async (data: IDataVehicleInfo) => {
  try {
    return await VehicleInfo.create(data);
  } catch (error) {
    console.error('Error al guardar la información del vehículo:', error);
    throw error;
  }
}

export const consultPicoPlacaService = async (plate: string, date: string): Promise<IResConsultPicoPlacaService> => {
  try {

    const existPlate = await VehicleInfo.findOne({ where: { plate: plate } });
    if (!existPlate) {
      throw { message: 'El vehículo con la placa solicitada no existe, por favor regístralo', type: 'ERROR_DOESNT_EXIST' };
    }

    const lastDigit = parseInt(plate[plate.length - 1]);

    const dayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const momentDate = moment(date);
    const currentDate = momentDate.toDate();
    const dayOfWeek = dayNames[currentDate.getDay()];

    const schedule = await Schedule.findOne({ where: { day: dayOfWeek } }) as Schedule;

    if (!schedule || !schedule.dataValues.active) {
      return { plate, date, canDrive: true, message: 'No hay restricciones para circular en este horario.' };
    }

    if (schedule.dataValues.forbiddenDigit.includes(lastDigit)) {
      const currentTime = currentDate.getTime();
      const hours = schedule.dataValues.hours;
      for (const { startHour, endHour } of hours) {
        const start = new Date(`${date.slice(0, 10)}T${startHour}`).getTime();
        const end = new Date(`${date.slice(0, 10)}T${endHour}`).getTime();
        if (currentTime >= start && currentTime <= end) {
          return { plate, date, canDrive: false, message: 'El último dígito de la placa está prohibido para circular en este horario.' };
        }
      }
    }

    return { plate, date, canDrive: true, message: 'El vehículo puede circular en este horario.' };
  } catch (error) {
    console.error('Error al consultar el pico y placa:', error);
    throw error;
  }

};