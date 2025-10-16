const mongoose = require('mongoose');
const transactions = [
  {
    "_id": "67100b8c09d9e3d833bf6721",
    "title": "Lunch",
    "amount": 5,
    "type": "expense",
    "createdAt": "2025-10-16T08:23:40.123Z",
    "__v": 0
  },
  {
    "_id": "67100b9909d9e3d833bf6722",
    "title": "Salary",
    "amount": 100,
    "type": "income",
    "createdAt": "2025-10-16T08:25:55.654Z",
    "__v": 0
  }
];


const transactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  date: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Transaction', transactionSchema);
