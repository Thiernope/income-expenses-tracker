import React, {useState} from 'react'
import Incomes from "./incomes/Incomes";
import Expenses from "./expenses/Expenses";
const IncomeExpeParent = ({incomesFetchError, expenseFetchError, expenseList,setExpenseList,expenseId, setExpenseId,income,incomeList,setIncomeList,incomeId,setIncomeId,
  updateLoader,
  start,
  showStart,
  hideStart,
  showSwitch,
  hideSwitchAndForward,
  hideCreateAndForWard,
  switchIndicator,
  createIndicator,
  hideSwitch,
  showCreate,
  showDeposit,
  hideCreate
}) => {
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
  return <Incomes handleNext = {handleNext} incomesFetchError = {incomesFetchError} income={income} incomeList = {incomeList} setIncomeList = {setIncomeList} incomeId = {incomeId} setIncomeId ={setIncomeId} 
  start = {start}
  showSwitch ={showSwitch}
  hideSwitchAndForward = { hideSwitchAndForward}
  switchIndicator = {switchIndicator}
  createIndicator = {createIndicator}
  hideCreateAndForWard = { hideCreateAndForWard}
  hideSwitch  = { hideSwitch }
  showCreate = {showCreate }
  showDeposit = {showDeposit}
  hideCreate = {hideCreate}
  updateLoader ={updateLoader}
  />
case 1: 
return <Expenses handlePrev ={handlePrev} expenseFetchError={expenseFetchError} expenseList={expenseList} setExpenseList={setExpenseList} expenseId={expenseId} setExpenseId={setExpenseId} updateLoader ={updateLoader}/>
default:
  return <Incomes incomesFetchError = {incomesFetchError} income={income} incomeList = {incomeList} setIncomeList = {setIncomeList} incomeId = {incomeId} setIncomeId ={setIncomeId} />
}

}
  return (
    <div style={{backgroundColor: "white", height: "100%"}}>
      {getActiveStep(activeStep)}
    </div>
  )
}

export default IncomeExpeParent