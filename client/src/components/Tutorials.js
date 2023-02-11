import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import {Tutorial} from '../apis/user'
const Tutorials =({tutorialCnt, account,faucetBtn,setUserModalIsOpen,setPdModalIsOpen})=>{
    const [start, setStart] = useState(true)
    const [wallet, setWallet] = useState(true)
    const [chart, setChart] = useState(true)
    const [limitOrderBook, setLimitOrderBook] = useState(true)
    const [order, setOrder] = useState(true)
    const [history, setHistory] = useState(true)
    const [assets, setAssets] = useState(true)
    const [publicDisclosure, setPublicDisclosure] = useState(true)
    const [isAccount, setIsAccount] = useState(true)
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
// console.log(account,tutorialCnt)
    const skipHandler = () => {
        setStart(false)
        setWallet(false)
        setChart(false)
        setLimitOrderBook(false)
        setOrder(false)
        setHistory(false)
        setAssets(false)
        setPublicDisclosure(false)
        setIsAccount(false)
        setFaucet(false)
        setTransaction(false)
        setTutorialFinished(false)
    }    
    // account={account===typeof 'string'?account:0}
    // tutorialCnt={isEnroll.cnt===typeof 'number'?isEnroll.cnt:0}


    window.scrollTo({
        top:0,
        behavior:'smooth'
    })
    if(start){
        return (
            <Modal
            appElement={document.getElementById('root') || undefined}
            //onRequestClose={()=>{setStart()}}
            isOpen={start}
            style={modalStyle}
            className="welcome_tutorial" onFocus={document.body.style.overflow='hidden'}>
            <div className='welcome_tutorial_top' >
            <h2>Welcome to Entasis</h2> <br/>
            </div>
            <img onClick={() => {setStart();}} className="congratulations"  src={require('../assets/images/welcome_1.gif')} alt="welcome"/>
                <h5>For Trading</h5> 
                <h5>Follow this Tutorial</h5>
            <h5 className='count'>1/10</h5>
            <div className='skip' onClick={skipHandler}>Skip</div>
            <div className='next' onClick={()=>setStart()}>Next</div>
            </Modal>
        )}
    
    if(wallet){

    return (
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setWallet()}}
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
        <h5 className='count' >1/10</h5>
        <h5 className='skip' onClick={skipHandler}>Skip</h5>
        <div className='next' onClick={()=>setWallet()}>Next</div>
        </Modal>
    )}


    if(chart){
        return (
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setChart()}}
        isOpen={chart}
        style={modalStyle}
        className="welcome_tutorial_chart" onClick={()=>setChart()} onFocus={document.body.style.overflow='hidden'}>
        <div className='welcome_tutorial_top'>
        <i className='fas fa-arrow-up'></i>
        <h4>Chart</h4>
        </div>
        <div className='chart_body'>
            <img className='chart_img' src={require('../assets/images/chart.gif')}/>
        </div>
        <div className='chart_foot'>
        <h5>Key Takeaways</h5>
        <h6>Bar and candlestick charts show the open, high, low, and last/closing price for a particular time frame.
            A line chart shows just the closing price for a time frame.
            Time frames for the charts may be based on time, ticks (number of transactions), volume, or price.
        </h6>
        </div>
        <h5 className='count' >2/10</h5>
        <h5 className='skip' onClick={skipHandler}>Skip</h5>
        <div className='next' onClick={()=>setChart()}>Next</div>
        </Modal>
    )}
    
    if(limitOrderBook){
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setLimitOrderBook()}}
        isOpen={limitOrderBook}
        style={modalStyle}
        className="welcome_tutorial_limit_order_book" onClick={() => setLimitOrderBook()} onFocus={document.body.style.overflow='hidden'}>
        <div className='welcome_tutorial_top'>
        <h4>Limit Order Book</h4>
        <i className='fas fa-arrow-up'></i>
        </div>

        <div className='welcome_tutorial_body'>
            <h5>KEY TAKEAWAYS</h5>
            <h6>A limit order book is a record of outstanding limit orders maintained by the security specialist who works at the exchange.</h6>
            <h6>A limit order is a type of order to buy or sell a security at a specific price or better.</h6>
            <h6>When a limit order for a security is entered, it is kept on record by the security specialist.</h6>

        </div>
        <h5 className='count' >3/10</h5>
        <h5 className='skip' onClick={skipHandler}>Skip</h5>
        <div className='next' onClick={()=>{setLimitOrderBook();}}>Next</div>
        </Modal>
    )}
    if(order){
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setOrder()}}
        isOpen={order}
        style={modalStyle}
        className="welcome_tutorial_order" onClick={() => setOrder()} onFocus={document.body.style.overflow='hidden'}>
        <div className='welcome_tutorial_top'>
        <h4>Market Order</h4>
        <i className='fas fa-arrow-up'></i>
        </div>
        <br/>   
        <img src={require('../assets/images/order.gif')}/>

        <div>
        <h6>
            A market order is an order to buy or sell a stock at the market's current best available price. A market order typically ensures an execution, but it does not guarantee a specified price. 
        </h6>
        </div>

        <h5 className='count' >4/10</h5>
        <h5 className='skip' onClick={skipHandler}>Skip</h5>
        <div className='next' onClick={()=>{setOrder();}}>Next</div>
        </Modal>
    )}
    if(publicDisclosure){
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setPublicDisclosure()}}
        isOpen={publicDisclosure}
        style={modalStyle}
        className="welcome_tutorial_public_disclosure" onClick={() => setPublicDisclosure()} onFocus={document.body.style.overflow='hidden'}>
        <div className='welcome_tutorial_top'>
        {setPdModalIsOpen(true)}

        <h4>Public Disclosure</h4>
        <i className='fas fa-arrow-left'></i>
        </div>
        <div>
            <h6>A public disclosure is any non-confidential communication which an inventor or invention owner makes to one or more members of the public, revealing the existence of the invention and enabling an appropriately experienced individual to reproduce the invention.</h6>
        </div>
        <h5 className='count' >5/10</h5>
        <h5 className='skip' onClick={skipHandler}>Skip</h5>
        <div className='next' onClick={()=>{setPublicDisclosure();setPdModalIsOpen(false);}}>Next</div>
        </Modal>
    )}
    if(assets){
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setAssets()}}
        isOpen={assets}
        style={modalStyle}
        className="welcome_tutorial_assets" onClick={() => setAssets()} onFocus={document.body.style.overflow='hidden'}>
        {setUserModalIsOpen(true)}
        <div className='welcome_tutorial_top'>
        <h4>MyAccount</h4>
        <i className='fas fa-arrow-right'></i>
        </div>
        <div>
            <h6>Manage Your Assets and Exercise your Voting Rights here.</h6>
        </div>
        <h5 className='count' >6/10</h5>
        <h5 className='skip' onClick={skipHandler}>Skip</h5>
        <div className='next' onClick={()=>{setAssets();setUserModalIsOpen(false);}}>Next</div>
        </Modal>
    )}
    if(history){
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setHistory()}}
        isOpen={history}
        style={modalStyle}
        className="welcome_tutorial_history" onClick={() => setHistory()} onFocus={document.body.style.overflow='hidden'}>
        <div className='welcome_tutorial_top'>
        <h4>History</h4>
        <i className='fas fa-arrow-down'></i>
        </div>
        <div>
            <h6>Check Your Records of Trading</h6>
            <h6>And Dividend Income here.</h6>
            <h6>Orders, Transaction Hash, Date</h6>
        </div>
        <h5 className='count' >7/10</h5>
        <h5 className='skip' onClick={skipHandler}>Skip</h5>
        <div className='next' onClick={()=>{setHistory()}}>Next</div>
        </Modal>
    )}
    if(isAccount){
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setIsAccount()}}
        isOpen={isAccount}
        style={modalStyle}
        className="welcome_tutorial_account" onClick={() => setIsAccount()} onFocus={document.body.style.overflow='hidden'}>
        <div className='welcome_tutorial_top'>
        <h4>Account</h4>
        <i className='fas fa-arrow-down'></i>
        </div>
        <div>
            <h6>Check Your Assets Detail.</h6>
            <h6>Dividend Income, Asset Amount, Current Price</h6>
            <h6>And Market Data</h6>
        </div>

        <h5 className='count' >8/10</h5>
        <h5 className='skip' onClick={skipHandler}>Skip</h5>
        <div className='next' onClick={()=>{setIsAccount();}}>Next</div>
        </Modal>
    )}

    if(faucet){
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setFaucet()}}
        isOpen={faucet}
        style={modalStyle}
        className="welcome_tutorial_faucet" onClick={() => setFaucet()} onFocus={document.body.style.overflow='hidden'}>
        <div className='welcome_tutorial_top'>
        <h4>Faucet</h4>
        <i className='fas fa-arrow-right'></i>
        </div>
        <div>
            <h6>This Button gives you 50.00 ETH</h6>
            <h6 onClick={()=>faucetBtn(account)}>Faucet</h6>
        </div>
        <h5 className='count' >9/10</h5>
        <h5 className='skip' onClick={skipHandler}>Skip</h5>
        <div className='next' onClick={()=>setFaucet()}>Next</div>
        </Modal>
    )}
    if(transaction){
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setTransaction()}}
        isOpen={transaction}
        style={modalStyle}
        className="welcome_tutorial_transaction" onClick={() => setTransaction()} onFocus={document.body.style.overflow='hidden'}>
        <div className='welcome_tutorial_top'>
        <h4>Transactions</h4>
        <i className='fas fa-arrow-up'></i>
        </div>
        <div>
            <h6>All Trades are Recorded in Transaction.</h6>
            <h6>Dividend Income, Asset Amount, Current Price</h6>
            <h6>And Market Data</h6>
        </div>

        <h5 className='count' >10/10</h5>
        <h5 className='skip' onClick={skipHandler}>Skip</h5>
        <div className='next' onClick={()=>{setTransaction();}}>Next</div>
        </Modal>
    )}

    if(tutorialFinished){
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setTutorialFinished();Tutorial(account,1)}}
        isOpen={tutorialFinished}
        style={modalStyle}
        className="welcome_tutorial_tutorial_finished" onClick={() => {setTutorialFinished();Tutorial(account,1)}} >
        <h2>Tutorial Finished!</h2>
        <img  onClick={() => {setTutorialFinished();Tutorial(account,1)}} className="congratulations" src={require('../assets/images/congratulations.jpeg')} alt="img"></img>
        <h5 onClick={() => {setTutorialFinished();Tutorial(account,1)}} >Now Get Your Security Token</h5>
        <h4 onClick={() => {setTutorialFinished();Tutorial(account,1)}} >Trading Start!</h4>
        </Modal>
        
    )}
}
export default Tutorials