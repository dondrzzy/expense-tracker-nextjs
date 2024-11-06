"use server";

import { db } from '@/lib/db';
import { Transaction } from '@/types/transaction';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';


interface TransactionData {
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

export const addTransaction = async (formData: FormData): Promise<TransactionResult> => {
  const textValue = formData.get('text');
  const amountValue = formData.get('amount');

  // validate
  if (!textValue || textValue === '' || !amountValue || amountValue === '') {
    return { error: 'Missing text or amount' };
  }
  const text: string = textValue.toString();
  const amount: number = parseFloat( amountValue.toString());

  // get logged in user
  const { userId } = auth();
  if  (!userId) return { error: 'User not found' };

  try {
    const transactionData: TransactionData =  await db.transaction.create({
      data: {
        text, amount, userId
      }
    });
    revalidatePath('/');
    return {data: transactionData }
  } catch (error) {
    console.log('error', error);
    return { error: 'Failed to add transaction' }
  }
}

export const getIncomeExpense = async (): Promise<{ income?: number, expense?: number, error?: string }> => {
  const { userId } = auth();
  if (!userId) return { error: 'User not found' };

  try {
    const transactions = await db.transaction.findMany({
      where: { userId }
    });
    const amounts = transactions.map(tx => tx.amount);
    const income = amounts.filter(amount => amount > 0).reduce((acc, cur) => acc + cur, 0);
    const expense = amounts.filter(amount => amount < 0).reduce((acc, cur) => acc + cur, 0);
    return { income, expense: Math.abs(expense)}
  } catch (error) {
    return { error: 'Failed to retrieve income expense transactions'};
  }
}

export const getUserTransactions = async (): Promise<{ transactions?: Transaction[], error?: string }> => {
  const { userId } = auth();
  if (!userId) return { error: 'User not found' };

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc'}
    });
    return { transactions }
  } catch (error) {
    return { error: 'Failed to retrieve transactions'};
  }
}

export const deleteUserTransaction = async (transactionId: string): Promise<{ message?: string, error?: string}> => {
  const { userId } = auth();
  if (!userId) return { error: 'User not found' };

  try {
    await db.transaction.delete({
      where: { userId, id: transactionId },
    });
    revalidatePath('/');
    return { message: 'Deleted successfully' }
  } catch (error) {
    return { error: 'Failed to retrieve transactions'};
  }
}
