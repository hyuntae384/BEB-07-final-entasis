import {scaleLinear} from 'd3-scale'
import { useEffect, useState, useRef } from "react"
import dataToArray from '../../../functions/data_to_array'
import PublicDisclosure from '../../PublicDisclosure';

const Volume =({ 
    volumeFormatHis,
    volumeData,
    width, 
    height, 
    defaultLimit, 
    dataLength, 
    name,
    })=>{
        const volume_array = [];
        volumeFormatHis
        .slice(dataLength, volumeFormatHis.length)
        .forEach((item) => volume_array.push(item));
    const date = dataToArray(volume_array,0)
    const open = dataToArray(volume_array,1)
    const his_to = dataToArray(volume_array,2)

    let SVG_VOLUME_WIDTH =  typeof width === "number" ? width * 1 : 0;
    let SVG_VOLUME_HEIGHT = typeof height === "number" ? height * 0.3 : 0;

    const xForPrice = 75;
    const xAxisLength = SVG_VOLUME_WIDTH - xForPrice;
    const yAxisLength = SVG_VOLUME_HEIGHT;
    const x0 = 0;
    const y0 = 0;
    let dataArray=[]
    for (let i = 0; i < date.length; i++) {
        dataArray.push([
            date[i],
            open[i],
            his_to[i],
            his_to[i-1]
        ]
        );
    }
    const dataYMax = dataArray.reduce(
        (max, [_, open, his_to, his_from]) => Math.max(his_to, volumeData[2], max),
        -Infinity
    );

    const dataYMin = 0
    const dataYRange = dataYMax;
    const numYTicks = 7;
    const barPlothWidth = xAxisLength / (dataArray.length+1.2);
    dataArray[dataArray.length] = volumeData;
    return(
    <div className="volume">
        <svg width={SVG_VOLUME_WIDTH} height={SVG_VOLUME_HEIGHT}>
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
                {dataArray.map(
                (
                    [
                    date,
                    open,
                    his_to,
                    his_from,
                    ],
                    index
                ) => {
                    const x = x0 + index * barPlothWidth;
                    const sidePadding = xAxisLength * 0.0015;
                    let yRatio = 0;
                    const yRatioGenerator = () => {
                        yRatio = (his_to - dataYMin) / dataYMax;
                        if (yRatio > 0) {
                        return yRatio;
                        } else return (yRatio = his_to / dataYRange / 2);
                    };

                    const y = y0 + (1 - yRatioGenerator()) * yAxisLength;
                    const fill = his_to < his_from ? "#b8284a" : "#00A4D8" ;
                    return (
                    <g key={index}>
                        <rect
                        {...{ fill }}
                        x={x}
                        y={y!== null ?y:0}
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