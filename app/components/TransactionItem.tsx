import { addCommas } from '@/lib/utils'
import { Transaction } from '@/types/transaction'
import React from 'react'

import { DeleteTransactionButton } from './DeleteTransactionButton';

export const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const sign = (transaction.amount > 0 ? '+' : '-');

  return (
    <li className={ transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}
      <span>{sign }{addCommas(Math.abs(transaction.amount))}</span>
      {transaction.id && <DeleteTransactionButton transactionId={transaction.id} />}
    </li>
  )
}
