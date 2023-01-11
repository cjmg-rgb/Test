import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    amount: 0,
    description: '',
    date: ''
  })

  const handleInput = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/transaction', {
      method: 'POST',
      body: form
    })
    const json = await response.json();
    console.log(response);
  };
  
  return (
    <div className="App">
      <form
        onSubmit={handleSubmit}
      >
        <input type="number"
          placeholder="Transaction amount"
          name="amount"
          value={form.amount}
          onChange={handleInput}
        />
        <input type="text"
          placeholder="Transaction description"
          name="description"
          value={form.description}
          onChange={handleInput}
        />
        <input type="date"
          name="date"
          value={form.date}
          onChange={handleInput}
        />
        <button
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
