import express from 'express';
const router = express.Router();

router.get('/services', (req, res) => {
  res.render('services');
});

export default router;