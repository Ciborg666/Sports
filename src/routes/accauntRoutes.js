// app.js или router.js
import express from 'express';

import accauntController from '../controllers/accauntController.js';

const router = express.Router();

router.get('/accaunt', accauntController);

export default router;