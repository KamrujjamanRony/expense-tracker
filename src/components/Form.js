import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTransactions,
  createTransactions,
  inactiveEdit,
} from "../features/transaction/transactionSlice";

function Form() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { editing, isLoading, isError, error } = useSelector(
    (state) => state.transaction
  );

  const reset = () => {
    setName("");
    setType("");
    setAmount("");
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    dispatch(inactiveEdit());
    setEditMode(false);
  };

  useEffect(() => {
    if (editing.id) {
      setEditMode(true);
      setName(editing.name);
      setType(editing.type);
      setAmount(editing.amount);
    } else {
      reset();
      setEditMode(false);
    }
  }, [editing]);

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(
      createTransactions({
        name,
        type,
        amount: +amount,
      })
    );
    reset();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      changeTransactions({
        id: editing.id,
        data: {
          name,
          type,
          amount: +amount,
        },
      })
    );
    reset();
    setEditMode(false);
  };

  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={editMode ? handleUpdate : handleCreate}>
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
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>

        {editMode && (
          <button onClick={cancelEdit} className="btn cancel_edit">
            Cancel Edit
          </button>
        )}
        {!isLoading && isError && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Form;
