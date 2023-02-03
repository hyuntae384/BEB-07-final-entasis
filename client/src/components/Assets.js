import Asset from "./Asset"
const Assets =({ST_CurrentPrice,powerOfMarket})=>{
    // `/user/asset/?address=${address}`

    const AssetsArray = [
        {
            id:1,
            price : 1.250,
            amount : 10.33,
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
    const x0 = 0;
    const y0 = 0;
    const xWidth = 100;
    const yMax = -marketData;
    
    return(
    <div className="main_assets" onFocus={onMouseEnterHandler}>
        <h4>Assets Detail</h4>
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
                    {-marketData}
                    <svg className="marketData_chart"
                        width = {180}
                        height = {250}>
                        <g className="marketData_chart_bar">
                        <rect
                            {...{}}
                            x={5}
                            y={150-marketData*1000}
                            width = {80}
                            height = {80+marketData*1000}>
                            </rect>
                            <rect
                            {...{}}
                            x={95}
                            y={150-marketData*1000}
                            width = {80}
                            height = {80+marketData*1000}>
                            </rect>
                        </g>
                    </svg>
                    
                </div>
            </div>

    </div>
    )
}
export default Assets