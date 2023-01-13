const Transaction = require('../models/transactionModel');


const getAllTransactions = async (req, res) => {
  const userId = req.user._id;
  const transaction = await Transaction.find({userId}).sort({createdAt: -1});
  res.json(transaction)
}

const createTransaction = async (req, res) => {
  const userId = req.user._id;
  const { amount, description, date } = req.body;
  const transaction = await Transaction.create({ amount, description, date, userId })
  res.json(transaction);
}

const deleteTransaction = async (req, res) => {
  const { _id } = req.params;
  const transaction = await Transaction.findByIdAndDelete({_id})
  res.json(transaction)
}


const updateTransaction = async (req, res) => {
  const { _id } = req.params;
  const transaction = await Transaction.updateOne({_id}, {
   ...req.body
  })
  res.json(transaction)
};

module.exports = {
  getAllTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction
}