import React from 'react'
import { PolarArea } from "react-chartjs-2";
import Chart from 'chart.js/auto'
import empty from "../../../assets/empty.json"
import Lottie from "react-lottie"
Chart.register();
const Polar = ({transactionList, selectDoughnut, selectLine, selectPolar}) => {
    const incomes = transactionList.filter(inc => inc.category === "Income");
    const expenses = transactionList.filter(exp => exp.category === "Expense");
    const incomeResult = {};
    const expenseResult = {}
    incomes.forEach(e => {    
       const inc =  incomeResult[e.type] = incomeResult[e.type] || {...e, amount: 0}
       inc.amount += e.amount;
    })
    expenses.forEach(e =>{
      const exp = expenseResult[e.type] = expenseResult[e.type] || {...e, amount: 0}
      exp.amount += e.amount;
    })
    const newIncomeList = Object.values(incomeResult)
    const newExpenseList = Object.values(expenseResult)
    const incomeData = [];
    const incomeColor = [];
    const incomeType = []
    const expenseData = [];
    const expenseColor = [];
    const expenseType = []
    newIncomeList.forEach(inc => {
        incomeData.push(inc.amount)
        incomeColor.push(inc.color)
        incomeType.push(inc.type)
    })
    newExpenseList.forEach(exp => {
        expenseData.push(exp.amount)
        expenseColor.push(exp.color)
        expenseType.push(exp.type)
    })
      const polarInc = {
        datasets: [{
          data: incomeData,
          backgroundColor: incomeColor
        }],
        
        labels : incomeType
        
      };
    
      const polarExp = {
        datasets: [{
          data: expenseData,
          backgroundColor: expenseColor
        }],
        
       labels : expenseType
        
      };

      const polarChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            autoPadding: true
        },
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                align: "start"
            }
        },
          interaction: {
            mode: 'index',
            intersect: false
          },
    
      }
      const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: empty,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
  return (
      <div>
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul className="flex flex-wrap -mb-px justify-center items-center">
        <li className="cursor-pointer mr-2" onClick={selectDoughnut}>
            <p className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Doughnut</p>
        </li>
        <li className="cursor-pointermr-2" onClick={selectLine}>
            <p className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Line</p>
        </li>
        <li className="cursor-pointer mr-2" onClick={selectPolar}>
            <p class="inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500" aria-current="page">PolarArea</p>
        </li>
    </ul>
</div>
{transactionList.length >=1 ? 
 <div className="overflow-auto flex justify-center items-center flex-wrap">
 <div className="relative h-80 flex-1">
 <PolarArea data = {polarInc} options = {polarChartOptions}/>
 </div>
 <div className="relative h-80 flex-1">
 <PolarArea data = {polarExp} options = {polarChartOptions}/>
 </div>
</div>:
<div className="flex flex-col justify-center items-center h-48">

<Lottie options={defaultOptions}
  className="lottie"
  height={200}
  width={200}
/>
</div>
}
    </div>
  )
}


export default Polar