import React, { useState }from 'react'
import Income from "./Income"
import Expense from "./Expense"
const Tabs = ({expenseList, incomeList, transactionList, setTransactionList, balanceModal}) => {
  const [activeStep, setActiveStep] = useState(0)
  const expenses = transactionList.filter(exp => exp.category === "Expense");
  const incomes = transactionList.filter(inc => inc.category === "Income");
  console.log("EXP", expenses)
  let totalExp = 0;
  let totalInc = 0;
  expenses.forEach(exp => {
    const x = exp.amount
    totalExp += x;
  })
 incomes.forEach(inc => {
   const y = inc.amount;
   totalInc += y;
 })
 const balance = totalInc - totalExp;
  const handleNext =() => {
    setActiveStep(prevStep => prevStep + 1)
  }
 
  const handlePrev = () => {
    setActiveStep(prevStep => prevStep -1)
  }
 
const getActiveStep = (step) => {
  switch(step){
   case 0: return <Income handleNext={handleNext} incomeList={incomeList} transactionList={transactionList} setTransactionList={setTransactionList}/>
   case 1: return <Expense handlePrev={handlePrev} expenseList={expenseList} transactionList={transactionList} setTransactionList={setTransactionList} balance={balance}/>
   default: return <Income handleNext={handleNext} incomeList={incomeList} transactionList={transactionList} setTransactionList={setTransactionList}/>
  }
}

  return (
    <div className="relative">
      {balanceModal && 
         <div className="bg-green-50 absolute z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
           <div className="bg-green-400 w-9/12 h-2/3 flex flex-col justify-around items-center p-8">
             <div className="flex justify-between items-center bg-red-500 w-full px-4">
              <div>
             <h1>Income total:</h1>
             <h1>$ {totalInc.toLocaleString()}</h1>
             </div>
             <div>
             <h1>Used Money:</h1>
             <h1>$ {totalExp.toLocaleString()}</h1>
             </div>
             </div>
           <h1 className="text-2xl">Balance:</h1>
           <h1 className="text-2xl">$ {balance.toLocaleString()}</h1>
           </div>
       </div>
      }
      <div className="z-0">
     {getActiveStep(activeStep)}
     </div>
    </div>
  )
}

export default Tabs;