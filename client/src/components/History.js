const History =({
    order,
    price,
    amount,
    fee,
    date,})=>{
    return(
    <div className="history">
        <div className="history_wrapper">
            <div className="history_order">
                {order}
            </div>
            <div className="history_price">
                {price}
            </div>
            <div className="history_amount">
                {amount}
            </div>
            <div className="history_fee">
                {fee}
            </div>
            <div className="history_date">
                {date}
            </div>
        </div>
    </div>
    )
}
export default History