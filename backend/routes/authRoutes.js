
import express from 'express'
import { registerUser, loginUser, defautRoute } from '../controller/authController.js'

const router = express.Router();

router.get('/', defautRoute );
router.post('/registration', registerUser);
router.post('/login', loginUser);

export default router