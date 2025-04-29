import express from 'express';
const router = express.Router();

router.get('/timeWork', (req, res) => {
  res.render('timeWork');
});

export default router;