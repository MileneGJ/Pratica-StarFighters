import { Router } from "express";
import * as fighterController from '../controllers/fighterControllers.js'

const router = Router()

router.post('/battle',fighterController.compareStars)
router.get('/ranking',fighterController.getFighters)

export default router