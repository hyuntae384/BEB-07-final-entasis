import History from "./History"
const Historys =()=>{
    // `/user/position/?address=${address}`

    const positionArray = [
        {
            id:1,
            order : 'Buy',
            price : 1.250,
            amount : 30,
            fee : 0.005,
            date : 0,
        },
        {
            id:2,
            order : 'Sell',
            price : 1.250,
            amount : 30,
            fee : 0.005,
            date : 0,
        },
        {
            id:3,
            order : 'Sell',
            price : 1.250,
            amount : 30,
            fee : 0.005,
            date : 0,
        },
    ];
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
            {positionArray.map((e)=>{
                return (<History
                    key={e.id}
                    order = {e.order}
                    price = {e.price}
                    amount = {e.amount}
                    fee = {e.fee}
                    date = {e.date}
                />)
            })}
        </div>
    </div>
    )
}
export default Historys