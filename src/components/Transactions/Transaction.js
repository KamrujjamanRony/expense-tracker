import React from "react";
import { useDispatch } from "react-redux";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import { activeEdit, removeTransactions } from "../../features/transaction/transactionSlice";
import numberWithCommas from "../../utils/numberWithCommas";

function Transaction({transaction}) {
  const {id, name, type, amount} = transaction || {};
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(activeEdit(transaction));
  };

  const handleDelete = () => {
    dispatch(removeTransactions(id));
  };
  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {numberWithCommas(amount)}</p>
        <button className="link" onClick={handleEdit}>
          <img className="icon" src={editImage} alt="edit" />
        </button>
        <button className="link" onClick={handleDelete}>
          <img className="icon" src={deleteImage} alt="delete" />
        </button>
      </div>
    </li>
  );
}

export default Transaction;
