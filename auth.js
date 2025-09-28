import express from 'express'; 
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', authController.signup); 
router.post('/login', authController.login); 
router.post('/logout', authController.logout); 
router.post('/forgot', authController.forgotPassword); 
router.post('/reset', authController.resetPassword); 
router.post('/refresh', authController.refreshToken);

export default router;