import {scaleLinear} from 'd3-scale'
import { useEffect, useState, useRef } from "react"
import dataToArray from '../../../functions/data_to_array'
import PublicDisclosure from '../../PublicDisclosure';

const Volume =({ 
    volTo,
    volFrom,
    width, 
    height, 
    defaultLimit, 
    dataLength, 
    name,
    })=>{


    let SVG_VOLUME_WIDTH =  typeof width === "number" ? width * 1 : 0;
    let SVG_VOLUME_HEIGHT = typeof height === "number" ? height * 0.3 : 0;

    const xForPrice = 75;
    const xAxisLength = SVG_VOLUME_WIDTH - xForPrice;
    const yAxisLength = SVG_VOLUME_HEIGHT-10;
    const x0 = 0;
    const y0 = 0;
    let dataArray=[]
    console.log(volTo)
    // for (let i = 0; i < volFrom.length; i++) {
    //     dataArray.push([
    //         0,
    //         volFrom
    //     ]
    //     );
    // }
    const dataYMax = dataArray.reduce(
        (max, [_, vol]) => Math.max(vol, /*현재 거래량 */ max),
        -Infinity
    );
    console.log(dataArray)

    const dataYMin = 0
    const dataYRange = dataYMax;
    const numYTicks = 7;
    const barPlothWidth = xAxisLength / (dataArray.length+1.2);
    // dataArray[dataArray.length] = /*현재 거래량 */
    return(
    <div className="volume">
        <svg width={SVG_VOLUME_WIDTH} height={SVG_VOLUME_HEIGHT-10}>
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
                        y1={y}
                        y2={y}
                        stroke='#474747'
                    ></line>
                    <text x={SVG_VOLUME_WIDTH - 60} y={y + 10} fontSize="10" stroke='#474747' >
                        {typeof yValue !== 'null'&&typeof yValue !== 'undefined'?yValue.toLocaleString():0} 
                    </text>
                    </g>
                );
                })}
                {/* {console.log(dataArray)} */}
                {dataArray.map(
                (
                    [
                    _,
                    vol
                    ],
                    index
                ) => {
                    const x = x0 + index * barPlothWidth;
                    const sidePadding = xAxisLength * 0.0015;
                    let yRatio = 0;
                    const yRatioGenerator = () => {
                        yRatio = (vol - dataYMin) / dataYMax;
                        if (yRatio > 0) {
                        return yRatio;
                        } else return (yRatio = vol / dataYRange);
                    };

                    const y = y0 + (1 - yRatioGenerator()) * yAxisLength+5;
                    const fill = vol ? "#b8284a" : "#00A4D8" ;
                    return (
                    <g key={index}>
                        <rect
                        {...{ fill }}
                        x={x}
                        y={y!== null ?y:10}
                        width={barPlothWidth - sidePadding}
                        height={height}
                        ></rect>
                    </g>
                    );
                }
                )}
            <line></line>
            <text></text>
        </svg>
    </div>
    )
}
export default Volume