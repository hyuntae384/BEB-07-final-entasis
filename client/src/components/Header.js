import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react'
import Modal from "react-modal"
import { useWeb3React } from '@web3-react/core';
import {web3} from 'web3'
import { injected } from '../connectors';
import '../assets/css/main.css';
import { ChName, Tutorial, Score, Position, Account} from '../apis/user'
import SelectBox from './Select';
import { Vote } from '../apis/company';
import axios from 'axios';

// import {Vote} from '../apis/company'
const Header =({/*user*/})=> {
    const [userModalIsOpen, setUserModalIsOpen] = useState(false)
    const [isFaucet, setIsFaucet] = useState(false)
    const [name, setName] = useState("aa");
    const [stName, setStName] = useState('BEBE');
    const [stAmount, setStAmount] = useState(0);
    const [ratio, setRatio] = useState(0);
    const [walletConnected, setWalletConnected] = useState(false)
    const [editName, setEditName] = useState(false)
    const [editNameValue,setEditNameValue] = useState('')
    const [voted,setVoted] = useState(false)
    const [isEnroll, setIsEnroll] = useState({})
    const countNumber=(e)=>{
        return e.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",")
    }
    const {chainId, account, active, activate, deactivate} = useWeb3React();

    const handdleConnect = () => {
        if(active) {
            deactivate();
            return;
        }
        activate(injected, (error) => {
            if('/No ethereum provider was found on window.ethereum/'.test(error)) {
                window.open('https://metamask.io/download.html');
            }
        });
        setWalletConnected(true)
    }
    const origin = "http://localhost:5050/";
    const getUserURL = origin + "user/"; 
    const enroll = getUserURL + "enroll/?wallet="
    const faucet = getUserURL + "faucet/?wallet="

    const EnrollWallet = async(wallet) => {
        if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
        const resultEnrollWallet =  await axios.post(enroll + wallet)
        .then(res=>res.data)
        .then(err=>err)
        return  setIsEnroll(resultEnrollWallet)
    }
    useEffect(()=>{
        Account(account)
        ChName(account,editNameValue)
        EnrollWallet(account)
        FaucetWallet(account)
    },[account,editNameValue])

    const FaucetWallet = async(wallet) => {
        if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
        const faucetJSON = {'wallet':wallet}
        const resultFaucetWallet = await axios.put(faucet + wallet,faucetJSON)
        .then(res=>res.data.status)
        // .then(err=>err)
        .catch((error)=>{
            if(error.response.data.message==='user has already used the faucet'){setIsFaucet(true)}
        })
        return resultFaucetWallet
    }
//     var Contract = require('web3-eth-contract');
// // set provider for all later instances to use
//     Contract.setProvider('ws://localhost:8546');
//     var contract = new Contract(jsonInterface, address);
//     contract.methods.somFunc().send({from: ....})
//     .on('receipt', function(){
//         ...
//     });
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
            background: "#2B2B2B",
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


    // useEffect(()=>{
    //     return Vote(stName,stAmount,ratio,account).status.value
    // },[stName,stAmount,ratio,account])


    const faucetBtn=()=>{
        
        //     <Modal
        //     appElement={document.getElementById('root') || undefined}
        //     onRequestClose={()=>setVoted()}
        //     isOpen={voted}
        //     style={modalStyle_2}
        // >   <div className='welcome_connection'>
        //     <img src={require('../assets/images/ENTASIS.png')} alt='entasis'></img><br/>
        //     <h3>You voted for {ratio}</h3>
        //     <h5>Corporation Name {stName}</h5>
        //     <h5>Ownership Ratio {user.amount/*/totalSupply */}</h5>
        //     <h5>Security Token {stName}</h5>
        //     <div className='voted'>
        //     <img className="congratulations" src={require('../assets/images/voted.gif')} alt='entasis'></img>
        //     </div>
        //     <h2>Your Voting Right has been Exercised!</h2>
        //     </div>
        // </Modal>
        // )}else
        FaucetWallet(account)
    }
    const ST_1 = {
        name:'BEBE',price:'200',amount:'20'
    };
    const ST_2 = {
        name:'DEDE',price:'100',amount:'230'
    };
    const ST_3 = {
        name:'CECE',price:'400',amount:'10'
    };
    const OPTIONS = [
        { value: "BEBE", name: "BEBE" },
        { value: "DEDE", name: "DEDE" },
        { value: "CECE", name: "CECE" },
    ];
    const enterHandler=(e)=>{
        if(e.key === "Enter") return ChName(account,editNameValue); EnrollWallet(account);setEditName(!editName);
    }
    return(
        <div className="header">
        
            <Link to='/'>
                <img src={require('../assets/images/logo.png')}></img>
            </Link>
            <Link to='/'>
                <img className='entasis_main_logo' src={require('../assets/images/ENTASIS.png')}></img>
            </Link>

            <Modal
                appElement={document.getElementById('root') || undefined}
                onRequestClose={()=>setWalletConnected()}
                isOpen={walletConnected}
                style={modalStyle_2}
            >   <div className='welcome_connection'>
                <h3>Welcome</h3>
                <img src={require('../assets/images/ENTASIS_white.png')} alt='entasis'></img>
                </div>
                <img className="congratulations" src={require('../assets/images/welcome_connection.gif')} alt='entasis'></img>
            <span>Connection Information</span>
            </Modal>
            <div className='header_user'>
            <div className="btn" onClick={handdleConnect}>{active ? <h2>disconnect</h2> : <h2>connect</h2>}</div>
                {/* <img src={require('../assets/images/user.png')} 
                onClick={active? ()=>userModalOpen():handdleConnect} alt='connection'></img> */}
                {active?
                <i className='fas fa-wallet' onClick={()=>userModalOpen()} ></i>:
                <div onClick={handdleConnect} className='fa-wallet_disconnect'></div>}
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
                                <input onChange={(e)=>setEditNameValue(e.target.value)} onKeyDown={enterHandler}></input>
                                <div className='edit_name_close'>
                                    <img src={require('../assets/images/ok.png')} alt='ok'
                                    onClick={()=>{
                                        ChName(account,editNameValue)
                                        EnrollWallet(account)
                                        setEditName(!editName)
                                    }}></img>
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
                                <h4>{ST_1.name+" ("+ST_1.amount+")"+" "+countNumber(ST_1.price+"ETH")}</h4>
                                <h4>{ST_2.name+" ("+ST_2.amount+")"+" "+countNumber(ST_2.price+"ETH")}</h4>
                                <h4>{ST_3.name+" ("+ST_3.amount+")"+" "+countNumber(ST_3.price+"ETH")}</h4>
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
                            <h2>Exercise of Voting Rights</h2>
                            <div className='exercise_of_voting_rights_wrapper '>
                            <Modal
                                appElement={document.getElementById('root') || undefined}
                                onRequestClose={()=>setVoted()}
                                isOpen={voted}
                                style={modalStyle_2}
                            >   <div className='welcome_connection'>
                                <img src={require('../assets/images/ENTASIS.png')} alt='entasis'></img><br/>
                                <h3>You voted for {ratio}</h3>
                                <h5>Corporation Name {stName}</h5>
                                <h5>Ownership Ratio {}</h5>
                                <h5>Security Token {stName}</h5>
                                <div className='voted'>
                                <img className="congratulations" src={require('../assets/images/voted.gif')} alt='entasis'></img>
                                </div>
                                <h2>Your Voting Right has been Exercised!</h2>
                                </div>
                            </Modal>
                                <h3>Select Security Token</h3>
                                <SelectBox options={OPTIONS} 
                                defaultValue=""></SelectBox>
                                <h3 className='exercise_of_voting_rights_wrapper head'>Dividend</h3>
                                <div className='exercise_of_voting_rights_wrapper body'>
                                    
                                    <div className='left'>
                                        <h5>Current</h5>
                                        <div className='ratio_value'>
                                            <h4>{}5%</h4>
                                        </div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(+0.05)}}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(+0.04)}}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(+0.03)}}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(+0.02)}}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(+0.01)}}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(0.00)}}><h5>Vote</h5></div>
                                    </div>
                                    <div className='middle'>
                                        <h5>Result</h5>
                                        <div className='ratio_value'>
                                            <h4>{}0.03</h4>
                                        </div>
                                        <div className='vote_value up'><h5>+0.05</h5></div>
                                        <div className='vote_value up'><h5>+0.04</h5></div>
                                        <div className='vote_value up'><h5>+0.03</h5></div>
                                        <div className='vote_value up'><h5>+0.02</h5></div>
                                        <div className='vote_value up'><h5>+0.01</h5></div>
                                        <div className='vote_value'><h5>0.00</h5></div>
                                        <div className='vote_value down'><h5>-0.01</h5></div>
                                        <div className='vote_value down'><h5>-0.02</h5></div>
                                        <div className='vote_value down'><h5>-0.03</h5></div>
                                        <div className='vote_value down'><h5>-0.04</h5></div>
                                        <div className='vote_value down'><h5>-0.05</h5></div>

                                    </div>
                                    <div className='right'>
                                        <h5>Next</h5>
                                        <div className='ratio_value'>
                                            <h4>{}5.49%</h4>
                                        </div>
                                        <div className='vote_btn'></div>
                                        <div className='vote_btn'></div>
                                        <div className='vote_btn'></div>
                                        <div className='vote_btn'></div>
                                        <div className='vote_btn'></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(0)}}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(-0.01)}}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(-0.02)}}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(-0.03)}}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(-0.04)}}><h5>Vote</h5></div>
                                        <div className='vote_btn' onClick={()=>{setVoted(true)
                                        setRatio(-0.05)}}><h5>Vote</h5></div>
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