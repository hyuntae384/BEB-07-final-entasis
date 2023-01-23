import Position from "./Chart/data/Position"
const Positions =()=>{
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
            <Position></Position>
    </div>
    )
}
export default Positions