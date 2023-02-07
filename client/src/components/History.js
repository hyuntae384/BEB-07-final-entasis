import { useState } from 'react';
import ReactModal from 'react-modal';

const History =({
    key,
    order,
    price,
    amount,
    fee,
    date,
    company_name})=>{

        const [pdModalIsOpen, setPdModalIsOpen] = useState(false);
    
        const PdModalOpen =()=>{
            document.body.style.overflow = 'hidden';
            setPdModalIsOpen(true)
            }
        const PdModalClose =()=>{
            document.body.style.overflow = 'unset';
            setPdModalIsOpen(false)
            }

        const modalStyle = {
            overlay: {
                position: "fixed",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                overflow: "hidden",
                zIndex: 10,
            },
            content: {
                display: "block",
                justifyContent: "center",
                background: "#2B2B2B",
                overflow: "scroll",
                top:'30%',
                bottom:'20%',
                left:'20%',
                right:'20%',
                border:"0",
                borderRadius: "10px",
                WebkitOverflowScrolling: "touch",
                outline: "none",
                zIndex: 20,
                opacity:'0.8'
            },
        };

    return(
    <div className="history" onClick={()=>PdModalOpen()}>
        <ReactModal
            appElement={document.getElementById('root') || undefined}
            onRequestClose={()=>PdModalClose()}
            isOpen={pdModalIsOpen}
            style={modalStyle}
            >   
            <div className="trading_record">
                <h1>Trading Record</h1>
                <div className='close' onClick={()=>PdModalClose()}>
                    <img src={require('../assets/images/close.png')}></img>
                    </div>
                    <div className='trading_record_data'>
                        <div className='trading_record_data_left'>
                            <div className='trading_record_data_set'><h2>Order</h2></div>
                            <div className='trading_record_data_set'><h2>Price</h2></div>
                            <div className='trading_record_data_set'><h2>Amount</h2></div>
                            <div className='trading_record_data_set'><h2>Fee</h2></div>
                            <div className='trading_record_data_set'><h2>Date</h2></div>
                            <div className='trading_record_data_set'><h2>From</h2></div>
                        </div>
                        <div className='trading_record_data_right'>
                            <div className='trading_record_data_set'><h2></h2><h3>{order}</h3></div>
                            <div className='trading_record_data_set'><h2></h2><h3>{price}</h3></div>
                            <div className='trading_record_data_set'><h2></h2><h3>{amount}</h3></div>
                            <div className='trading_record_data_set'><h2></h2><h3>{fee}</h3></div>
                            <div className='trading_record_data_set'><h2></h2><h3>{date}</h3></div>
                            <div className='trading_record_data_set'><h2></h2><h3>{company_name}</h3></div>
                        </div>

                    </div>
                <div className='logo'>
                    <img src={require('../assets/images/ENTASIS.png')}></img>
                </div>
        
            </div>
        </ReactModal>
        <div className="history_wrapper">
            <div 
                style= 
                    {{color:
                    order==='buy'?'#0d6097':
                    order==='sell'?'#ab1c37':
                    '#00aab3'
                    }}  
                className="history_order">
                {order}
            </div>
            <div className="history_price">
                {Number(price).toFixed(4)}
            </div>
            <div className="history_amount">
                {amount}
            </div>
            <div className="history_fee">
                {fee}
            </div>
            <div className="history_date">
                {date}
            </div>
            <div className="history_company_name">
                {company_name}
            </div>
        </div>
    </div>
    )
}
export default History