import { useState } from "react";
import { Position } from "../apis/user";
import History from "./History"
const Historys =({userPosition})=>{

    return(
        <div className="historys">
            <h4>Historys</h4>
            <div className="historys_menu">
                <h5>Order</h5>
                <h5>Price</h5>
                <h5>Amount</h5>
                <h5>Fee</h5>
                <h5>Date</h5>
            </div>
            <div className="main_historys_container">
                {userPosition!==undefined?userPosition.map((e)=>{
                    return (<History
                        key={e.id}
                        order = {e.order}
                        price = {e.price}
                        amount = {e.amount}
                        fee = {e.fee}
                        date = {`${e.createdAt}`.slice(0,10)}
                        company_name={e.company_name}
                    />)
                }):<></>}
            </div>
        </div>
    )
}

export default Historys