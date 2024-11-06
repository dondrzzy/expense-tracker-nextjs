import React from 'react';
import getUserBalance from '../actions/balance';
import { toast } from 'react-toastify';
import { addCommas } from '@/lib/utils';

export const Balance = async () => {
  const { balance, error } = await getUserBalance();
  if (error) toast.error(error);

  return (
    <>
      <h4>Your Balance</h4>
      <h1>{ addCommas(Number(balance?.toFixed(2))) ?? 0}</h1>
    </>
  )
}

