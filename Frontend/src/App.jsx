import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food'); // New State

  const API_URL = 'http://localhost:5000/api/expenses';

  useEffect(() => { fetchExpenses(); }, []);

  const fetchExpenses = async () => {
    const res = await axios.get(API_URL);
    setExpenses(res.data);
  };

  const addTransaction = async (e) => {
    e.preventDefault();
    if (!text || !amount) return;
    // We now send "category" to the backend
    await axios.post(API_URL, { text, amount: Number(amount), category });
    setText(''); setAmount('');
    fetchExpenses();
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchExpenses();
  };

  // --- DASHBOARD CALCULATIONS ---
  const amounts = expenses.map(ex => ex.amount);
  const totalBalance = amounts.reduce((acc, item) => (acc += item), 0);
  
  // Calculate how much was spent ONLY on Food
  const foodTotal = expenses
    .filter(ex => ex.category === 'Food' && ex.amount < 0)
    .reduce((acc, item) => acc + Math.abs(item.amount), 0);

  // --- SUGGESTION LOGIC ---
  const getSuggestion = () => {
    if (foodTotal === 0) return "No food expenses tracked yet. You are doing great!";
    if (foodTotal > 100) return "🚨 Warning: You spent over $100 on food. Maybe cook at home tonight?";
    if (foodTotal > 50) return "💡 Tip: You're doing okay, but watch out for those small snacks!";
    return "✅ Your food budget looks healthy. Keep it up!";
  };

  // Chart Data preparation
  const chartData = [
    { name: 'Food Spending', value: foodTotal },
    { name: 'Remaining Balance', value: totalBalance > 0 ? totalBalance : 0 }
  ];
  const COLORS = ['#ef4444', '#6366f1'];

  return (
    <div className="app-wrapper">
      <div className="container">
        <header>
          <h1>My Dashboard</h1>
          <div className="balance-box">
            <p>TOTAL BALANCE</p>
            <h2>${totalBalance.toFixed(2)}</h2>
          </div>
        </header>

        {/* --- NEW: SUGGESTION BOX --- */}
        <div className="suggestion-box">
          <h4>🤖 AI Suggestion</h4>
          <p>{getSuggestion()}</p>
        </div>

        {/* --- NEW: CHART SECTION --- */}
        <div className="card chart-section">
          <h3>Spending Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <section className="card">
          <h3>Add New Transaction</h3>
          <form onSubmit={addTransaction}>
            <input placeholder="Item name" value={text} onChange={e => setText(e.target.value)} />
            <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
            
            {/* --- NEW: CATEGORY DROPDOWN --- */}
            <select className="cat-select" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="Food">Food 🍕</option>
              <option value="Shopping">Shopping 🛍️</option>
              <option value="Bills">Bills 📑</option>
              <option value="Salary">Salary 💰</option>
            </select>

            <button className="btn-submit">Add Transaction</button>
          </form>
        </section>

        <section className="history-section">
          <h3>History</h3>
          <ul className="list">
            {expenses.map(ex => (
              <li key={ex._id} className={ex.amount < 0 ? 'minus' : 'plus'}>
                <span>{ex.text} <small>({ex.category})</small></span>
                <span className="amount">{ex.amount < 0 ? '-' : '+'}${Math.abs(ex.amount)}</span>
                <button onClick={() => deleteExpense(ex._id)} className="delete-btn">x</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default App;