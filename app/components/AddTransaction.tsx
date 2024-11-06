"use client";

import React, { useRef } from 'react';
import { toast } from 'react-toastify';

import { addTransaction } from '@/app/actions/transactions';

export const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);

  console.log('using client', formRef);
  const handleSubmit = async ( formData: FormData ) => {
    const { data, error } = await addTransaction(formData);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Transaction added');
      formRef.current?.reset(); 
    }
  }
  return (
    <>
      <h3>AddTransaction</h3>
      <form ref={formRef} action={ handleSubmit }>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" id="text" name="text" placeholder='Enter Text...' />
        </div>
        <div className="form-control">
          <label htmlFor="text">Amount: <br /> (Negative - Expense, Positive - Income)</label>
          <input type="number" id="amount" name="amount" placeholder='Enter amount...' step={0.01} />
        </div>
        <button className='btn'>Add Transaction</button>
      </form>
    </>
  )
}

