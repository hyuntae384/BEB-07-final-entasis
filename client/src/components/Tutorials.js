import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import {Tutorial} from '../apis/user'
const Tutorials =({account,faucetBtn,setUserModalIsOpen,setPdModalIsOpen,setCntHandler,cntHandler,tutorialCnt,myPage})=>{
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
    const [vote, setVote] = useState(true)
    const [transaction, setTransaction] = useState(true)
    const [circuitBreaker, setCircuitBreaker] = useState(true)
    const [tutorialFinished, setTutorialFinished] = useState(true)
    const [tutorialScroll,setTutorialScroll]=useState(0)
    const [isFaucetModalOpen,setIsFaucetModalOpen]=useState(false);

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
    const modalStyle_2 = {
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
            background: "#222223",
            overflow: "hidden",
            top: "15%",
            left: "33%",
            right: "33%",
            bottom: "15%",
            border:"0",
            borderRadius: "20px",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            zIndex: 10,
            opacity:0.9
        },
    };

    useEffect(()=>{

        if(cntHandler||tutorialCnt===0){
            setTutorialScroll(1)
            document.body.style.overflow='hidden'
            setStart(true)
            setWallet(true)
            setChart(true)
            setLimitOrderBook(true)
            setOrder(true)
            setHistory(true)
            setAssets(true)
            setPublicDisclosure(true)
            setIsAccount(true)
            setFaucet(true)
            setTransaction(true)
            setCircuitBreaker(true)
            setTutorialFinished(true)
            setVote(true)
        }
        console.log(cntHandler)

    },[account,tutorialCnt,cntHandler])

    const skipHandler = () => {
        setTutorialScroll(0)
        document.body.style.overflow='unset'
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
        setCircuitBreaker(false)
        setTutorialFinished(false)
        setVote(false)
        setCntHandler(false)
        Tutorial(account,1)

    }    
    // account={account===typeof 'string'?account:0}
    // tutorialCnt={isEnroll.cnt===typeof 'number'?isEnroll.cnt:0}
console.log()
    
    // console.log(document.body.style.overflow,tutorialCnt)
if(tutorialScroll>0){
    document.body.style.overflow='hidden'

    if(Math.ceil(tutorialScroll)===1){
        window.onwheel = function (e) {
            e.deltaY> 0
            ? setTutorialScroll(tutorialScroll < 1 ? tutorialScroll + 0 : tutorialScroll - 0.05)
            : setTutorialScroll(tutorialScroll > 14 ? tutorialScroll + 0  : tutorialScroll + 0.05)
        }
        return (
            <Modal
            appElement={document.getElementById('root') || undefined}
            //onRequestClose={()=>{setStart()}}
            isOpen={start}
            style={modalStyle}
            className="welcome_tutorial"
            >
            <div className='welcome_tutorial_top' >
            <h2>Welcome to Entasis</h2> <br/>
            </div>

            <img onClick={() => {setStart();window.scrollTo({
                top:0,
                behavior:'smooth'
            })}} className="congratulations"  src={require('../assets/images/scroll.gif')} alt="welcome"/>
            
                <h5>For Trading</h5> 
                <h5>Follow this Tutorial</h5>
            <h5 className='count'>1/10</h5>
            {/* <div className='skip' onClick={()=>{skipHandler();}}>Skip</div> */}
            <div className='next' onClick={()=>{document.body.style.overflow='unset';setTutorialScroll(tutorialScroll+1);setStart()}}>Next</div>
            </Modal>
        )}
    
    if(Math.ceil(tutorialScroll)===2){
        window.onwheel = function (e) {
            e.deltaY> 0
            ? setTutorialScroll(tutorialScroll < 0 ? tutorialScroll + 0 : tutorialScroll - 0.05)
            : setTutorialScroll(tutorialScroll > 14 ? tutorialScroll + 0  : tutorialScroll + 0.05)
        }

    return (
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setWallet()}}
        isOpen={wallet}
        style={modalStyle}
        className="welcome_tutorial_wallet" >
        <div className='welcome_tutorial_top' >
        <h4>Register your wallet</h4> <br/>
        <i className='fas fa-arrow-up'></i>
        </div>
        <div className='welcome_tutorial_wallet_body'>
            <h5>Connect Your</h5> 
            <h5>MataMask Wallet</h5>
        </div>
        <h5 className='count' >1/10</h5>
                <h5 e='skip' onClick={()=>{skipHandler()}}>Skip</h5>

        <div className='next' onClick={()=>{document.body.style.overflow='unset';setTutorialScroll(tutorialScroll+1);setWallet()}}>Next</div>
        </Modal>
        )}


    if(Math.ceil(tutorialScroll)===3){

        return (
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setChart()}}
        isOpen={chart}
        style={modalStyle}
        className="welcome_tutorial_chart" onClick={()=>setChart()} >
            {window.onwheel = function (e) {
            e.deltaY> 0
            ? setTutorialScroll(tutorialScroll < 0 ? tutorialScroll + 0 : tutorialScroll - 0.05)
            : setTutorialScroll(tutorialScroll > 14 ? tutorialScroll + 0  : tutorialScroll + 0.05)
            }}
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
        {/* <h5 className='skip' onClick={()=>{skipHandler()}}>Skip</h5> */}

        <div className='next' onClick={()=>{document.body.style.overflow='unset';setTutorialScroll(tutorialScroll+1);setChart()}}>Next</div>
        </Modal>
        )}
    
    if(Math.ceil(tutorialScroll)===4){

        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setLimitOrderBook()}}
        isOpen={limitOrderBook}
        style={modalStyle}
        className="welcome_tutorial_limit_order_book" onClick={() => setLimitOrderBook()} >
            {window.onwheel = function (e) {
            e.deltaY> 0
            ? setTutorialScroll(tutorialScroll < 0 ? tutorialScroll + 0 : tutorialScroll - 0.05)
            : setTutorialScroll(tutorialScroll > 14 ? tutorialScroll + 0  : tutorialScroll + 0.05)
            }}

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
        {/* <h5 className='skip' onClick={()=>{document.body.style.overflow='unset';skipHandler()}}>Skip</h5> */}

        <div className='next' onClick={()=>{document.body.style.overflow='unset';setTutorialScroll(tutorialScroll+1);setLimitOrderBook();}}>Next</div>
        </Modal>
        )}

    if(Math.ceil(tutorialScroll)===5){

        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setOrder()}}
        isOpen={order}
        style={modalStyle}
        className="welcome_tutorial_order" onClick={() => setOrder()} >
            {window.onwheel = function (e) {
            e.deltaY> 0
            ? setTutorialScroll(tutorialScroll < 0 ? tutorialScroll + 0 : tutorialScroll - 0.05)
            : setTutorialScroll(tutorialScroll > 14 ? tutorialScroll + 0  : tutorialScroll + 0.05)
            }}

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
        {/* <h5 className='skip' onClick={()=>{document.body.style.overflow='unset';skipHandler()}}>Skip</h5> */}

        <div className='next' onClick={()=>{document.body.style.overflow='unset';setTutorialScroll(tutorialScroll+1);setOrder();}}>Next</div>
        </Modal>
        )}

    if(Math.ceil(tutorialScroll)===6){
        setPdModalIsOpen(true)
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setPublicDisclosure()}}
        isOpen={publicDisclosure}
        style={modalStyle}
        className="welcome_tutorial_public_disclosure" onClick={() => setPublicDisclosure()} >
            {window.onwheel = function (e) {
            e.deltaY> 0
            ? setTutorialScroll(tutorialScroll < 0 ? tutorialScroll + 0 : tutorialScroll - 0)
            : setTutorialScroll(tutorialScroll > 14 ? tutorialScroll + 0  : tutorialScroll + 0.05)
            }}

        <div className='welcome_tutorial_top'>

        <h4>Public Disclosure</h4>
        <i className='fas fa-arrow-left'></i>
        </div>
        <div>
            <h6>A public disclosure is any non-confidential communication which an inventor or invention owner makes to one or more members of the public, revealing the existence of the invention and enabling an appropriately experienced individual to reproduce the invention.</h6>
        </div>
        <h5 className='count' >5/10</h5>
        {/* <h5 className='skip' onClick={()=>{document.body.style.overflow='unset';skipHandler()}}>Skip</h5> */}

        <div className='next' onClick={()=>{document.body.style.overflow='unset';setTutorialScroll(tutorialScroll+1);setPdModalIsOpen(false);setPublicDisclosure();}}>Next</div>
        </Modal>
        )}else{setPdModalIsOpen(false)}


    if(Math.ceil(tutorialScroll)===7){
        setUserModalIsOpen(true)
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setAssets()}}
        isOpen={assets}
        style={modalStyle}
        className="welcome_tutorial_assets" onClick={() => setAssets()} >
            {window.onwheel = function (e) {
            e.deltaY> 0
            ? setTutorialScroll(tutorialScroll < 0 ? tutorialScroll + 0 : tutorialScroll - 0)
            : setTutorialScroll(tutorialScroll > 14 ? tutorialScroll + 0  : tutorialScroll + 0.05)
            }}


        <div className='welcome_tutorial_top'>
        <h4>MyAccount</h4>
        <i className='fas fa-arrow-right'></i>
        </div>
        <div>
            <h6>Manage Your Assets and Exercise your Voting Rights here.</h6>
        </div>
        <h5 className='count' >6/10</h5>
        {/* <h5 className='skip' onClick={()=>{document.body.style.overflow='unset';skipHandler();setUserModalIsOpen(false)}}>Skip</h5> */}

        <div className='next' onClick={()=>{document.body.style.overflow='unset';setTutorialScroll(tutorialScroll+1);setUserModalIsOpen(false);setAssets();}}>Next</div>
        </Modal>
        )}else{setUserModalIsOpen(false)}


    if(Math.ceil(tutorialScroll)===8){
        setUserModalIsOpen(true)
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setFaucet()}}
        isOpen={faucet}
        style={modalStyle}
        className="welcome_tutorial_faucet" onClick={() => setFaucet()} >
            {window.onwheel = function (e) {
            e.deltaY> 0
            ? setTutorialScroll(tutorialScroll < 0 ? tutorialScroll + 0 : tutorialScroll - 0)
            : setTutorialScroll(tutorialScroll > 14 ? tutorialScroll + 0  : tutorialScroll + 0.05)
            }}

        <div className='welcome_tutorial_top'>
        <h4>Faucet</h4>
        <i className='fas fa-arrow-right'></i>
        </div>
        <div>
            <h6>This Button gives you 50.00 ETH</h6>
            <img className='ethers' src={require('../assets/images/ethers.webp')} alt='ethers'/>
            <br/>
            <h4>Click Here!</h4>
            <h2 className='faucet_btn' onClick={()=>{faucetBtn(account);setIsFaucetModalOpen(true)}}>Faucet</h2>
        </div>
        <h5 className='count' >9/10</h5>
        {/* <h5 className='skip' onClick={()=>{document.body.style.overflow='unset';skipHandler();setUserModalIsOpen(false)}}>Skip</h5> */}
        {myPage!==undefined?
        <Modal
            appElement={document.getElementById('root') || undefined}
            onRequestClose={()=>setIsFaucetModalOpen(false)}

            isOpen={isFaucetModalOpen}
            style={modalStyle_2}
            className="welcome_tutorial_faucet_complete" onClick={() => setIsFaucetModalOpen(false)} onFocus={document.body.style.overflow='hidden'}
            >{
            <div className='welcome_connection'>
            <img src={require('../assets/images/ENTASIS.png')} alt='entasis'></img><br/>
            <img className='close' onClick={()=>setIsFaucetModalOpen(false)} src={require('../assets/images/close.png')} alt='close'></img><br/>
            <img className="congratulations" src={require('../assets/images/voted.gif')} alt='entasis'></img>
            <h4>Check Your 50.00ETH in Deposit</h4>
            </div>
            }
        </Modal>:<></>}

        <div className='next' onClick={()=>{document.body.style.overflow='unset';setTutorialScroll(tutorialScroll+1);setUserModalIsOpen(false);setFaucet();}}>Next</div>
        </Modal>
        )}else{setUserModalIsOpen(false)}


            {/* <div className='welcome_connection'>
            <img src={require('../assets/images/ENTASIS.png')} alt='entasis'></img>
            <img className='close' onClick={()=>setIsFaucetModalOpen(false)} src={require('../assets/images/close.png')} alt='close'></img>
            <img className="congratulations" src={require('../assets/images/no.gif')} alt='entasis'></img>
            <h4>You Already Got 50.00 ETH</h4>
            </div> */}

        if(Math.ceil(tutorialScroll)===9){
            setUserModalIsOpen(true)
            return(
            <Modal
            appElement={document.getElementById('root') || undefined}
            //onRequestClose={()=>{setFaucet()}}
            isOpen={vote}
            style={modalStyle}
            className="welcome_tutorial_vote" onClick={() => setFaucet()} >
                {window.onwheel = function (e) {
                e.deltaY> 0
                ? setTutorialScroll(tutorialScroll < 0 ? tutorialScroll + 0 : tutorialScroll - 0)
                : setTutorialScroll(tutorialScroll > 14 ? tutorialScroll + 0  : tutorialScroll + 0.05)
                }}
    
            <div className='welcome_tutorial_top'>
            <h4>Vote</h4>
            <i className='fas fa-arrow-right'></i>
            </div>
            <div>
                <h6>Exercise of Your Voting Rights</h6>
                <img className='ethers' src={require('../assets/images/vote.gif')} alt='ethers'/>
                <br/>
                <h4>You can exercise</h4> 
                <h4>your voting rights according to your stake.</h4>
            </div>
            <h5 className='count' >9/10</h5>
            {/* <h5 className='skip' onClick={()=>{document.body.style.overflow='unset';skipHandler();setUserModalIsOpen(false)}}>Skip</h5> */}
    
            <div className='next' onClick={()=>{document.body.style.overflow='unset';setTutorialScroll(tutorialScroll+1);setUserModalIsOpen(false);setFaucet();}}>Next</div>
            </Modal>
            )}else{setUserModalIsOpen(false)}
    

    if(Math.ceil(tutorialScroll)===10){

        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setHistory()}}
        isOpen={history}
        style={modalStyle}
        className="welcome_tutorial_history" onClick={() => setHistory()} >
            {window.onwheel = function (e) {
            e.deltaY> 0
            ? setTutorialScroll(tutorialScroll < 0 ? tutorialScroll + 0 : tutorialScroll - 0.05)
            : setTutorialScroll(tutorialScroll > 14 ? tutorialScroll + 0  : tutorialScroll + 0.05)
            }}

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
        {/* <h5 className='skip' onClick={()=>{document.body.style.overflow='unset';skipHandler()}}>Skip</h5> */}

        <div className='next' onClick={()=>{document.body.style.overflow='unset';setTutorialScroll(tutorialScroll+1);setHistory()}}>Next</div>
        </Modal>
        )}

    if(Math.ceil(tutorialScroll)===11){

        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setIsAccount()}}
        isOpen={isAccount}
        style={modalStyle}
        className="welcome_tutorial_account" onClick={() => setIsAccount()} >
            {window.onwheel = function (e) {
            e.deltaY> 0
            ? setTutorialScroll(tutorialScroll < 0 ? tutorialScroll + 0 : tutorialScroll - 0.05)
            : setTutorialScroll(tutorialScroll > 14 ? tutorialScroll + 0  : tutorialScroll + 0.05)
            }}

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
        {/* <h5 className='skip' onClick={()=>{document.body.style.overflow='unset';skipHandler()}}>Skip</h5> */}

        <div className='next' onClick={()=>{document.body.style.overflow='unset';setTutorialScroll(tutorialScroll+1);setIsAccount();}}>Next</div>
        </Modal>
        )}


    if(Math.ceil(tutorialScroll)===12){

        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setTransaction()}}
        isOpen={transaction}
        style={modalStyle}
        className="welcome_tutorial_transaction" onClick={() => setTransaction()} >
            {window.onwheel = function (e) {
            e.deltaY> 0
            ? setTutorialScroll(tutorialScroll < 0 ? tutorialScroll + 0 : tutorialScroll - 0.05)
            : setTutorialScroll(tutorialScroll > 14 ? tutorialScroll + 0  : tutorialScroll + 0.05)
            }}

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
        {/* <h5 className='skip' onClick={()=>{document.body.style.overflow='unset';skipHandler()}}>Skip</h5> */}

        <div className='next' onClick={()=>{document.body.style.overflow='unset';setTutorialScroll(tutorialScroll+1);setTransaction();}}>Next</div>
        </Modal>
        )}

    if(Math.ceil(tutorialScroll)===13){
        window.scrollTo({
            top:820,
            behavior: 'smooth'
        })
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setCircuitBreaker()}}
        isOpen={circuitBreaker}
        style={modalStyle}
        className="welcome_tutorial_circuit_breaker" onClick={() => setCircuitBreaker()}>
            {window.onwheel = function (e) {
            e.deltaY> 0
            ? setTutorialScroll(tutorialScroll < 0 ? tutorialScroll + 0 : tutorialScroll - 0.05)
            : setTutorialScroll(tutorialScroll > 14 ? tutorialScroll + 0  : tutorialScroll + 0.05)
            }}

        <div className='welcome_tutorial_top'>
        <h4>Circuit Breaker</h4>
        <i className='fas fa-arrow-right'></i>
        </div>
        <div>
            <h6>A trading curb (also known as a circuit breaker[1] in Wall Street parlance) is a financial regulatory instrument that is in place to prevent stock market crashes from occurring, and is implemented by the relevant stock exchange organization. Since their inception, circuit breakers have been modified to prevent both speculative gains and dramatic losses within a small time frame. When triggered, circuit breakers either stop trading for a small amount of time or close trading early in order to allow accurate information to flow among market makers and for institutional traders to assess their positions and make rational decisions.</h6>
        </div>

        <h5 className='count' >10/10</h5>
        {/* <h5 className='skip' onClick={()=>{document.body.style.overflow='unset';skipHandler()}}>Skip</h5> */}

        <div className='next' onClick={()=>{document.body.style.overflow='unset';setTutorialScroll(tutorialScroll+1);setCircuitBreaker();}}>Next</div>

        </Modal>
        )}



    if(Math.ceil(tutorialScroll)===14){
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        })
        return(
        <Modal
        appElement={document.getElementById('root') || undefined}
        //onRequestClose={()=>{setTutorialFinished();Tutorial(account,1)}}
        isOpen={tutorialFinished}
        style={modalStyle}
        className="welcome_tutorial_tutorial_finished" onClick={() => {Tutorial(account,1);setCntHandler(false);document.body.style.overflow='unset';setTutorialScroll(0);setTutorialFinished();}} >
        {window.onwheel = function (e) {
            document.body.style.overflow='unset'
            e.deltaY> 0
            ? setTutorialScroll(tutorialScroll < 0 ? tutorialScroll + 0 : tutorialScroll - 0)
            : setTutorialScroll(tutorialScroll > 14 ? tutorialScroll + 0  : tutorialScroll + 0)
            }}
        <img  onClick={() => {Tutorial(account,1);setCntHandler(false);setTutorialScroll(0);setTutorialFinished();}} className="close" src={require('../assets/images/close.png')} alt="img"></img>

        <h2>Tutorial Finished!</h2>
        <img  onClick={() => {Tutorial(account,1);setCntHandler(false);setTutorialScroll(0);setTutorialFinished();}} className="congratulations" src={require('../assets/images/congratulations.jpeg')} alt="img"></img>
        <h5 onClick={() => {Tutorial(account,1);setCntHandler(false);setTutorialScroll(0);setTutorialFinished();}} >Now Get Your Security Token</h5>
        <h4 onClick={() => {Tutorial(account,1);setCntHandler(false);setTutorialScroll(0);setTutorialFinished();}} >Trading Start!</h4>
        </Modal>
        
        )}
    }else{return;}
}

export default Tutorials