// addTransaction.mjs
const response = await fetch('http://localhost:5000/api/transactions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Lunch', amount: 5, type: 'expense' })
});
const data = await response.json();
console.log('Transaction added:', data);
