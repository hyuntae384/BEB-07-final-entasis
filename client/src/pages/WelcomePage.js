import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import {Tutorial} from '../apis/user'
const Welcome =({isLoading, tutorialCnt})=>{
    const [welcomeClose, setWelcomeClose] = useState(false)
    const [start, setStart] = useState(true)
    const [wallet, setWallet] = useState(true)
    const [chart, setChart] = useState(true)
    const [limitOrderBook, setLimitOrderBook] = useState(true)
    const [order, setOrder] = useState(true)
    const [history, setHistory] = useState(true)
    const [assets, setAssets] = useState(true)
    const [publicDisclosure, setPublicDisclosure] = useState(true)
    const [account, setAccount] = useState(true)
    const [faucet, setFaucet] = useState(true)
    const [transaction, setTransaction] = useState(true)
    const [tutorialFinished, setTutorialFinished] = useState(true)

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

    const skipHandler = () => {
        setWallet(false)
        setChart(false)
        setLimitOrderBook(false)
        setOrder(false)
        setHistory(false)
        setAssets(false)
        setPublicDisclosure(false)
        setAccount(false)
        setFaucet(false)
        setTransaction(false)
        setTutorialFinished(false)
    }    
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
    else if(start&&tutorialCnt===12){
        Tutorial(account,tutorialCnt-1)

        return (
            <Modal
            appElement={document.getElementById('root') || undefined}
            onRequestClose={()=>setStart()}
            isOpen={start}
            style={modalStyle}
            className="welcome_tutorial" onFocus={document.body.style.overflow='hidden'}>
            <div className='welcome_tutorial_top' >
            <h2>Welcome to Entasis</h2> <br/>
            </div>
            <img  onClick={() => setStart()} className="congratulations"  src={require('../assets/images/welcome_1.gif')} alt="welcome"/>
                <h5>For Trading</h5> 
                <h5>Follow this Tutorial</h5>
            <h5 className='count'>1/10</h5>
            <div className='skip' onClick={()=>setStart()}>Next</div>
            </Modal>
        )}
    
    else if(wallet&&tutorialCnt===11){
        Tutorial(account,tutorialCnt-1)

    return (
        <Modal
        appElement={document.getElementById('root') || undefined}
        onRequestClose={()=>setWallet()}
        isOpen={wallet}
        style={modalStyle}
        className="welcome_tutorial_wallet" onFocus={document.body.style.overflow='hidden'}>
        <div className='welcome_tutorial_top' >
        <h4>Register your wallet</h4> <br/>
        <i className='fas fa-arrow-up'></i>
        </div>
        <div className='welcome_tutorial_wallet_body'>
            <h5>Connect Your</h5> 
            <h5>MataMask Wallet</h5>
        </div>
        <h5 className='count'>1/10</h5>
        <div className='skip' onClick={()=>setWallet()}>Next</div>
        </Modal>
    )}
    else if(chart&&tutorialCnt===10){
        Tutorial(account,tutorialCnt-1)
        return (
        <Modal
        appElement={document.getElementById('root') || undefined}
        onRequestClose={()=>setChart()}
        isOpen={chart}
        style={modalStyle}
        className="welcome_tutorial_chart" onClick={()=>setChart()} onFocus={document.body.style.overflow='hidden'}>
        <div className='welcome_tutorial_top'>
        <i className='fas fa-arrow-up'></i>
        <h4>Chart</h4>
        <h5 className='count'>2/10</h5>
        </div>
        <div className='skip' onClick={()=>setChart()}>Next</div>
        </Modal>
    )}
    
    else if(limitOrderBook&&tutorialCnt===9){
        Tutorial(account,tutorialCnt-1)
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        onRequestClose={()=>setLimitOrderBook()}
        isOpen={limitOrderBook}
        style={modalStyle}
        className="welcome_tutorial_limit_order_book" onClick={() => setLimitOrderBook()} onFocus={document.body.style.overflow='hidden'}>
        <div className='welcome_tutorial_top'>
        <h4>Limit Order Book</h4>
        <i className='fas fa-arrow-up'></i>
        </div>
        <h5 className='count'>3/10</h5>
        <div className='skip' onClick={()=>setLimitOrderBook()}>Next</div>
        </Modal>
    )}
    else if(order&&tutorialCnt===8){
        Tutorial(account,tutorialCnt-1)
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        onRequestClose={()=>setOrder()}
        isOpen={order}
        style={modalStyle}
        className="welcome_tutorial_order" onClick={() => setOrder()} onFocus={document.body.style.overflow='hidden'}>
        <div className='welcome_tutorial_top'>
        <h4>Order</h4>
        <i className='fas fa-arrow-up'></i>
        </div>
        <h5 className='count'>4/10</h5>
        <div className='skip' onClick={()=>setOrder()}>Next</div>
        </Modal>
    )}
    else if(publicDisclosure&&tutorialCnt===7){
        Tutorial(account,tutorialCnt-1)
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        onRequestClose={()=>setPublicDisclosure()}
        isOpen={publicDisclosure}
        style={modalStyle}
        className="welcome_tutorial_public_disclosure" onClick={() => setPublicDisclosure()} onFocus={document.body.style.overflow='hidden'}>
        <div className='welcome_tutorial_top'>
        <h4>Public Disclosure</h4>
        <i className='fas fa-arrow-left'></i>
        </div>
        <h5 className='count'>5/10</h5>
        <div className='skip' onClick={()=>setPublicDisclosure()}>Next</div>
        </Modal>
    )}
    else if(assets&&tutorialCnt===6){
        Tutorial(account,tutorialCnt-1)
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        onRequestClose={()=>setAssets()}
        isOpen={assets}
        style={modalStyle}
        className="welcome_tutorial_assets" onClick={() => setAssets()} onFocus={document.body.style.overflow='hidden'}>
        <div className='welcome_tutorial_top'>
        <h4>Assets</h4>
        <i className='fas fa-arrow-up'></i>
        </div>
        <h5 className='count'>6/10</h5>
        <div className='skip' onClick={()=>setAssets()}>Next</div>
        </Modal>
    )}
    else if(history&&tutorialCnt===5){
        Tutorial(account,tutorialCnt-1)
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        onRequestClose={()=>setHistory()}
        isOpen={history}
        style={modalStyle}
        className="welcome_tutorial_history" onClick={() => setHistory()} onFocus={document.body.style.overflow='hidden'}>
        <div className='welcome_tutorial_top'>
        <h4>History</h4>
        <i className='fas fa-arrow-down'></i>
        </div>
        <h5 className='count'>7/10</h5>
        <div className='skip' onClick={()=>setWallet()}>Next</div>
        </Modal>
    )}
    else if(account&&tutorialCnt===4){
        Tutorial(account,tutorialCnt-1)
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        onRequestClose={()=>setAccount()}
        isOpen={account}
        style={modalStyle}
        className="welcome_tutorial_account" onClick={() => setAccount()} onFocus={document.body.style.overflow='hidden'}>
        <div className='welcome_tutorial_top'>
        <h4>Account</h4>
        <i className='fas fa-arrow-down'></i>
        </div>
        <h5 className='count'>8/10</h5>
        <div className='skip' onClick={()=>setWallet()}>Next</div>
        </Modal>
    )}

    else if(faucet&&tutorialCnt===3){
        Tutorial(account,tutorialCnt-1)
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        onRequestClose={()=>setFaucet()}
        isOpen={faucet}
        style={modalStyle}
        className="welcome_tutorial_faucet" onClick={() => setFaucet()} onFocus={document.body.style.overflow='hidden'}>
        <div className='welcome_tutorial_top'>
        <h4>Faucet</h4>
        <i className='fas fa-arrow-right'></i>
        </div>
        <h5 className='count'>9/10</h5>
        <div className='skip' onClick={()=>setWallet()}>Next</div>
        </Modal>
    )}
    else if(transaction&&tutorialCnt===2){
        Tutorial(account,tutorialCnt-1)
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        onRequestClose={()=>setTransaction()}
        isOpen={transaction}
        style={modalStyle}
        className="welcome_tutorial_transaction" onClick={() => setTransaction()} onFocus={document.body.style.overflow='hidden'}>
        <div className='welcome_tutorial_top'>
        <h4>Transaction</h4>
        <i className='fas fa-arrow-up'></i>
        </div>
        <h5 className='count'>10/10</h5>
        <div className='skip' onClick={()=>setWallet()}>Next</div>
        </Modal>
    )}
    
    else if(tutorialFinished&&tutorialCnt===1){
        Tutorial(account,tutorialCnt-1)
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        onRequestClose={()=>setTutorialFinished()}
        isOpen={tutorialFinished}
        style={modalStyle}
        className="welcome_tutorial_tutorial_finished" onClick={() => setTutorialFinished()} >
        <h2>Tutorial Finished!</h2>
        <img  onClick={() => setTutorialFinished()} className="congratulations" src={require('../assets/images/congratulations.jpeg')} alt="img"></img>
        <h5 onClick={() => setTutorialFinished()} >Now Get Your Security Token</h5>
        <h4 onClick={() => setTutorialFinished()} >Trading Start!</h4>
        </Modal>
    )}
}
export default Welcome