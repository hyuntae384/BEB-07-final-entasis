import {Link} from 'react-router-dom';
import {useState} from 'react'
import Modal from "react-modal"
import '../assets/css/main.css';
import { ChName, Score, Position} from '../apis/user'
import Tutorials from './Tutorials';
import SelectBox from './Select';
import axios from 'axios';
import Welcome from '../pages/TransactionsPage';

// import {Vote} from '../apis/company'
const Header =({walletConnected,setWalletConnected,totalCurrentPrices,stName,setStName,companyPD,OPTIONS,active,handleConnect,isEnroll,account,setEditName,editName,setEditNameValue,Change,isFaucet,faucetBtn,dividendTimeLimit,setVoted,voted,ratio,setRatio
})=> {
    const [userModalIsOpen, setUserModalIsOpen] = useState(false)

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
            background: "#222223",
            overflow: "hidden",
            top: "0",
            left: "80%",
            right: "0",
            bottom: "0",
            border:"0",
            borderRadius: "0",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            zIndex: 10,
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
    

    let data ={
        name:'', 
        assets:{
        total:'', 
        st:[{st_name:'',st_price:'',st_amount:''},
        {st_name:'',st_price:'',st_amount:''},
        {st_name:'',st_price:'',st_amount:''},]},
        deposit:{is_fauceted : true || false,}}

    const userModalOpen =()=>{
        document.body.style.overflow = 'hidden';
        setUserModalIsOpen(true)
        }
    const userModalClose =()=>{
        document.body.style.overflow = 'unset';
        setUserModalIsOpen(false)
        }

    return(
        <div className="header">
        
            <Link to='/'>
                <img src={require('../assets/images/logo.png')}></img>
            </Link>
            <Link to='/'>
                <img className='entasis_main_logo' src={require('../assets/images/ENTASIS.png')}></img>
            </Link>
            <div className='header_user'>
            <div className="btn" onClick={handleConnect}>{active ? <h2>disconnect</h2> : <h2>connect</h2>}</div>
            {active&&isEnroll.cnt===0?<Tutorials
                    account={account}
                    tutorialCnt={isEnroll.cnt}
                    >{()=>setWalletConnected()}</Tutorials>
                    :<Modal
                    appElement={document.getElementById('root') || undefined}
                    onRequestClose={()=>setWalletConnected()}
                    isOpen={walletConnected}
                    style={modalStyle_2}
                    >             
                    <div className='welcome_connection'>
                    <h3>Welcome</h3>
                    <img src={require('../assets/images/ENTASIS_white.png')} alt='entasis'></img>
                    </div>
                    <img className="congratulations" src={require('../assets/images/welcome_connection.gif')} alt='entasis'></img>
                    <h2>Connection Information</h2>
                    <h4>Name : {isEnroll.name}</h4>
                    <h4>Tutorials : {isEnroll.cnt<=1?"Complete":"Not Complete Yet"}</h4>
                    <h4>Account : {account===undefined?'Disconnected':account}</h4>
                    </Modal>}
                {active?
                <i className='fas fa-wallet' onClick={()=>userModalOpen()} ></i>:
                <div onClick={handleConnect} className='fa-wallet_disconnect'></div>}
            </div>
            <Modal
                appElement={document.getElementById('root') || undefined}
                onRequestClose={()=>userModalClose()}
                isOpen={userModalIsOpen}
                style={modalStyle}
            >   <div className='myaccount'>
                    <div className='close' onClick={()=>userModalClose()}>
                        <img src={require('../assets/images/close.png')}></img>
                    </div>
                    <div className='account_top'>
                        <h1>MyAccount</h1>
                    </div>
                    <div className='myaccount_wrapper'>
                        <div className='myaccount_wrapper_name_top'>
                            <h2>Name</h2>
                            <div className='btn' onClick={()=>setEditName(!editName)}><h6>Edit</h6></div>
                        </div>
                            {editName?
                            <div className='edit_name'>
                                <input onChange={(e)=>setEditNameValue(e.target.value)} onKeyPress={(e)=>
                                e.key === "Enter"? Change():<></>
                                }></input>
                                <div className='edit_name_close'>
                                    <img src={require('../assets/images/ok.png')} alt='ok'
                                    onClick={()=>{Change()}}></img>
                                    <img src={require('../assets/images/close.png')} alt='close' onClick={()=>setEditName(!editName)}></img>
                                </div>
                            </div>
                            :
                            <div className='user_name'>
                                <h3>{isEnroll.name}</h3>
                            </div>
                            }
                        <div className='assets'>
                            <h2>Assets</h2>
                            <div className='assets_wraper'>
                                <h4>{isFaucet.amount}</h4>
                            </div>
                        </div>
                        <div className='deposit'>
                            <h2>Deposit</h2>

                            <div className='deposit_wrapper'>
                                <div className='deposit_faucet'>
                                    <h4>{isFaucet?10:0}ETH</h4>
                                    <div className='btn' onClick={()=>faucetBtn()}><h6>Faucet</h6></div>
                                </div>
                                <div className='account_address'>
                                    <div className='account'>{account}</div>
                                    <div className='btn' onClick={()=>faucetBtn()}><h6>Copy</h6></div>
                                </div>
                            </div>
                        </div>

                        <div className='exercise_of_voting_rights'>

                            <div className='exercise_of_voting_rights_wrapper '>
                            <h3 className='exercise_of_voting_rights_time_limit'>Exercise of Voting Rights {dividendTimeLimit}</h3>
                            <Modal
                                appElement={document.getElementById('root') || undefined}
                                onRequestClose={()=>setVoted()}
                                isOpen={voted}
                                style={modalStyle_2}
                            >   <div className='welcome_connection'>
                                <img src={require('../assets/images/ENTASIS.png')} alt='entasis'></img><br/>
                                <h4>You voted for {ratio}</h4>
                                <h6>Corporation Name {stName}</h6>
                                <h6>Ownership Ratio {}</h6>
                                <h6>Security Token {stName}</h6>
                                <div className='voted'>
                                <img className="congratulations" src={require('../assets/images/voted.gif')} alt='entasis'></img>
                                </div>
                                <h3>Your Voting Right has been Exercised!</h3>
                                </div>
                            </Modal>
                                <h5>Select Security Token</h5>
                                <SelectBox
                                set={OPTIONS} 
                                value={setStName}
                                ></SelectBox>
                                <h4 className='head'>Dividend</h4>
                                <div className='exercise_of_voting_rights_wrapper body'>
                                    
                                    <div className='left'>
                                        <h5>Current</h5>
                                        <div className='ratio_value'>
                                            <h5>{companyPD.voted_ratio}</h5>
                                        </div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(+0.05)}}><h6>Vote</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(+0.04)}}><h6>Vote</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(+0.03)}}><h6>Vote</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(+0.02)}}><h6>Vote</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(+0.01)}}><h6>Vote</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(0.00)}}><h6>Vote</h6></div>
                                    </div>
                                    <div className='middle'>
                                        <h5>Result</h5>
                                        <div className='ratio_value'>
                                            <h5>{companyPD.voted_ratio*companyPD.dividend_ratio}</h5>
                                        </div>
                                        <div className='vote_value up'><h6>+0.05</h6></div>
                                        <div className='vote_value up'><h6>+0.04</h6></div>
                                        <div className='vote_value up'><h6>+0.03</h6></div>
                                        <div className='vote_value up'><h6>+0.02</h6></div>
                                        <div className='vote_value up'><h6>+0.01</h6></div>
                                        <div className='vote_value'><h6>0.00</h6></div>
                                        <div className='vote_value down'><h6>-0.01</h6></div>
                                        <div className='vote_value down'><h6>-0.02</h6></div>
                                        <div className='vote_value down'><h6>-0.03</h6></div>
                                        <div className='vote_value down'><h6>-0.04</h6></div>
                                        <div className='vote_value down'><h6>-0.05</h6></div>

                                    </div>
                                    <div className='right'>
                                        <h5>Next</h5>
                                        <div className='ratio_value'>
                                            <h5>{companyPD.dividend_ratio}</h5>
                                        </div>
                                        <div className='vote_btn'></div>
                                        <div className='vote_btn'></div>
                                        <div className='vote_btn'></div>
                                        <div className='vote_btn'></div>
                                        <div className='vote_btn'></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(0)}}><h6>Vote</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(-0.01)}}><h6>Vote</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(-0.02)}}><h6>Vote</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(-0.03)}}><h6>Vote</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(-0.04)}}><h6>Vote</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(-0.05)}}><h6>Vote</h6></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Header;