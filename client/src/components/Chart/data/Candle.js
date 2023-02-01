import {scaleLinear} from 'd3-scale'
import dataToArray from '../../../functions/data_to_array'

const Candle =({ 
    currentPrice,
    date,
    open,
    close,
    high,
    low,
    width, height, defaultLimit, dataLength, name,})=>{

    let SVG_CHART_WIDTH = typeof width === "number" ? width * 1 : 0;
    let SVG_CHART_HEIGHT = typeof height === "number" ? height * 1 : 0;

    const xForPrice = 75;
    const xAxisLength = SVG_CHART_WIDTH - xForPrice;
    const yAxisLength = SVG_CHART_HEIGHT - 25;
    const x0 = 0;
    const y0 = 0;
        const dataArray = [];

        
    for (let i = 0; i < date.length; i++) {
        dataArray.push([
            date[i],
            open[i],
            close[i],
            high[i],
            low[i],
        ]);
    }

    // if(`${currentPrice.createdAt}`.slice(18,-5)!=='0'){
        dataArray[dataArray.length] = [currentPrice.createdAt,currentPrice.open,currentPrice.close,currentPrice.high,currentPrice.low];

    // }else{
    //     dataArray.push([`${currentPrice.createdAt}`,`${currentPrice.open}`,`${currentPrice.close}`,`${currentPrice.high}`,`${currentPrice.low}`]);
    //     dataArray.push([currentPrice.createdAt,currentPrice.close,currentPrice.close,currentPrice.close,currentPrice.close]);

    // }
    const dataYMax = dataArray.reduce(
        (max, [_, open, close, high, low]) => (Math.max(max, high,currentPrice.high)+0.0005),
        -Infinity
    );
    const dataYMin = dataArray.reduce(
        (min, [_, open, close, high, low]) => (Math.min(min, low,currentPrice.low)-0.0005),
        +Infinity
    );
    const dataYRange = dataYMax - dataYMin;
    const numYTicks = 7;
    const barPlothWidth = xAxisLength / (dataArray.length+1.2);
    const numXTicks = dataArray.length>12?12:dataArray.length;

    const xValue= [];
    const generateDate = () => {
        for (let i = 0; i < 12; i++) {
          xValue.push(date[Math.round(date.length / 12) * i]);
        }
        return xValue
        };
        generateDate();

    return(
    <div className="candle">
        <br/>
        <div>
            <svg width={SVG_CHART_WIDTH} height={SVG_CHART_HEIGHT}>
                {/* <text
                x={x0 + 15}
                y={y0 + yAxisLength * 0.06}
                fontSize={
                    SVG_CHART_WIDTH > 700
                    ? SVG_CHART_WIDTH * 0.01
                    : SVG_CHART_WIDTH * 0.02
                }
                stroke='#ffffff'
                >
                {name} {currentPrice.close}
                </text> */}
                <line
                x1={x0}
                y1={yAxisLength}
                x2={xAxisLength}
                y2={yAxisLength}
                stroke="gray"
                />
                <line
                x1={xAxisLength}
                y1={y0}
                x2={xAxisLength}
                y2={yAxisLength}
                stroke="gray"
                />

                {/* 세로선 작성 */}
                {Array.from({ length: numXTicks }).map((_, index) => {
                const x = x0 + index * (xAxisLength / numXTicks);
                return (
                    <g key={index}>
                    <line
                        className="lineLight"
                        x1={x}
                        x2={x}
                        y1={yAxisLength}
                        y2={y0}
                        stroke='#404040'
                    ></line>
                    <text
                        x={x}
                        y={SVG_CHART_HEIGHT-15}
                        textAnchor="right"
                        stroke='#474747'
                        fontSize={SVG_CHART_WIDTH < 800 ? 8 : 10}
                    >
                        {`${xValue[index]}`.slice(14,-5)}
                    </text>
                    </g>
                );
                })}

                {/* 가로선 작성(css name => lineLight) */}
                {Array.from({ length: numYTicks }).map((_, index) => {
                const y = y0 + index * (yAxisLength / numYTicks);
                const yValue = (
                    dataYMax - index * (dataYRange / numYTicks)
                );
                return (
                    <g key={index}>
                    <line
                        className="lineLight"
                        x1={xAxisLength}
                        x2={x0}
                        y1={y==='NaN'?0:y}
                        y2={y==='NaN'?0:y}
                        stroke='#474747'
                    ></line>
                    <text x={SVG_CHART_WIDTH - 60} y={y + 10} fontSize="10" stroke='#474747' >
                        {typeof yValue === 'number'?yValue.toLocaleString():0} ETH
                    </text>
                    </g>
                );
                })}
                {/* 캔들 구현 */}
                {dataArray.map(
                (
                    [
                    date,
                    open,
                    close,
                    high,
                    low,
                    ],
                    index
                ) => {
                    const x = x0 + index * barPlothWidth;
                    const xX = x0 + (index + 1) * barPlothWidth;
                    const sidePadding = xAxisLength * 0.0015;
                    const max = Math.max(open, close);
                    const min = Math.min(open, close);
                    const scaleY = scaleLinear()
                    .domain([dataYMin, dataYMax])
                    .range([y0, yAxisLength]);
                    const fill = close > open ? "#00A4D8" : "#b8284a";
                    return (
                    <g key={index}>
                        <line
                        x1={x + (barPlothWidth - sidePadding) / 2}
                        x2={x + (barPlothWidth - sidePadding) / 2}
                        y1={(yAxisLength - scaleY(low))==='NaN' ? 0 : yAxisLength - scaleY(low)}
                        y2={(yAxisLength - scaleY(high))==='NaN' ? 0 : yAxisLength - scaleY(high)}
                        stroke={close > open ? "#00A4D8" : "#b8284a"}
                        />

                        <rect
                        {...{ fill }}
                        x={x}
                        width={barPlothWidth - sidePadding}
                        y={typeof scaleY(max)!== null ?yAxisLength - scaleY(max):0}
                        // 시가 종가 최대 최소값의 차
                        height={(scaleY(max) - scaleY(min))>1?scaleY(max) - scaleY(min):1}
                        ></rect>

                        <line
                        className="lineLight"
                        x1={xAxisLength+10}
                        x2={x0}
                        y1={(yAxisLength - scaleY(currentPrice.close))==='NaN' ? 0 : yAxisLength - scaleY(currentPrice.close)}
                        y2={(yAxisLength - scaleY(currentPrice.close))==='NaN' ? 0 : yAxisLength - scaleY(currentPrice.close)}
                        stroke={open > close ? "#E33F64" : "#00A4D8"}
                        ></line>
                        <text x={SVG_CHART_WIDTH - 60} y={typeof scaleY(currentPrice.close)==='number'?yAxisLength - scaleY(currentPrice.close):0} fontSize="12" fill= 
                        {open > close ? "#E33F64" : "#00A4D8"} 
                        >
                        {typeof scaleY(currentPrice.close)==='number'?currentPrice.close:0} ETH
                        </text>
                        {/* {dataArray[dataArray.length]?
                        <div> */}


                        {/* </div>
                        :<></>} */}
                    </g>
                    );
                }
                )}
            </svg>
        </div>

    </div>
    )
}
export default Candle