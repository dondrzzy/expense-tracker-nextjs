'use client'

import React from 'react';
import { toast } from 'react-toastify';

import { deleteUserTransaction } from '@/app/actions/transactions';

export const DeleteTransactionButton = ({ transactionId }: { transactionId: string }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this transaction?');
    if (!confirmed) return;
    const { message, error } = await deleteUserTransaction(transactionId);
    if (error) toast.error(error);
    toast.success(message);
  }

  return (
    <button className='delete-btn' onClick={handleDelete}>x</button>
  )
}

