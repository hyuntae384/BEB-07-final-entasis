import Asset from "./Asset"
const Assets =({ST_CurrentPrice,powerOfMarket,userEth,userToken})=>{
    // `/user/asset/?address=${address}`

    const AssetsArray = [
        {
            id:1,
            price : 1.250,
            amount : userToken,
            dividend_income_ratio : 0.005,
            date : 0,
        },
        {
            id:2,
            price : 1.250,
            amount : 330.123,
            dividend_income_ratio : 0.005,
            date : 0,
        },
        {
            id:3,
            price : 1.250,
            amount : 28.2,
            dividend_income_ratio : 0.005,
            date : 0,
        },
        {
            id:4,
            price : 1.250,
            amount : 102.33,
            dividend_income_ratio : 0.005,
            date : 0,
        },
        {
            id:5,
            price : 1.250,
            amount : 3310.123,
            dividend_income_ratio : 0.005,
            date : 0,
        },
        {
            id:6,
            price : 1.250,
            amount : 238.2,
            dividend_income_ratio : 0.005,
            date : 0,
        },
        {
            id:7,
            price : 1.250,
            amount : 10.343,
            dividend_income_ratio : 0.005,
            date : 0,
        },
        {
            id:8,
            price : 1.250,
            amount : 3430.123,
            dividend_income_ratio : 0.005,
            date : 0,
        },
        {
            id:9,
            price : 1.250,
            amount : 228.2,
            dividend_income_ratio : 0.005,
            date : 0,
        },
    ];
    const marketData = powerOfMarket/ST_CurrentPrice;
    const onMouseEnterHandler = () => {
        document.body.style.overflow = 'hidden';
    }
    // const x0 = 0;
    // const y0 = 0;
    // const xWidth = 100;
    // const yMax = -marketData;
    
    return(
    <div className="main_assets" >
        <div className="main_assets_top">
            <h4>Account Detail</h4>
            <div className="rate_on_investment">
                
            </div>
            <div></div>
        </div>

        <div className="main_assets_menu">
            <h5>Total Price</h5>
            <h5>Amount</h5>
            <h5>Dividend Income</h5>
            <h5>Date</h5>
            <div className="market_data">
                <h5>Market Data</h5>
            </div>
        </div>
            <div className="main_bottom_right">
                <div className="main_assets_container">
                {AssetsArray.map((e)=>{
                    return (
                        <Asset
                        key={e.id}
                        price = {ST_CurrentPrice}
                        amount = {e.amount}
                        dividend_income_ratio={e.dividend_income_ratio}
                        date = {e.date}
                    />)})}
                </div>
                <div className="market_data_container">
                    <div className="market_data_container_header">
                        <h2>Buy</h2><h2>Sell</h2>
                        
                    </div>
                    <h4 color="#00A4D8">{(-marketData/ST_CurrentPrice*100).toFixed(2)}%</h4>
                    <svg className="marketData_chart"
                        width = {180}
                        height = {250}>
                        <g className="marketData_chart_bar">
                        <rect
                            x={5}
                            y={20}
                            width = {80}
                            height = {210}
                            fill='#222223'
                            >
                            </rect>
                            <rect
                            x={95}
                            y={20}
                            width = {80}
                            height = {210}
                            fill='#222223'>
                            </rect>

                        <rect
                            className="RTD_move"
                            x={5}
                            y={(150+marketData*600)>0?(150+marketData*600):0}
                            width = {80}
                            height = {(80-marketData*600)>0?80-marketData*600:0}
                            fill='#00A4D8'
                            >
                            </rect>
                            <rect
                            className="RTD_move"
                            x={95}
                            y={(150-marketData*600)>0?150-marketData*600:0}
                            width = {80}
                            height = {(80+marketData*600)>0?80+marketData*600:0}
                            fill='#b8284a'>
                            </rect>
                        </g>
                    </svg>
                    
                </div>
            </div>

    </div>
    )
}
export default Assets