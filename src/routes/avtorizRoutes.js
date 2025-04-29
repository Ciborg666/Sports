import express from 'express';
const router = express.Router();

router.get('/avtorization', (req, res) => {
  res.render('avtorization');
});

export default router;