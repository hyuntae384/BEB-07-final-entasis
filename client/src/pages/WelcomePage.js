import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import {Tutorial} from '../apis/user'
const Welcome =({isLoading, tutorialCnt, account})=>{
    const [welcomeClose, setWelcomeClose] = useState(false)

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
            overflow: "hidden",
            border:"0",
            borderRadius: "10px",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            zIndex: 20,
            
        },
    };
    useEffect(()=>{
        Tutorial(account,tutorialCnt)
    },[account,tutorialCnt])

    if(isLoading){
    return (<div
            className="welcome logo"  onFocus={document.body.style.overflow='hidden'}>
            <img className="logo" src={require('../assets/images/ENTASIS_white.png')} alt="loading"/>
            <img src={require('../assets/images/Infinity.gif')} alt="loading"/>
            </div>)
    } else if(!welcomeClose){return (
        <div className="welcome" onClick={()=>setWelcomeClose(!welcomeClose)}  onFocus={document.body.style.overflow='hidden'}>
            <img src={require('../assets/images/welcome.png')} alt="welcome"/>
        </div>
    )}

    // if(start&&tutorialCnt<1){
    //     return (
    //         <Modal
    //         appElement={document.getElementById('root') || undefined}
    //         onRequestClose={()=>{setStart();Tutorial(account,tutorialCnt+1)}}
    //         isOpen={start}
    //         style={modalStyle}
    //         className="welcome_tutorial" onFocus={document.body.style.overflow='hidden'}>
    //         <div className='welcome_tutorial_top' >
    //         <h2>Welcome to Entasis</h2> <br/>
    //         </div>
    //         <img onClick={() => {setStart();Tutorial(account,tutorialCnt+1);}} className="congratulations"  src={require('../assets/images/welcome_1.gif')} alt="welcome"/>
    //             <h5>For Trading</h5> 
    //             <h5>Follow this Tutorial</h5>
    //         <h5 className='count'>1/10</h5>
    //         <div className='skip' onClick={()=>{setStart();Tutorial(account,tutorialCnt+1);}}>Next</div>
    //         </Modal>
    //     )}
    
    // if(wallet){

    // return (
    //     <Modal
    //     appElement={document.getElementById('root') || undefined}
    //     onRequestClose={()=>{setWallet();Tutorial(account,tutorialCnt+1)}}
    //     isOpen={wallet}
    //     style={modalStyle}
    //     className="welcome_tutorial_wallet" onFocus={document.body.style.overflow='hidden'}>
    //     <div className='welcome_tutorial_top' >
    //     <h4>Register your wallet</h4> <br/>
    //     <i className='fas fa-arrow-up'></i>
    //     </div>
    //     <div className='welcome_tutorial_wallet_body'>
    //         <h5>Connect Your</h5> 
    //         <h5>MataMask Wallet</h5>
    //     </div>
    //     <h5 className='count'>1/10</h5>
    //     <div className='skip' onClick={()=>{setWallet();Tutorial(account,tutorialCnt+1);}}>Next</div>
    //     </Modal>
    // )}
    // if(chart){
    //     return (
    //     <Modal
    //     appElement={document.getElementById('root') || undefined}
    //     onRequestClose={()=>{setChart();Tutorial(account,tutorialCnt+1)}}
    //     isOpen={chart}
    //     style={modalStyle}
    //     className="welcome_tutorial_chart" onClick={()=>setChart()} onFocus={document.body.style.overflow='hidden'}>
    //     <div className='welcome_tutorial_top'>
    //     <i className='fas fa-arrow-up'></i>
    //     <h4>Chart</h4>
    //     <h5 className='count'>2/10</h5>
    //     </div>
    //     <div className='skip' onClick={()=>{setChart();Tutorial(account,tutorialCnt+1);}}>Next</div>
    //     </Modal>
    // )}
    
    // if(limitOrderBook){
    //     return(
    //     <Modal
    //     appElement={document.getElementById('root') || undefined}
    //     onRequestClose={()=>{setLimitOrderBook();Tutorial(account,tutorialCnt+1)}}
    //     isOpen={limitOrderBook}
    //     style={modalStyle}
    //     className="welcome_tutorial_limit_order_book" onClick={() => setLimitOrderBook()} onFocus={document.body.style.overflow='hidden'}>
    //     <div className='welcome_tutorial_top'>
    //     <h4>Limit Order Book</h4>
    //     <i className='fas fa-arrow-up'></i>
    //     </div>
    //     <h5 className='count'>3/10</h5>
    //     <div className='skip' onClick={()=>{setLimitOrderBook();Tutorial(account,tutorialCnt+1);}}>Next</div>
    //     </Modal>
    // )}
    // if(order){
    //     return(
    //     <Modal
    //     appElement={document.getElementById('root') || undefined}
    //     onRequestClose={()=>{setOrder();Tutorial(account,tutorialCnt+1)}}
    //     isOpen={order}
    //     style={modalStyle}
    //     className="welcome_tutorial_order" onClick={() => setOrder()} onFocus={document.body.style.overflow='hidden'}>
    //     <div className='welcome_tutorial_top'>
    //     <h4>Order</h4>
    //     <i className='fas fa-arrow-up'></i>
    //     </div>
    //     <h5 className='count'>4/10</h5>
    //     <div className='skip' onClick={()=>{setOrder();Tutorial(account,tutorialCnt+1);}}>Next</div>
    //     </Modal>
    // )}
    // if(publicDisclosure){
    //     return(
    //     <Modal
    //     appElement={document.getElementById('root') || undefined}
    //     onRequestClose={()=>{setPublicDisclosure();Tutorial(account,tutorialCnt+1)}}
    //     isOpen={publicDisclosure}
    //     style={modalStyle}
    //     className="welcome_tutorial_public_disclosure" onClick={() => setPublicDisclosure()} onFocus={document.body.style.overflow='hidden'}>
    //     <div className='welcome_tutorial_top'>
    //     <h4>Public Disclosure</h4>
    //     <i className='fas fa-arrow-left'></i>
    //     </div>
    //     <h5 className='count'>5/10</h5>
    //     <div className='skip' onClick={()=>{setPublicDisclosure();Tutorial(account,tutorialCnt+1);}}>Next</div>
    //     </Modal>
    // )}
    // if(assets){
    //     return(
    //     <Modal
    //     appElement={document.getElementById('root') || undefined}
    //     onRequestClose={()=>{setAssets();Tutorial(account,tutorialCnt+1)}}
    //     isOpen={assets}
    //     style={modalStyle}
    //     className="welcome_tutorial_assets" onClick={() => setAssets()} onFocus={document.body.style.overflow='hidden'}>
    //     <div className='welcome_tutorial_top'>
    //     <h4>Assets</h4>
    //     <i className='fas fa-arrow-up'></i>
    //     </div>
    //     <h5 className='count'>6/10</h5>
    //     <div className='skip' onClick={()=>{setAssets();Tutorial(account,tutorialCnt+1);}}>Next</div>
    //     </Modal>
    // )}
    // if(history){
    //     return(
    //     <Modal
    //     appElement={document.getElementById('root') || undefined}
    //     onRequestClose={()=>{setHistory();Tutorial(account,tutorialCnt+1)}}
    //     isOpen={history}
    //     style={modalStyle}
    //     className="welcome_tutorial_history" onClick={() => setHistory()} onFocus={document.body.style.overflow='hidden'}>
    //     <div className='welcome_tutorial_top'>
    //     <h4>History</h4>
    //     <i className='fas fa-arrow-down'></i>
    //     </div>
    //     <h5 className='count'>7/10</h5>
    //     <div className='skip' onClick={()=>{setWallet();Tutorial(account,tutorialCnt+1);}}>Next</div>
    //     </Modal>
    // )}
    // if(isAccount){
    //     return(
    //     <Modal
    //     appElement={document.getElementById('root') || undefined}
    //     onRequestClose={()=>{setIsAccount();Tutorial(account,tutorialCnt+1)}}
    //     isOpen={isAccount}
    //     style={modalStyle}
    //     className="welcome_tutorial_account" onClick={() => setIsAccount()} onFocus={document.body.style.overflow='hidden'}>
    //     <div className='welcome_tutorial_top'>
    //     <h4>Account</h4>
    //     <i className='fas fa-arrow-down'></i>
    //     </div>
    //     <h5 className='count'>8/10</h5>
    //     <div className='skip' onClick={()=>{setWallet();Tutorial(account,tutorialCnt+1);}}>Next</div>
    //     </Modal>
    // )}

    // if(faucet){
    //     return(
    //     <Modal
    //     appElement={document.getElementById('root') || undefined}
    //     onRequestClose={()=>{setFaucet();Tutorial(account,tutorialCnt+1)}}
    //     isOpen={faucet}
    //     style={modalStyle}
    //     className="welcome_tutorial_faucet" onClick={() => setFaucet()} onFocus={document.body.style.overflow='hidden'}>
    //     <div className='welcome_tutorial_top'>
    //     <h4>Faucet</h4>
    //     <i className='fas fa-arrow-right'></i>
    //     </div>
    //     <h5 className='count'>9/10</h5>
    //     <div className='skip' onClick={()=>{setWallet();Tutorial(account,tutorialCnt+1);}}>Next</div>
    //     </Modal>
    // )}
    // if(transaction){
    //     return(
    //     <Modal
    //     appElement={document.getElementById('root') || undefined}
    //     onRequestClose={()=>{setTransaction();Tutorial(account,tutorialCnt+1)}}
    //     isOpen={transaction}
    //     style={modalStyle}
    //     className="welcome_tutorial_transaction" onClick={() => setTransaction()} onFocus={document.body.style.overflow='hidden'}>
    //     <div className='welcome_tutorial_top'>
    //     <h4>Transaction</h4>
    //     <i className='fas fa-arrow-up'></i>
    //     </div>
    //     <h5 className='count'>10/10</h5>
    //     <div className='skip' onClick={()=>{setWallet();Tutorial(account,tutorialCnt+1);}}>Next</div>
    //     </Modal>
    // )}
    
    // if(tutorialFinished){
    //     return(
    //     <Modal
    //     appElement={document.getElementById('root') || undefined}
    //     onRequestClose={()=>{setTutorialFinished();Tutorial(account,tutorialCnt+1)}}
    //     isOpen={tutorialFinished}
    //     style={modalStyle}
    //     className="welcome_tutorial_tutorial_finished" onClick={() => {setTutorialFinished();Tutorial(account,tutorialCnt+1)}} >
    //     <h2>Tutorial Finished!</h2>
    //     <img  onClick={() => {setTutorialFinished();Tutorial(account,tutorialCnt+1)}} className="congratulations" src={require('../assets/images/congratulations.jpeg')} alt="img"></img>
    //     <h5 onClick={() => {setTutorialFinished();Tutorial(account,tutorialCnt+1)}} >Now Get Your Security Token</h5>
    //     <h4 onClick={() => {setTutorialFinished();Tutorial(account,tutorialCnt+1)}} >Trading Start!</h4>
    //     </Modal>
    // )}
}
export default Welcome