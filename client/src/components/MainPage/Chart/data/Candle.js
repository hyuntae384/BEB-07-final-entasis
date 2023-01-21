import {scaleLinear} from 'd3-scale'
import { getSTChart } from '../../../../apis/chart';
import Volum from './Volum';
import { useEffect, useState, useRef } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const Candle =({ width, height, defaultLimit, dataLength, name,})=>{
    /** get data */
    const testData = getSTChart({
        limit: defaultLimit,
        ST_name: name,
        C_or_V: 'candle' || 'volum'
    });
    const [stv, setStv] = useState(0);
    const [incomeRatio, setIncomeRatio] = useState(0);
    const [his, setHis] = useState([1.2]);
    const [formatHis, setFormatHis] = useState([]);
    const [format, setFormat] = useState()

    const stv_ref = useRef(1);
    const incomeRatio_ref = useRef(0.05);
    useEffect(() => {
        const loop = setInterval(() => {
            stv_ref.current = Math.random()*(0.03-(-0.03))-0.03;
            setStv(stv_ref.current);
        if (stv_ref.current === 10) clearInterval(loop);
        }, 500);
    }, []);
    useEffect(() => {
        const loop = setInterval(() => {
            incomeRatio_ref.current = Math.random()*(0.05-(-0.05))-0.05;
            setIncomeRatio(incomeRatio_ref.current);
        if (incomeRatio_ref.current === 10) clearInterval(loop);
        }, 3000);
    }, []);
    useEffect(()=>{},[formatHis])
    let ST_Corporation_Assets = 20000;
    let ST_CurrentPrice = his[his.length-1] * (1 + stv*(1+incomeRatio))
    let Short_Term_Volatility = stv;
    let IncomeRatio = incomeRatio;

    let CP_his =(e)=>{
        his.push(e)
        let data = {
            open:his[0],
            high:his.reduce((acc,cur)=>{
                    if(acc<cur) return cur 
                    else if(acc>=cur) return acc
                }),
            low:his.reduce((acc,cur)=>{
                if(acc>cur) return cur 
                else if(acc<=cur) return acc
            }),
            close:his[his.length-1],
            date:new Date()
        }
        if(his.length >= 120 ){
            formatHis.push(data);
            his.splice(0,his.length-1);
            console.log(formatHis);
        }
        return e
    }
    // const dataToArray = () => {}
    // const dataToArray = (formatHis,order) => {
    //     const resultArray =[]
    //     formatHis
    //         .map((item) => item)
    //         .forEach((item) => 
    //             resultArray.push(item));
    //         return resultArray;
    //     };
    //     const chartDataArray = [];
    // const readingData = async () => {
    //     return  chartDataArray.push(formatHis);
    //     };
    //     readingData();
    //     const chartDummyArray = chartDataArray[0];
    //     const chartArray = [];
    //     chartDummyArray
    //         ?.slice(dataLength, chartDummyArray.length)
    //         .forEach((item) => chartArray.push(Object.values(item)));
        // console.log(formatHis[formatHis.length-1].open);
        // console.log(open);
        // console.log(close);
        // console.log(high);
        // console.log(low);

        // const date = dataToArray(formatHis.date);
        // const open = dataToArray(formatHis.open);
        // const close = dataToArray(formatHis.close);
        // const high = dataToArray(formatHis.high);
        // const low = dataToArray(formatHis.low);
    // let SVG_CHART_WIDTH = width === "number" ? width * 1 : 0;
    // let SVG_CHART_HEIGHT = height === "number" ? height * 0.5 : 0;

    // const xForPrice = 75;
    // const xAxisLength = SVG_CHART_WIDTH - xForPrice;
    // const yAxisLength = SVG_CHART_HEIGHT * 0.94;
    // const x0 = 0;
    // const y0 = 0;
    return(
    <div className="candle">
        <h1>Trading Logic</h1>
        ST_Corporation_Assets {ST_Corporation_Assets} ETH<br/>
        Short_Term_Volatility {Short_Term_Volatility}<br/>
        IncomeRatio {IncomeRatio}<br/>
        ST_Price <h2>
        {CP_his(ST_CurrentPrice)}
        </h2><br/>
        {/* {setFormat()}<br/> */}
        <div className="CP">CP
        </div>
    </div>
    )
}
export default Candle