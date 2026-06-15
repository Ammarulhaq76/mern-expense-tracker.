const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  text: { type: String, required: true },
  amount: { type: Number, required: true },
  // --- THIS IS THE NEW PART ---
  category: { type: String, default: 'Other' }, 
  // ----------------------------
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', ExpenseSchema);