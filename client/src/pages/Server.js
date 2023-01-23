
import { useEffect, useState, useRef } from "react"

const Server =({width,height,dataLength})=>{
    const [stv, setStv] = useState(0);
    const [incomeRatio, setIncomeRatio] = useState(0);
    const [his, setHis] = useState([1.2]);
    const [formatLengthHis, setFormatLengthHis] = useState([]);
    const [formatHis, setFormatHis] = useState([])

    const stv_ref = useRef(1);
    const incomeRatio_ref = useRef(0.05);
    useEffect(() => {
        const loop = setInterval(() => {
            stv_ref.current = Math.random()*(0.0003-(-0.0003))-0.0003;
            setStv(stv_ref.current);
        if (stv_ref.current === 10) clearInterval(loop);
        }, 500);
    }, []);
    useEffect(() => {
        const loop = setInterval(() => {
            incomeRatio_ref.current = Math.random()*(0.0009-(-0.0009))-0.0009;
            setIncomeRatio(incomeRatio_ref.current);
        if (incomeRatio_ref.current === 10) clearInterval(loop);
        }, 5000);
    }, []);
    let ST_Corporation_Assets = 20000;
    let ST_CurrentPrice = his[his.length-1] * (1 + stv)*(1+incomeRatio)
    let Short_Term_Volatility = stv;
    let IncomeRatio = incomeRatio;
    
    let data = [
        new Date().getHours()+ ':'+new Date().getMinutes()+ ':'+ new Date().getSeconds(),
        his[0],
        his[his.length-1],
        his.reduce((acc,cur)=>{
                if(acc<cur) return cur 
                else if(acc>=cur) return acc
            }),
        his.reduce((acc,cur)=>{
            if(acc>cur) return cur 
            else if(acc<=cur) return acc
        })
    ]

    let CP_his =(e)=>{
        his.push(e)
        if(his.length >= 120 ){
            formatHis.push(data);
            his.splice(0,his.length-1);
        }
        return e
    }
    formatHis
    ?.slice(dataLength, formatHis.length)
    .forEach((item) => formatLengthHis.push(item));
    console.log(formatLengthHis)
    // const readingData = async () => {
    //     return !isLoading ? coinDataArray.push(data.Data.Data) : null;
    // };
    // readingData()
    const dataToArray = (formatHis,order) => {
        const resultArray =[]
        formatHis
            .map((item) => item[order])
            .forEach((item) => 
                resultArray.push(item));
            return resultArray;
        };
    const date = dataToArray(formatHis,0)
    const open = dataToArray(formatHis,1)
    const close = dataToArray(formatHis,2)
    const high = dataToArray(formatHis,3)
    const low =dataToArray(formatHis,4)

    let SVG_CHART_WIDTH =  typeof width === "number" ? width * 1 : 0;
    let SVG_CHART_HEIGHT = typeof height === "number" ? height * 0.5 : 0;

    const xForPrice = 75;
    const xAxisLength = SVG_CHART_WIDTH - xForPrice;
    const yAxisLength = SVG_CHART_HEIGHT;
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

    return(
    <div className="server">

    </div>
    )
}
export default Server