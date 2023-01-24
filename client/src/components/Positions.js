import Position from "./Position"
const Positions =()=>{
    // `/user/position/?address=${address}`

    const positionArray = [

    ];
    return(
    <div className="positions">
        <h4>Position</h4>
        <div className="position_menu">
            <h5>Order</h5>
            <h5>Price</h5>
            <h5>Amount</h5>
            <h5>Fee</h5>
            <h5>Date</h5>
        </div>
            {positionArray.map((e)=>{
                return (<Position
                    order = {e.order}
                    price = {e.price}
                    amount = {e.amount}
                    fee = {e.fee}
                    date = {e.date}
                />)
                })}
            
    </div>
    )
}
export default Positions