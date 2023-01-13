const express = require('express');
const passport = require('passport');
const router = express.Router();

const {
  getAllTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction
} = require('../controllers/transactionController');
const requireAuth = require('../middlewares/authMiddleware');

router.use(requireAuth);

router.post('/', createTransaction);
router.get('/', getAllTransactions);
router.delete('/:_id', deleteTransaction);
router.patch('/:_id', updateTransaction);


module.exports = router;