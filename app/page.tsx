import React from 'react';
import PropTypes from 'prop-types';
import { Guest } from './components/Guest';
import { currentUser } from '@clerk/nextjs/server';
import { AddTransaction } from './components/AddTransaction';
import { Balance } from './components/Balance';
import { IncomeExpense } from './components/IncomeExpense';
import { TransactionList } from './components/TransactionList';

const HomePage = async () => {
  const user = await currentUser();
  console.log('page user', user);
  if (!user) {
    return <Guest /> 
  }
  return (
    <main>
      <h1>Welcome, {user.firstName}</h1>
      <Balance />
      <IncomeExpense />
      <TransactionList />
      <AddTransaction />
    </main>
  )
}

HomePage.propTypes = {};

export default HomePage;
