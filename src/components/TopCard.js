import React from "react";
import { useSelector } from "react-redux";
import numberWithCommas from "../utils/numberWithCommas";

function TopCard() {
  const { transactions } = useSelector((state) => state.transaction);
  const handleBalance = () => {
    let balance= 0;
    transactions.forEach(transaction => {
      const {type, amount} = transaction;
      if (type === "income") {
        balance += amount;
      } else {
        balance -= amount;
      }
    });
    return numberWithCommas(balance);
  }
  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳ </span>
        <span>{transactions?.length > 0 ? handleBalance() : 0}</span>
      </h3>
    </div>
  );
}

export default TopCard;
