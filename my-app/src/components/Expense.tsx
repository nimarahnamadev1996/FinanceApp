import { useEffect, useState } from "react"
import { Transaction } from "../types/Transaction"


const Expense = () => {

    const [transactions,setTransactions] = useState<Transaction[]>(() => {
        const savedTran = localStorage.getItem('transactions') 
        return savedTran ? JSON.parse(savedTran) : []
    })
    const [text,setText] = useState('')
    const [amount,setAmount] = useState('')


    const addTransaction = () => {
        if(!text || !amount) return 

        const newTransactions : Transaction = {
            id: Date.now(),
            text,
            amount: parseFloat(amount)
        }

        setTransactions([newTransactions, ...transactions])
        setText('')
        setAmount('')
        
    }


    const deleteTransaction = (id: number) => {
        setTransactions(transactions.filter((item) => item.id !== id ))
    }

    let total =0

    transactions.map((item) => total += item.amount)

    let income = 0
    let expense = 0

    transactions.map((item) =>{
        if(item.amount > 0) {
            income += item.amount
        } else{
            expense += item.amount 
        }

    } 
    )


    useEffect(() => {
      localStorage.setItem('transactions', JSON.stringify(transactions))
    },[transactions])

  return (
    <div className="expense-container">

    <h2>💰 Expense Tracker</h2>

    <h3>Balance:{total}</h3>

    <div className="summary">
        <div className="income">Income: {income}</div>
        <div className="expense">Expense: {expense}</div>
    </div>

    <div className="add-transaction">
        <input 
        type="text" 
        placeholder="Enter description"
        value={text}
        onChange={(e) => setText(e.target.value)}/>

        <input 
        type="number" 
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}/>

        <button onClick={addTransaction}>Add Transaction</button>
    </div>

    <ul className="transactions">
        {
            transactions.map((item) => (
                <li 
                 key={item.id}
                 className={item.amount > 0 ? 'income' : 'expense'}>
                    {item.text} - {item.amount}

                    <button
                    onClick={() => deleteTransaction(item.id)}>
                        حذف
                    </button>
                </li>

                
            ))
        }
    </ul>
    
</div>
  )
}

export default Expense