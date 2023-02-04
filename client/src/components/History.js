const History =({
    order,
    price,
    amount,
    fee,
    date,
    company_name})=>{
    return(
    <div className="history">
        <div className="history_wrapper">
            <div className="history_order">
                {order}
            </div>
            <div className="history_price">
                {Number(price).toFixed(4)}
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
            <div className="history_company_name">
                {company_name}
            </div>
        </div>
    </div>
    )
}
export default History