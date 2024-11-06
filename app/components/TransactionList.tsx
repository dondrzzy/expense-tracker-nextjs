import React from 'react';
import { getUserTransactions } from '../actions/transactions';
import { Transaction } from '@/types/transaction';
import { TransactionItem } from './TransactionItem';

export const TransactionList = async () => {
  const { transactions, error } = await getUserTransactions();

  if (error) return <p className="error">{error}</p>
  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions && transactions.map((transaction: Transaction) => (
          <TransactionItem transaction={transaction} key={transaction.id} />
        ))}
      </ul>
    </>
  )
}

