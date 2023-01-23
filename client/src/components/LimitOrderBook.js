
const LimitOrderBook =({ST_CurrentPrice})=>{

    
    //MM
    //CP 위 아래로 5칸의 호가 구성
    //물량은 cp에서 멀어질수록 많아짐
    //호가단위 = 토큰가격/100 5단위 올림
    let priceSet = Math.ceil(ST_CurrentPrice*100)/10000
    let orderList = []
    for(let i =0;i<5;i++){
        let amountSet = 15;
        let sellOrder= {
            id:4-i,
            name:"bebe",
            price:ST_CurrentPrice+priceSet*(i+1),
            amount:amountSet*(i+1),
        };


        let buyOrder={
            id:5+i,
            name:"bebe",
            price:ST_CurrentPrice-priceSet*(i+1),
            amount:amountSet*(i+1),
        };

        orderList[4-i] = sellOrder
        orderList[6+i] = buyOrder

        let a = orderList[0]
        // console.log(a)
    }
    return(
    <div className="limit_order_book">
        <div className="limit_order_book_menu">
            <h4>Order</h4>
            <h4>Price</h4>
            <h4>Amount</h4>
            <h4>Total</h4>
        </div>
        {orderList.map((e)=>{
            return(
                <div  key={e.id}>
                    {e.id<5?
                    <div className="limit_order_buy">
                        <div>{'Sell'}</div>
                        <div>{e.price.toFixed(3)}</div>
                        <div>{e.amount}</div>
                        <div>{(e.price*e.amount).toFixed(2)}</div>
                    </div>  
                    :<></>}
                </div>
            )
            })}
            <div className="market_order">
                    <h1>Price</h1>
                    <h1>{ST_CurrentPrice.toFixed(3)}</h1>
            </div>
                            {/*

                 */}
            {orderList.map((e)=>{
                return(
                    <div  key={e.id}>
                        {e.id>4?
                            <div className="limit_order_sell">
                        <div>{'Buy'}</div>
                        <div>{e.price.toFixed(3)}</div>
                        <div>{e.amount}</div>
                        <div>{(e.price*e.amount).toFixed(2)}</div>
                    </div>:<></>}
                    </div>
                )})}

    </div>
    
    )
}
export default LimitOrderBook