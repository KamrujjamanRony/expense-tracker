import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransactions, fetchTransactions } from "../features/transaction/transactionSlice";

function Form() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const {isLoading, isError, error} = useSelector(state => state.transaction)

  const handleForm = (e) => {
    e.preventDefault();
    dispatch(
      createTransactions({
        name,
        type,
        amount: +amount,
      })
    );
  };
  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={handleForm}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="enter title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group radio">
          <label htmlFor="type">Type</label>
          <div className="radio_group">
            <input
              type="radio"
              value="income"
              name="type"
              checked={type === "income"}
              onChange={(e) => setType("income")}
              required
            />
            <label htmlFor="type">Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              placeholder="Expense"
              checked={type === "expense"}
              onChange={(e) => setType("expense")}
            />
            <label htmlFor="type">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            placeholder="300"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button disabled={isLoading} className="btn" type="submit">
          Add Transaction
        </button>

        <button className="btn cancel_edit">Cancel Edit</button>
        {!isLoading && isError && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Form;
