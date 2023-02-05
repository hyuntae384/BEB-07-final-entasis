import { useState } from "react";
import History from "./History"
const HistoryWrapper =({userPosition})=>{
    const [currentPageNum, setCurrentPageNum]=useState(1)
    let positions = userPosition!==undefined&& userPosition!==null?userPosition:[]

    let pageSet = 10; //페이지 단위
    let pages = Math.ceil(positions.length/ 10);//총 페이지 길이
    // positions.slice(offset,limit)//페이지네이션

    let offset = pageSet * (currentPageNum - 1);
    let limit = offset + pageSet-1;
    console.log(currentPageNum)

    //for(let i = 0 ;i<Math.ceil(positions.length/ 10);i++)
    return(
        <div className="history_wrapperA">
            <div className="history_wrapperA_top">
                <h4>History</h4>
                <div className="pagination">
                    <div 
                    onClick={()=>currentPageNum>0?setCurrentPageNum(currentPageNum-1):<></>}
                    className="pagination_btn">
                        {<i className="fas fa-caret-left"></i>}
                    </div>
                    {pages<=10?<div className="pagination_numbers">{Array(pages).fill().map((_,i)=>{<div 
                    onClick={()=>setCurrentPageNum(i)}
                    className="pagination_numbers btn">{i+1}</div>})}</div>:
                        <div className="pagination_numbers">
                            <div 
                            onClick={()=>setCurrentPageNum(1)}
                            className="pagination_numbers btn">1</div>
                            <div 
                            onClick={()=>setCurrentPageNum(2)}
                            className="pagination_numbers btn">2</div>
                            <div 
                            onClick={()=>setCurrentPageNum(3)}
                            className="pagination_numbers btn">3</div>
                            <div 
                            className="pagination_numbers btn">···</div>
                            <div 
                            onClick={()=>setCurrentPageNum(Number((pages/2).toFixed(0))-1)}
                            className="pagination_numbers btn">{Number((pages/2).toFixed(0))-1}</div>
                            <div 
                            onClick={()=>setCurrentPageNum(Number((pages/2).toFixed(0)))}
                            className="pagination_numbers btn">{Number((pages/2).toFixed(0))}</div>
                            <div 
                            onClick={()=>setCurrentPageNum(Number((pages/2).toFixed(0))+1)}
                            className="pagination_numbers btn">{Number((pages/2).toFixed(0))+1}</div>
                            <div 
                            className="pagination_numbers btn">···</div>
                            <div 
                            onClick={()=>setCurrentPageNum(pages-2)}
                            className="pagination_numbers btn">{pages-2}</div>
                            <div 
                            onClick={()=>setCurrentPageNum(pages-1)}
                            className="pagination_numbers btn">{pages-1}</div>
                            <div 
                            onClick={()=>setCurrentPageNum(pages)}
                            className="pagination_numbers btn">{pages}</div>
                        </div>
                    }
                    <div 
                    onClick={()=>currentPageNum<pages?setCurrentPageNum(currentPageNum+1):<></>}
                    className="pagination_btn">
                        {<i className="fas fa-caret-right"></i>}
                    </div>
                </div>
                <div 
                    className="btn_m">{currentPageNum}
                </div>
            </div>
            
            <div className="history_wrapperA_menu">
                <h5>Order</h5>
                <h5>Price</h5>
                <h5>Amount</h5>
                <h5>Fee</h5>
                <h5>Date</h5>
            </div>
            <div className="main_history_wrapperA_container">
                {positions.slice(offset,limit)!==undefined?positions.slice(offset,limit).map((e)=>{
                    return (<History
                        key={e.id}
                        order = {e.order}
                        price = {e.price}
                        amount = {e.amount}
                        fee = {e.fee}
                        date = {`${e.createdAt}`.slice(0,10)}
                        company_name={e.company_name}
                    />)
                }):<></>}
            </div>
        </div>
    )
}

export default HistoryWrapper