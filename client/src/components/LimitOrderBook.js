
const LimitOrderBook =({ST_CurrentPrice})=>{

    
    //MM
    //CP 위 아래로 5칸의 호가 구성
    //물량은 cp에서 멀어질수록 많아짐
    //호가단위 = 토큰가격/100 5단위 올림
    let priceSet = 0.01;
    let orderList = [];
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
    }
    // let SVG_VOLUME_WIDTH =  typeof width === "number" ? width * 1 : 0;
    // let SVG_VOLUME_HEIGHT = typeof height === "number" ? height * 0.3 : 0;

    // const xForPrice = 75;
    // const xAxisLength = SVG_VOLUME_WIDTH - xForPrice;
    // const yAxisLength = SVG_VOLUME_HEIGHT;

    // const dataYMax = dataArray.reduce(
    //     (max, [_, open, his_to, his_from]) => Math.max(his_to, volumeData[2], max),
    //     -Infinity
    // );

    // const dataYMin = 0
    // const dataYRange = dataYMax;
    // const numYTicks = 7;
    // const barPlothWidth = xAxisLength / (dataArray.length+1.2);
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
                        <div>
                            {e.price>1000?e.price.toFixed(0):(e.price>100?e.price.toFixed(1):(e.price>10?e.price.toFixed(2):(e.price>1?e.price.toFixed(2):e.price.toFixed(2))))}
                        </div>
                        <div>{e.amount}</div>
                        <div>
                            {(e.price*e.amount)>1000?(e.price*e.amount).toFixed(0):(e.price*e.amount)>100?(e.price*e.amount).toFixed(1):((e.price*e.amount)>10?(e.price*e.amount).toFixed(2):((e.price*e.amount)>1?(e.price*e.amount).toFixed(2):(e.price*e.amount).toFixed(2)))}
                        </div>
                    </div>  
                    :<></>}
                </div>
            )
            })}
            <div className="market_order">
                    <h3>Market Price</h3>
                    <h3>{ST_CurrentPrice>1000?ST_CurrentPrice.toFixed(0):(ST_CurrentPrice>100?ST_CurrentPrice.toFixed(1):(ST_CurrentPrice>10?ST_CurrentPrice.toFixed(2):(ST_CurrentPrice>1?ST_CurrentPrice.toFixed(2):ST_CurrentPrice.toFixed(2))))}</h3>
                    <h3>ETH</h3>
            </div>
            {orderList.map((e)=>{
                return(
                    <div  key={e.id}>
                        {e.id>4?
                            <div className="limit_order_sell">
                        <div>{'Buy'}</div>
                        <div>
                            {e.price>1000?e.price.toFixed(0):(e.price>100?e.price.toFixed(1):(e.price>10?e.price.toFixed(2):(e.price>1?e.price.toFixed(2):e.price.toFixed(2))))}
                        </div>
                        <div>{e.amount}</div>
                        <div>
                            {(e.price*e.amount)>1000?(e.price*e.amount).toFixed(0):(e.price*e.amount)>100?(e.price*e.amount).toFixed(1):((e.price*e.amount)>10?(e.price*e.amount).toFixed(2):((e.price*e.amount)>1?(e.price*e.amount).toFixed(2):(e.price*e.amount).toFixed(2)))}</div>
                        </div>:<></>}
                    </div>
                )})}
                {/* 호가창 거래량 UX 향상을 위한 그래프*/}
                {/* <svg width={SVG_VOLUME_WIDTH} height={SVG_VOLUME_HEIGHT}>

                    {orderList.map(
                    (
                        [
                        id,
                        name,
                        price,
                        amount,
                        ],
                        index
                    ) => {
                        const x = id * barPlothWidth;
                        const sidePadding = xAxisLength * 0.0015;
                        let yRatio = 0;
                        const yRatioGenerator = () => {
                            yRatio = (his_to - dataYMin) / dataYMax;
                            if (yRatio > 0) {
                            return yRatio;
                            } else return (yRatio = his_to / dataYRange / 2);
                        };

                        const y =(1 - yRatioGenerator()) * yAxisLength;
                        const fill = id < 4 ? "#b8284a" : "#00A4D8" ;
                        return (
                        <g key={index}>
                            <rect
                            {...{ fill }}
                            x={x}
                            y={y}
                            width={barPlothWidth - sidePadding}
                            height={height}
                            ></rect>
                        </g>
                        );
                    }
                    )}
            </svg> */}
    </div>
    
    )
}
export default LimitOrderBook