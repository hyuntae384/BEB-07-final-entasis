import LimitOrderBook from '../components/LimitOrderBook'
import Order from '../components/Order'
import Assets from "../components/Assets"
import Footer from "../components/Footer"
import Navigator from "../components/Navigator"
import Header from "../components/Header"
import { useEffect, useState, useRef } from "react"
import Historys from "../components/Historys"
import WelcomePage from "./WelcomePage"
import { useWeb3React } from "@web3-react/core"
import axios from "axios"
import ChartWrapper from "../components/Chart/ChartWrapper"
import Web3 from "web3";
import TokenABI from "../ABIs/ERC1400.json"

// import {FaucetWallet} from '../apis/user'

const MainPage =()=>{
    const [currentPrice, setCurrentPrice] = useState(0)
    const [isLoading, setIsLoading] = useState(true);
    const [isEnroll,setIsEnroll] =useState({});
    const [userPosition,setUserPosition] = useState();
    const [copy, setCopy] = useState('');
    const [number, setNumber] = useState(0);
    const [walletConnected, setWalletConnected] = useState(false)
    const [isCircuitBreaker,setIsCircuitBreaker] = useState(false)
    const [tokenName, setTokenName] = useState('enta')
    const [offset, setOffset]=useState(0)
    const [limit, setLimit]=useState(10)
    const {chainId, account, active, activate, deactivate} = useWeb3React();
    const currentPrice_ref = useRef({});
console.log(offset,limit)

    // ================================================================
    // Props Test
    const userAccount = useWeb3React().account;
    const contractAccount = '0x04794606b3065df94ef3398aA2911e56abE169B6';
    const serverAccount = '0x48c02B8aFddD9563cEF6703df4DCE1DB78A6b2Eb';
    const [userEth, setUserEth] = useState("")
    const [userToken, setUserToken] = useState("")

    const ST_Name = [
        { value: "enta", name: "ENTA" },
        { value: "beb", name: "BEB" },
        { value: "leo", name: "LEO" },
        ];


    const StABI = TokenABI.abi
    const web3 = new Web3(
        window.ethereum || "http://18.182.9.156:8545"
    );
    const tokenContract = new web3.eth.Contract(StABI, contractAccount);
    useEffect(() => {
        getUserEth(userAccount);
        getUserToken(userAccount);
        /* console.log(userEth)
        console.log(userToken) */
    },[currentPrice])

    async function getUserEth(account){
        if(account === undefined) setUserEth('');
        else {
            let userEth = await web3.eth.getBalance(account);
            let TransUserEth = web3.utils.fromWei(userEth);
            setUserEth(Number(TransUserEth).toFixed(4));
        }
    }

    async function getUserToken(account){
        if(account === undefined) setUserToken('')
        else {
            let userToken = await tokenContract.methods.balanceOf(account).call();
            let TransUserToken = web3.utils.fromWei(userToken)
            setUserToken(TransUserToken);
        }
    }

    // ================================================================

    let powerOfMarket = (currentPrice.open - currentPrice.close)
    useEffect(()=>{
        let name = ' '
        if(name !== tokenName){
        const setChartRTD=(async () => 
        {try {
            currentPrice_ref.current = await axios.get('http://localhost:5050/rtd/'+tokenName)
            setCurrentPrice(currentPrice_ref.current.data)
        } catch (e) {
        console.log(e) // caught
        }
    })
        if(!isLoading){
        const loop = setInterval(() => {
        setChartRTD()
        clearInterval(loop);
        powerOfMarket = 0;
        }, 1000);
        }else{
            setTimeout(()=>{
                setIsLoading(false)
            },1000)
        }
    }
        name = tokenName;
    })
    
    const copyHandler = (e) => {
        copy = e;
    }
    // URL
    const origin = "http://localhost:5050/";
    const getUserURL = origin + "user/"; 
    const enroll = getUserURL + "enroll/?wallet="
    const position = getUserURL + "position/?wallet="
    const chart = origin + "chart/data"

    // API Request
    const getChart = async({ offset, limit, unit, st_name}) => {
        if(st_name===null || st_name ===undefined)return new Error('Invalid Request!')
        const resultSTChart =  axios.get(chart + `/${offset} + ${limit} + ${unit} + ${st_name}`)
        .then(res=>res)
        .then(err=>err)
        return  resultSTChart
    }
    
    useEffect(()=>{
        const Position = async(wallet,offset,limit) => {
            if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
            const resultPosition = await axios.get(position + wallet + `&offset=${offset}&limit=${limit}`)
            .then(res=>res.data)
            .then(err=>err)
            setUserPosition(resultPosition)
            console.log(resultPosition)
        }
        Position(account,offset,limit)
    },[account,offset])

        useEffect(()=>{
        const EnrollWallet = async(wallet) => {
            if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
            const resultEnrollWallet =  await axios.post(enroll + wallet)
            .then(res=>res.data)
            .then(err=>err)
            setIsEnroll(resultEnrollWallet)
        }
        EnrollWallet(account)
        if(account===undefined){
        setUserPosition();
        EnrollWallet();
        }
    },[account]);
        const onMouseEnterHandler = () => {
            document.body.style.overflow = 'unset';
        }

return(
    <div className="main_page" onMouseEnter={onMouseEnterHandler}>
        <WelcomePage
            account={account}
            tutorialCnt={isEnroll.cnt}
            isLoading={isLoading}
        />
        <Header 
            walletConnected = {walletConnected}
            setWalletConnected = {setWalletConnected}
            isLoading = {isLoading} onMouseEnter={onMouseEnterHandler}/>
        <Navigator
            isCircuitBreaker={isCircuitBreaker}
        />
        <div className="main_head">
            <ChartWrapper
                ST_Name={ST_Name}
                tokenName={tokenName}
                setTokenName={setTokenName}
                currentPrice={currentPrice}
                isLoading={isLoading}
            />
            <LimitOrderBook
                powerOfMarket={-powerOfMarket}
                ST_CurrentPrice={currentPrice.close} 
            />
            <Order
                ST_CurrentPrice={currentPrice.close}
                userEth={userEth}
                userToken={userToken}
            />
        </div>
        <div className="main_bottom">
            <Historys
                setOffset={setOffset}
                setLimit={setLimit}
                walletConnected = {walletConnected}
                setWalletConnected = {setWalletConnected}
                userPosition={userPosition}
            />
            <Assets
                ST_CurrentPrice={currentPrice.close} 
                powerOfMarket={powerOfMarket}
                userEth={userEth}
                userToken={userToken}
            />
        </div>
        <Footer
            setIsCircuitBreaker={setIsCircuitBreaker}
        />
    </div>
    )
}
export default MainPage