import jwt_decode from "jwt-decode";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const ExpenseContext = createContext();

function ExpenseProvider(props) {
  const [expenses, setexpenses] = useState([]);
  const { children } = props;
  const url = "http://localhost:4000/api/v1/expense";
  const [monthlyEXP, setMonthlyEXP] = useState([]);

  const getAllExpenses = async () => {
    try {
      const response = await axios.get(url + "/getAll");
      setMonthlyEXP(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const addNewExpense = async (expenseObj) => {
    try {
      const expense = await axios.post(url, expenseObj);
      console.log(expense);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
  const getAllExpOrInc = async (expenseObj) => {
    try {
      const expense = await axios.get(url, {});
      setexpenses(expense.data);
      console.log(expense);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  return (
    <div>
      <ExpenseContext.Provider
        value={{
          expenses,
          getAllExpOrInc,
          addNewExpense,
          monthlyEXP,
          getAllExpenses,
        }}
      >
        {children}
      </ExpenseContext.Provider>
    </div>
  );
}

export default ExpenseProvider;
