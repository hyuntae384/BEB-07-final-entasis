import {Link} from 'react-router-dom';
import {useState} from 'react'
import Modal from "react-modal"
import '../assets/css/main.css';
import { ChName, Score, Position} from '../apis/user'
import Tutorials from './Tutorials';
import SelectBox from './Select';
import axios from 'axios';
import Welcome from '../pages/TransactionsPage';
import { useTranslation } from 'react-i18next';

// import {Vote} from '../apis/company'
const Header =({walletConnected,setWalletConnected,totalCurrentPrices,stName,setStName,companyPD,OPTIONS,active,handleConnect,isEnroll,account,setEditName,editName,setEditNameValue,Change,isFaucet,faucetBtn,dividendTimeLimit,setVoted,voted,ratio,setRatio,userEntaToken,userBebToken,userLeoToken,setIsFaucet,setMyPage,userModalIsOpen, setUserModalIsOpen
})=> {
    const {t} = useTranslation();

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
        const ST_1 = {
            name:'ENTA',price:(totalCurrentPrices.enta * userEntaToken).toFixed(4) ,amount: userEntaToken
        };
        const ST_2 = {
            name:'BEB',price:(totalCurrentPrices.beb * userBebToken).toFixed(4) ,amount: userBebToken
        };
        const ST_3 = {
            name:'LEO',price:(totalCurrentPrices.leo * userLeoToken).toFixed(4) ,amount: userLeoToken
        };
        const decord=()=>{
            if(stName==='ENTAToken') return totalCurrentPrices.enta
            if(stName==='BEBToken') return totalCurrentPrices.beb
            if(stName==='LEOToken') return totalCurrentPrices.leo
    
        }
        // console.log(isEnroll.cnt)
    return(
        <div className="header">
        
            <Link to='/'>
                <img src={require('../assets/images/logo.png')}></img>
            </Link>
            <Link to='/'>
                <img className='entasis_main_logo' src={require('../assets/images/ENTASIS.png')}></img>
            </Link>
            <div className='header_user'>
            <div className="btn" onClick={handleConnect}>{active ? <h2>{t("disconnect")}</h2> : <h2>{t("connect")}</h2>}</div>
            {active&&isEnroll.cnt===0?<Tutorials
                    faucetBtn={faucetBtn}
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
                    <h3>{t("Welcome")}</h3>
                    <img src={require('../assets/images/ENTASIS_white.png')} alt='entasis'></img>
                    </div>
                    <img className="congratulations" src={require('../assets/images/welcome_connection.gif')} alt='entasis'></img>
                    <h2>{t("Connection Information")}</h2>
                    <h4>{t("Username")} : {isEnroll.name}</h4>
                    <h4>{t("Tutorials")} : {isEnroll.cnt<=1?"Complete":"Not Complete Yet"}</h4>
                    <h4>{t("Account")} : {account===undefined?'Disconnected':account}</h4>
                    </Modal>}
                {active?
                <i className='fas fa-wallet' onClick={()=>(userModalOpen())} ></i>:
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
                        <h1>{t("MyAccount")}</h1>
                    </div>
                    <div className='myaccount_wrapper'>
                        <div className='myaccount_wrapper_name_top'>
                            <h2>{t("Username")}</h2>
                            <div className='btn' onClick={()=>setEditName(!editName)}><h6>{t("Edit")}</h6></div>
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
            <div className="total_assets">
                <h4>{t("Assets")}</h4><h6>{(ST_1.amount*ST_1.price+ST_2.amount*ST_2.price+ST_3.amount*ST_3.price).toFixed(4)}ETH</h6>
            </div>      
            <div className='assets_wraper'>
                <h5>{ST_1.name+" ("+ST_1.amount+")"+" "+ST_1.price+"ETH"}</h5>
                <h5>{ST_2.name+" ("+ST_2.amount+")"+" "+ST_2.price+"ETH"}</h5>
                <h5>{ST_3.name+" ("+ST_3.amount+")"+" "+ST_3.price+"ETH"}</h5>
            </div>
        </div>
                        <div className='deposit'>
                            <h2>{t("Deposit")}</h2>

                            <div className='deposit_wrapper'>
                                <div className='deposit_faucet'>
                                    <h4>{isFaucet?50:0}ETH</h4>
                                    <div className='btn' onClick={()=>faucetBtn()}><h6>{t("Faucet")}</h6></div>
                                </div>
                                <div className='account_address'>
                                    <div className='account'>{account}</div>
                                    <div className='btn' onClick={()=>faucetBtn()}><h6>{t("Copy")}</h6></div>
                                </div>
                            </div>
                        </div>

                        <div className='exercise_of_voting_rights'>

                            <div className='exercise_of_voting_rights_wrapper '>
                            <h3 className='exercise_of_voting_rights_time_limit'>{t("Exercise of Voting Rights")}</h3>
                            <Modal
                                appElement={document.getElementById('root') || undefined}
                                onRequestClose={()=>setVoted()}
                                isOpen={voted}
                                style={modalStyle_2}
                            >   <div className='welcome_connection'>
                                <img src={require('../assets/images/ENTASIS.png')} alt='entasis'></img><br/>
                                <h4>{t("You voted for")} {ratio}</h4>
                                <h6>{t("Corporation Name")} {stName}</h6>
                                <h6>{t("Ownership Ratio")} {}</h6>
                                <h6>{t("Security Token")} {stName}</h6>
                                <div className='voted'>
                                <img className="congratulations" src={require('../assets/images/voted.gif')} alt='entasis'></img>
                                </div>
                                <h3>{t("Your Voting Right has been Exercised!")}</h3>
                                </div>
                            </Modal>
                                <h5>{t("Select Security Token")}</h5>
                                <SelectBox
                                set={OPTIONS} 
                                value={setStName}
                                ></SelectBox>
                                <h4 className='head'>{t("Dividend")} {Number(companyPD.dividend_ratio*(1+Number(companyPD.voted_ratio))*decord()).toFixed(4)}</h4>
                                <div className='exercise_of_voting_rights_wrapper body'>
                                    
                                    <div className='left'>
                                        <h5>{t("Current")}</h5>
                                        <div className='ratio_value'>
                                            <h5>{Number(companyPD.voted_ratio*companyPD.dividend_ratio).toFixed(4)}</h5>
                                        </div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(+0.05)}}><h6>{t("Vote")}</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(+0.04)}}><h6>{t("Vote")}</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(+0.03)}}><h6>{t("Vote")}</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(+0.02)}}><h6>{t("Vote")}</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(+0.01)}}><h6>{t("Vote")}</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(0.00)}}><h6>{t("Vote")}</h6></div>
                                    </div>
                                    <div className='middle'>
                                        <h5>{t("Result")}</h5>
                                        <div className='ratio_value'>
                                            <h5>{Number(companyPD.voted_ratio).toFixed(2)}</h5>
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
                                        <h5>{t("Next")}</h5>
                                        <div className='ratio_value'>
                                            <h5>{Number(companyPD.dividend_ratio*(1+Number(companyPD.voted_ratio))).toFixed(4)}</h5>
                                        </div>
                                        <div className='vote_btn'></div>
                                        <div className='vote_btn'></div>
                                        <div className='vote_btn'></div>
                                        <div className='vote_btn'></div>
                                        <div className='vote_btn'></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(0)}}><h6>{t("Vote")}</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(-0.01)}}><h6>{t("Vote")}</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(-0.02)}}><h6>{t("Vote")}</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(-0.03)}}><h6>{t("Vote")}</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(-0.04)}}><h6>{t("Vote")}</h6></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(-0.05)}}><h6>{t("Vote")}</h6></div>
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