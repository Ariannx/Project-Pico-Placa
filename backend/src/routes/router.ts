import { Router } from 'express';
import { consultPicoPlacaController, saveVehicleInfoController } from '../controllers/vehicle-controller';

const router = Router();

router.post('/save-info', saveVehicleInfoController);
router.get('/consult-pico-placa/:plate/:date', consultPicoPlacaController);

export default router;
