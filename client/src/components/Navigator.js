import { useState, useEffect } from "react"
import Modal from "react-modal"
import '../assets/css/main.css';

const Navigator =()=>{
    const [pdModalIsOpen, setPdModalIsOpen] = useState(false);
    useEffect(()=>{},[pdModalIsOpen]);
    const modalStyle = {
        
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            overflow: "hidden",
            zIndex: 10,
        },
        content: {
            display: "block",
            justifyContent: "center",
            background: "#2B2B2B",
            overflow: "hidden",
            top: "0",
            left: "0",
            right: "80%",
            bottom: "0",
            border:"0",
            borderRadius: "0px",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            zIndex: 10,
            
        },
    };
    const ST_1 = {
        name:'BEBE',
        price:'200',
        amount:'20'
    };
    const ST_2 = {
        name:'DEDE',
        price:'100',
        amount:'230'
    };;
    const ST_3 = {
        name:'CECE',
        price:'400',
        amount:'10'
    };;



    const PdModalOpen =()=>{
        document.body.style.overflow = 'hidden';
        setPdModalIsOpen(true)
        }
    const PdModalClose =()=>{
        document.body.style.overflow = 'unset';
        setPdModalIsOpen(false)
        }
    
    return(
    <div className="navigator">
    <div className="public_disclosure">
        <div className="public_disclosure_wrapper">
            <h4
            onClick={()=>
                PdModalOpen()
            }
            >Public Disclosure</h4>
            {/* <select className='public_disclosure_select'>
                <option disabled={false}>
                    Select Your Security Token
                </option>
                <option value={ST_1.name}>{ST_1.name}</option>
                <option value={ST_2.name}>{ST_2.name}</option>
                <option value={ST_3.name}>{ST_3.name}</option>
            </select> */}
        </div>
        <Modal
        appElement={document.getElementById('root') || undefined}
        onRequestClose={()=>PdModalClose()}
        isOpen={pdModalIsOpen}
        style={modalStyle}
        >   
            <div className="myaccount">
                <h1>Public Disclosure</h1>
                <div className='close' onClick={()=>PdModalClose()}>
                    <img src={require('../assets/images/close.png')}></img>
                </div>
                <h2>Name</h2>
                    <h3>UnNamed</h3>
                <h2>Total Assets</h2>
                    <h3>50,000,000 ETH</h3>
                    <h3>50,000 BEBE</h3>
                    <h3>50,000 CECE</h3>

                <h2>Current Dividend</h2>
                    <h3>50,000 ETH</h3>   
                <h2>Current Dividend Ratio</h2>
                    <h3>0.00032 %</h3> 
                <h2>Next Dividend Ratio</h2>
                    <h3>0.00032 % * ( 1 + 0.04 ) = 0.0003328 %</h3>   

                

            </div>
        </Modal>


    </div>
    <div></div>
    </div>
    )
}
export default Navigator