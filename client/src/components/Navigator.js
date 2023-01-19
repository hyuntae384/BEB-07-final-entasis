import { useState, useEffect } from "react"
import Modal from "react-modal"
const Navigator =()=>{
    const [pdModalIsOpen, setPdModalIsOpen] = useState(false)
    useEffect(()=>{},[pdModalIsOpen])
    const modalStyle = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10,
        },
        content: {
            display: "block",
            justifyContent: "center",
            background: "#2B2B2B",
            overflow: "auto",
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

    return(
    <div className="navigator">
    <div>
        <div 
        onClick={()=>setPdModalIsOpen(true)}
        className="public_disclosure"
        >
            <h2>Public Disclosure</h2>
        </div>
        <Modal
                appElement={document.getElementById('root') || undefined}
                onRequestClose={()=>setPdModalIsOpen(false)}
                isOpen={pdModalIsOpen}
                style={modalStyle}
            >   
                                <div className='close' onClick={()=>setPdModalIsOpen(false)}>
                        <img src={require('../assets/images/close.png')}></img>
                    </div>

            </Modal>


    </div>
    <div></div>
    </div>
    )
}
export default Navigator