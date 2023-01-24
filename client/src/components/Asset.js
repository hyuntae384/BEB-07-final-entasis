const Asset =({
    price,
    amount,
    dividend_income_ratio,
    date,
    })=>{
    return(
        <div className="asset_wrapper">
            <div className="asset_price">
                {(price*amount).toFixed(3)}
            </div>
            <div className="asset_amount">
                {amount}
            </div>
            <div className="asset_dividend_income_ratio">
                {(dividend_income_ratio*amount).toFixed(3)}
            </div>
            <div className="asset_date">
                {date}
            </div>
        </div>
    )
}
export default Asset