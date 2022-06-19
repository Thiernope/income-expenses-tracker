import React, {useState} from 'react'
import Incomes from "./incomes/Incomes";
import Expenses from "./expenses/Expenses";
const IncomeExpeParent = ({incomesFetchError, expenseFetchError, expenseList,setExpenseList,expenseId, setExpenseId,income,incomeList,setIncomeList,incomeId,setIncomeId}) => {
  const [activeStep, setActiveStep] = useState(0)
 
const handleNext = () => {
  setActiveStep(prevStep => prevStep + 1)
}

const handlePrev = () => {
  setActiveStep(prevStep => prevStep - 1)
}

const getActiveStep = (step) => {
switch (step) {
case 0: 
  return <Incomes handleNext = {handleNext} incomesFetchError = {incomesFetchError} income={income} incomeList = {incomeList} setIncomeList = {setIncomeList} incomeId = {incomeId} setIncomeId ={setIncomeId} />
case 1: 
return <Expenses handlePrev ={handlePrev} expenseFetchError={expenseFetchError} expenseList={expenseList} setExpenseList={setExpenseList} expenseId={expenseId} setExpenseId={setExpenseId} />
default:
  return <Incomes incomesFetchError = {incomesFetchError} income={income} incomeList = {incomeList} setIncomeList = {setIncomeList} incomeId = {incomeId} setIncomeId ={setIncomeId} />
}

}
  return (
    <div style={{backgroundColor: "white"}}>
      {getActiveStep(activeStep)}
    </div>
  )
}

export default IncomeExpeParent