import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";

function Transactions() {
  const dispatch = useDispatch();
  useEffect(() => {dispatch(fetchTransactions())}, [dispatch])
  const { transactions, isLoading, isError, error} = useSelector(state => state.transaction);
  // what to randers
  let content = null;
  if (isLoading) {
    content = <p>Loading................</p>
  }
  if (!isLoading && isError) {
    content = <p className="error">{error}</p>
  }
  if (!isLoading && !isError && transactions.length === 0) {
    content = <p>There are no Transaction</p>
  }
  if (!isLoading && !isError && transactions.length > 0) {
    content = transactions.map(transaction => <Transaction key={transaction.id} transaction={transaction} />)
  }
  return (
    <>
      <p className="second_heading">Your Transactions:</p>
      <div className="conatiner_of_list_of_transactions">
        <ul>
          {content}
        </ul>
      </div>
    </>
  );
}

export default Transactions;
