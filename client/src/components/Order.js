import React from "react"
import {useState, useEffect} from 'react';

const Order =()=>{
    const [priceAmount, setPriceAmount] = useState({price : "", amount : ""});
    

    async function priceChange(e){
        priceAmount.price = e.target.value;
        setPriceAmount(priceAmount)
    }

    async function amountChange(e){
        priceAmount.amount = e.target.value;
        setPriceAmount(priceAmount)
    }

    async function ableChange(e){
        
    }

    return(
    <div className="order">
        <h1>Order</h1>
        <form>
                <span>Price</span><br/>
                <input type="text" name="price" onChange={e => priceChange(e)}></input><br/>
                <span>Amount</span><br/>
                <input type="text" name="amount" onChange={e => amountChange(e)}></input><br/>
                <input type="button" value="Buy"></input>
                <input type="button" value="Sell"></input>
        </form>
        <h1>Assets</h1>

    </div>
    )
}
export default Order