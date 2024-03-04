import { Request, Response } from 'express';
import { STATUS } from '../constants/status-http';
import { consultPicoPlacaService, saveVehicleInfoService } from '../services/vehicle-service';

export interface IDataVehicleInfo {
  plate: string
  brand: string
  model: string
  version: string
  chasis: string
  year: string
}

export const saveVehicleInfoController = async (req: Request, res: Response) => {
  try {
    const data = req.body
    data.plate = data.plate.toUpperCase();
    await saveVehicleInfoService(data)
    return res.json({
      status: STATUS.SUCCESS.id,
      code: STATUS.SUCCESS.code,
    });

  } catch (error) {
    return res.status(404).json({
      status: STATUS.ERROR.id,
      code: 404,
      error,
    });
  }
}

export const consultPicoPlacaController = async (req: Request, res: Response) => {
  try {
    const plate = req.params?.plate?.toUpperCase()
    const date = req.params?.date
    const data = await consultPicoPlacaService(plate, date)

    return res.json({
      status: STATUS.SUCCESS.id,
      code: STATUS.SUCCESS.code,
      data
    });

  } catch (error) {
    return res.status(404).json({
      status: STATUS.ERROR.id,
      code: 404,
      error,
    });
  }

}