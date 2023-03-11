import React from "react";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";

function Transaction({transaction}) {
  const {name, type, amount} = transaction || {};
  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        <button className="link">
          <img className="icon" src={editImage} alt="edit" />
        </button>
        <button className="link">
          <img className="icon" src={deleteImage} alt="delete" />
        </button>
      </div>
    </li>
  );
}

export default Transaction;
