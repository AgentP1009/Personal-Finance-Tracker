import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const API_URL = "http://localhost:5000/api/transactions";

  // Fetch all transactions
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(API_URL);
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add new transaction
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, { title, amount: Number(amount), type });
      setTitle("");
      setAmount("");
      fetchTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Personal Finance Tracker</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded flex-1"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-24"
          required
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Title</th>
            <th className="border px-2 py-1">Amount</th>
            <th className="border px-2 py-1">Type</th>
            <th className="border px-2 py-1">Created At</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id}>
              <td className="border px-2 py-1">{t.title}</td>
              <td className="border px-2 py-1">{t.amount}</td>
              <td className="border px-2 py-1">{t.type}</td>
              <td className="border px-2 py-1">{new Date(t.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
