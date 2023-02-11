import Asset from "./Asset"
import {useState, useEffect} from 'react'
import axios from 'axios';
import { useTranslation } from "react-i18next";
const Assets =({ST_CurrentPrice,powerOfMarket,userEth,userEntaToken,userBebToken,userLeoToken,totalCurrentPrices, userPosition, userAccount,userDividend})=>{
    const { t } = useTranslation();
    
    const totalValue = {
        enta : totalCurrentPrices.enta * userEntaToken,
        beb : totalCurrentPrices.beb * userBebToken,
        leo : totalCurrentPrices.leo * userLeoToken
    }
    // 유저 토큰 밸런스 합
    const sumTokenValue = totalValue.enta + totalValue.beb + totalValue.leo
    // 유저 보유 토큰 밸런스 합 + 유저 보유 이더
    const userTotalValue = sumTokenValue + Number(userEth)
    // 유저 총 배당 수익금
    const totalUserDividendIncome = userDividend.ENTAToken + userDividend.BEBToken + userDividend.LEOToken
    const totalUserDividendIncomeRatio = totalUserDividendIncome / sumTokenValue
    // console.log(totalUserDividendIncomeRatio)
    const AssetsArray = [
        {
            id:1,
            price : totalCurrentPrices.enta,
            amount : userEntaToken,
            total_dividend_income : userDividend.ENTAToken,
            dividend_income_ratio : userDividend.ENTAToken / totalCurrentPrices.enta * userEntaToken,
        },
        {
            id:2,
            price : totalCurrentPrices.beb,
            amount : userBebToken,
            total_dividend_income : userDividend.BEBToken,
            dividend_income_ratio : userDividend.BEBToken / totalCurrentPrices.beb * userBebToken,
        },
        {
            id:3,
            price : totalCurrentPrices.leo,
            amount : userLeoToken,
            total_dividend_income : userDividend.LEOToken,
            dividend_income_ratio : userDividend.LEOToken / totalCurrentPrices.leo * userLeoToken,
        },
    ];
    const marketData = powerOfMarket/ST_CurrentPrice;
    const onMouseEnterHandler = () => {
        document.body.style.overflow = 'hidden';
    }
    /* console.log(totalCurrentPrices.enta) */
    // const x0 = 0;
    // const y0 = 0;
    // const xWidth = 100;
    // const yMax = -marketData;
    
    return(
    <div className="main_assets" >
        <div className="main_assets_top">
            <h4>{t("Account Detail")}</h4>
            <h6>{t("Total Income Ratio")} : {((userTotalValue - 50) / 50 * 100).toFixed(2)}%</h6>
            <h6>{t("Total DI Ratio")} : {totalUserDividendIncomeRatio.toFixed(6)}%</h6>
            <div className="rate_on_investment">
            </div>

            <div className='chains'>
                <i className='fab fa-bitcoin'/>
                <i className='fab fa-ethereum'/>
                <i className='fab fa-facebook-f'/>
                <i className='fab fa-instagram'/>
                <i className='fab fa-reddit-alien'/>
                <i className='fab fa-youtube'/>
                <i className='fab fa-tiktok'/>
                <i className='fab fa-google'/>
                <i className='fab fab fa-apple'/>
            </div>
            <div></div>
        </div>


        <div className="main_assets_menu">
            <h5>{t("Total Price")}</h5>
            <h5>{t("Amount")}</h5>
            <h5>{t("Dividend Income")}</h5>
            <h5>{t("DI Ratio")}</h5>
            <div className="market_data">
                <h5>{t("Market Data")}</h5>
            </div>
        </div>
            <div className="main_bottom_right">
                <div className="main_assets_container">
                {AssetsArray.map((e)=>{
                    return (
                        <Asset
                        key={e.id}
                        price = {e.price}
                        amount = {e.amount}
                        total_dividend_income={e.total_dividend_income}
                        dividend_income_ratio = {e.dividend_income_ratio}
                    />)})}
                </div>
                <div className="market_data_container">
                    <div className="market_data_container_header">
                        <h2>{t("Buy")}</h2><h2>{t("Sell")}</h2>
                        
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
                            y={(150+marketData*80)>0?(150+marketData*80):0}
                            width = {80}
                            height = {(80-marketData*80)>0?80-marketData*80:0}
                            fill='#00A4D8'
                            >
                            </rect>
                            <rect
                            className="RTD_move"
                            x={95}
                            y={(150-marketData*80)>0?150-marketData*80:0}
                            width = {80}
                            height = {(80+marketData*80)>0?80+marketData*80:0}
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