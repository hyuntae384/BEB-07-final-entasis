import LimitOrderBook from '../components/LimitOrderBook'
import Order from '../components/Order'
import Assets from "../components/Assets"
import Footer from "../components/Footer"
import Navigator from "../components/Navigator"
import Header from "../components/Header"
import Staking from "../components/Staking"
import { useEffect, useState, useRef } from "react"
import Historys from "../components/Historys"
import WelcomePage from "./WelcomePage"
import { useWeb3React } from "@web3-react/core"
import axios from "axios"
import ChartWrapper from "../components/Chart/ChartWrapper"
import Web3 from "web3";
import TokenABI from "../ABIs/ERC1400.json"
import dataToArray from '../functions/data_to_array'
import { injected } from '../connectors';

// import {FaucetWallet} from '../apis/user'

const MainPage =({setTxs,isWelcome,setIsWelcome,setIsChartTotal,tokenName,account,currentPageNum,circuitBreakerTimer,chartOriginArr,setChartArr,chartArr,currentPrice,setCurrentPrice,isLoading,setIsLoading,setCompanyPD,stName,activate,setIsEnroll,ratio,isCircuitBreaker,setCircuitBreakerTimer,setIsCircuitBreaker,onMouseEnterHandler,isEnroll,setStName,setTokenName,faucetBtn,isFaucet,OPTIONS,handleConnect,setCurrentPageNum,setCoorpName,userEth,userEntaToken,userBebToken,userLeoToken,setUserEntaToken,setUserBebToken,setUserLeoToken,setUserEth,myPage,entaStakeToken,bebStakeToken,leoStakeToken,setEntaStakeToken,setBebStakeToken,setLeoStakeToken,entaStakeReward,bebStakeReward,leoStakeReward,setEntaStakeReward,setBebStakeReward,setLeoStakeReward,ST_Name})=>{



    // chart===================================================================
    const [totalChartData, setTotalChartData] = useState(false)
    const currentPrice_ref = useRef({});
    // chart===================================================================

    const [userPosition,setUserPosition] = useState();
    const [copy, setCopy] = useState('');
    const [number, setNumber] = useState(0);
    const [refresh, setRefresh] = useState(false)

    const [defaultLimit, setDefaultLimit] = useState(100);
    const [dataLength, setDataLength] = useState(0);
    const [termValue, setTermValue] = useState(15);
    const [offset,setOffset]=useState(1500);
    const [limit, setLimit]=useState(10000);

    const [termArrLength,setTermArrLength] = useState(2000);
    const [chartTermArr, setChartTermArr] = useState([])
    const apiAddress = "http://52.78.173.200:5050/user/personaldividend/?wallet="

    const [userDividend, setUserDividend] = useState({
        ENTAToken:'0',
        BEBToken:'0',
        LEOToken:'0'
    })
    const term = [
        { value: "1", name: "1 minutes" },
        { value: "15", name: "15 minutes" },
        { value: "60", name: "1 hours" },
        { value: "240", name: "4 hours" },
        { value: "1440", name: "1 day" },
        { value: "10080", name: "1 week" },
        ]

    // Staking =========================================================
    const [staking, setStaking] = useState();
    // Staking =========================================================

useEffect(()=>{
    let limitChartArr=[];
    const origin = 'http://52.78.173.200:5050/chart/'
        const setChartTotal=(async(offset,limit,tokenName) => 
        {try {
            setIsLoading(true)
            const resultTotal = await axios.get(origin + tokenName + `?offset=${0}&limit=${10000}`)
            setTimeout(()=>{
                (resultTotal.data.priceinfo.map(e=>limitChartArr.push(Object.values(e))))
                setIsChartTotal(limitChartArr)
                setTotalChartData(true)         
                setIsLoading(false)
                // setOffset(limit/100)
                // total=resultTotal.data.totalLength-1;
            },1000)
        } catch (e) {
        console.log(e) 
        }
    })
    setChartTotal(offset,limit,tokenName)
    // console.log(tokenName)

},[tokenName])


// console.log(`${new Date().getSeconds()}`)
    // console.log(currentPageNum)
    const getDividend = async(wallet) => {
        if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
        const resultAmount = await axios.get(apiAddress + wallet)
        .then(res=>res)
        .then(err=>err)
        setUserDividend(resultAmount.data)
    }

    useEffect(()=>{

    },[currentPageNum,new Date().getSeconds()])
    let setByTime = []
    let setByTimeNewArr = []

    useEffect(()=>{

        let cnt = 0
        let termNum = 0;
        let maxArr = [];
        let minArr = [];
        // console.log(`${termNum}`,`${termValue}`)
        const arrSum = arr => arr.reduce((a,b) => a + b, 0)

        // const dataToArrayMax = (dataToArray) =>{
        //     maxArr.push(dataToArray)
        //     return  Number(Math.max(...maxArr))
        // }

        // const dataToArrayMin = (dataToArray) =>{
        //     minArr.push(dataToArray)
        //     return  Number(Math.max(...maxArr))
        // }
        if(`${termNum}`!==`${termValue}`){
            for(let i = 0 ; i<chartOriginArr.length; i++){
                setByTime.push(chartOriginArr[i])
                // console.log(i%termValue)
                if(i%Number(termValue)=== 0){
                    cnt++
                    let setByTimeArr = [
                        cnt,
                        dataToArray(setByTime,1)[0],
                        Number(dataToArray(setByTime,2)[0]),
                        Number(dataToArray(setByTime,3)[setByTime.length-1]),
                        Number(Math.max(...dataToArray(setByTime,4))),
                        Number(Math.min(...dataToArray(setByTime,5))),
                        Number(arrSum(dataToArray(setByTime,6))),
                        Number(arrSum(dataToArray(setByTime,7))),
                    ]
                    
                setByTimeNewArr.push(setByTimeArr)
                setByTime=[]
                setByTimeArr=[]
            }
            setChartArr(setByTimeNewArr)
            }
            termNum=termValue
            setTermArrLength(setByTimeNewArr.length)
            setDataLength(setByTimeNewArr.length)
        }    
    },[termValue,chartOriginArr])

    useEffect(()=>{
        setChartTermArr(chartArr
        .slice(dataLength>termArrLength*0.03?dataLength:termArrLength*0.03, 
            defaultLimit>termArrLength*0.03?defaultLimit:termArrLength*0.03))
            setDefaultLimit(termArrLength)

    },[chartArr,dataLength,defaultLimit,termValue])


    useEffect(()=>{
        setChartTermArr(chartArr)
    },[chartArr])


    // ================================================================
    // Props Test
    /* const contractAccount = '0x04794606b3065df94ef3398aA2911e56abE169B6';
    const serverAccount = '0x48c02B8aFddD9563cEF6703df4DCE1DB78A6b2Eb'; */

    async function getUserEth(account){
        if(account === undefined) setUserEth('');
        else {
            let userEth = await web3.eth.getBalance(account);
            let TransUserEth = web3.utils.fromWei(userEth);
            setUserEth(Number(TransUserEth).toFixed(4));
        }
    }

    async function getUserEntaToken(account){
        if(account === undefined) setUserEntaToken('')
        else {
            let userToken = await EntaTokenContract.methods.balanceOf(account).call();
            let TransUserToken = web3.utils.fromWei(userToken)
            setUserEntaToken(TransUserToken);
        }
    }

    async function getUserBebToken(account){
        if(account === undefined) setUserBebToken('')
        else {
            let userToken = await BebTokenContract.methods.balanceOf(account).call();
            let TransUserToken = web3.utils.fromWei(userToken)
            setUserBebToken(TransUserToken);
        }
    }

    async function getUserLeoToken(account){
        if(account === undefined) setUserLeoToken('')
        else {
            let userToken = await LeoTokenContract.methods.balanceOf(account).call();
            let TransUserToken = web3.utils.fromWei(userToken)
            setUserLeoToken(TransUserToken);
        }
    }

    // Stake Amount Check ======================================================

    async function getEntaStakeToken(account){
        if(account === undefined) setEntaStakeToken('0')
        else {
            let userStakeToken = await EntaTokenContract.methods.stakeOf(account).call();
            let TransUserStakeToken = web3.utils.fromWei(userStakeToken)
            setEntaStakeToken(TransUserStakeToken);
        }
    }

    async function getBebStakeToken(account){
        if(account === undefined) setBebStakeToken('0')
        else {
            let userStakeToken = await BebTokenContract.methods.stakeOf(account).call();
            let TransUserStakeToken = web3.utils.fromWei(userStakeToken)
            setBebStakeToken(TransUserStakeToken);
        }
    }

    async function getLeoStakeToken(account){
        if(account === undefined) setLeoStakeToken('0')
        else {
            let userStakeToken = await LeoTokenContract.methods.stakeOf(account).call();
            let TransUserStakeToken = web3.utils.fromWei(userStakeToken)
            setLeoStakeToken(TransUserStakeToken);
        }
    }


    // Stake Reward Check ======================================================

    async function getEntaStakeReward(account){
        if(account === undefined) setEntaStakeReward('0')
        else {
            let rewardToken = await EntaTokenContract.methods.rewardOf(account).call();
            let TransRewardToken = web3.utils.fromWei(rewardToken)
            setEntaStakeReward(TransRewardToken);
        }
    }

    async function getBebStakeReward(account){
        if(account === undefined) setBebStakeReward('0')
        else {
            let rewardToken = await BebTokenContract.methods.rewardOf(account).call();
            let TransRewardToken = web3.utils.fromWei(rewardToken)
            setBebStakeReward(TransRewardToken);
        }
    }

    async function getLeoStakeReward(account){
        if(account === undefined) setLeoStakeReward('0')
        else {
            let rewardToken = await LeoTokenContract.methods.rewardOf(account).call();
            let TransRewardToken = web3.utils.fromWei(rewardToken)
            setLeoStakeReward(TransRewardToken);
        }
    }

    // chart===================================================================
    let powerOfMarket = (currentPrice.open - currentPrice.close)
    useEffect(()=>{
        let name = ' '
        if(name !== tokenName&&totalChartData===true){
            const setChartRTD=(async () => 
                {try {
                    currentPrice_ref.current = await axios.get('http://52.78.173.200:5050/rtd/'+tokenName)
                    if(tokenName==='enta')setCurrentPrice(currentPrice_ref.current.data.chartDataENTA)
                    if(tokenName==='beb')setCurrentPrice(currentPrice_ref.current.data.chartDataBEB)
                    if(tokenName==='leo')setCurrentPrice(currentPrice_ref.current.data.chartDataLEO)
                    setIsCircuitBreaker(currentPrice_ref.current.data.restrictToggle)
                } catch (e) {
                    console.log(e) // caught
                }
            })

        const loop = setInterval(() => {
            if(!isLoading){
                setChartRTD()
                clearInterval(loop);
                powerOfMarket = 0;
            }else{
                setTimeout(()=>{
                    setIsLoading(false)
                },1000)
            }
            clearInterval(loop);
        }, 1000);
        }
        name = tokenName;


        priceChange()
        setToken(tokenName)
        contractChange(token)
        changeRestricted()
        getUserEth(userAccount);
        getUserEntaToken(userAccount);
        getUserBebToken(userAccount);
        getUserLeoToken(userAccount);
        getEntaStakeToken(userAccount)
        getBebStakeToken(userAccount)
        getLeoStakeToken(userAccount)
        getEntaStakeReward(userAccount)
        getBebStakeReward(userAccount)
        getLeoStakeReward(userAccount)
        Position(account,offsetHis,10)
        if(account!==undefined){
            EnrollWallet(account)
            }
            getDividend(userAccount)
        setOffset(pageSet * (currentPageNum - 1))
        setLimit(pageSet * (currentPageNum - 1)+pageSet-1)
        
    },[new Date().getSeconds()])


    
    const copyHandler = (e) => {
        copy = e;
    }
    // URL
    const origin = "http://52.78.173.200:5050/";
    const chart = origin + "chart/data"

    const getUserURL = origin + "user/"; 
    const getCompanyURL = origin + "company/"; 

    const enroll = getUserURL + "enroll/?wallet="
    const position = getUserURL + "position/?wallet="
    const voteURL = getCompanyURL + "vote"
    const mypage = getUserURL + "mypage/?wallet="
        


    // API Request


        // chart===================================================================

    const Position = async(wallet,offset,limit) => {
        if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
        const resultPosition = await axios.get(position + wallet + `&offset=${offset}&limit=${limit}`)
        .then(res=>res.data)
        .then(err=>err)
        setUserPosition(resultPosition)
    }

    const pdisclosure = getCompanyURL + "pdisclosure/?name="
    useEffect(()=>{
        const CPD = async(name) => {
            if(name===null || name ===undefined)return new Error('Invalid Request!')
            const resultCPD =  axios.get(pdisclosure + name)
            .then(res=>
                setCompanyPD(res.data))
            .then(err=>err)
        }
        CPD(stName)
    },[stName])


        // console.log(offset,limit)
    // history===================================================================


    // header===================================================================



        let positions = userPosition!==undefined&& userPosition!==null?userPosition:[]
        let pageSet = 10;
        let pages = Math.ceil(positions.totalLength/ 10);
        let offsetHis = pageSet * (currentPageNum - 1);
        let limitHis = offset + pageSet;
    

    // history===================================================================

    const [name, setName] = useState("aa");
    const [vote,setVote] =useState()

    const countNumber=(e)=>{
        return e.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",")
    }



    useEffect(() => { 
        const connectWalletOnPageLoad = async () => { 
            if (localStorage?.getItem('isWalletConnected') === 'true') { 
                try { 
                await activate(injected) 
                } catch (ex) { 
                console. log(ex) 
                } 
            } 
            } 
            connectWalletOnPageLoad() 
        }, [injected])

    const EnrollWallet = async(wallet) => {
        if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
        const resultEnrollWallet =  await axios.post(enroll + wallet)
        .then(res=>res.data)
        .then(err=>err)
        setIsEnroll(resultEnrollWallet)
    }

    useEffect(()=>{
        const Vote = async(st_name,ratio,wallet) => {
            if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
            const voteJSON = {
                name:st_name,
                ratio:ratio,
                user_wallet:wallet
            }
            const resultVote=  axios.post(voteURL,voteJSON)
            .then(res=>res.data.status)
            .then(err=>err)
            setVote(resultVote)
            return resultVote
        }
        Vote(stName,ratio,account)
    },[ratio])
    // header===================================================================

    // public disclosure===================================================================
    // const [isDate, setIsDate] = useState(0);
    
    let i = 60 ;

    useEffect(()=>{
        if(isCircuitBreaker){
        const setTime = setInterval(()=>{
            if(i>0){
                i--
                setCircuitBreakerTimer(i)
            }else{
                clearInterval(setTime)
                // setIsCircuitBreaker(false)
            }
        },1000)}
    },[isCircuitBreaker,i])

const SelectCoorp = (e) =>{
    if(e==='ENTAToken')return currentPrice.totalCurrentPrices.enta
    if(e==='BEBToken')return currentPrice.totalCurrentPrices.beb
    if(e==='LEOToken')return currentPrice.totalCurrentPrices.leo
}   
    useEffect(()=>{
        setCoorpName(SelectCoorp(stName))
    })

    // public disclosure===================================================================


    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState("");
    /* const countNumber=(e)=>{
        return e.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",")
    } */
    const [token, setToken] = useState("enta");
    const web3 = new Web3(
        window.ethereum || "18.183.252.200"
    );
    const serverAddress = "0xcF2d1489aa02781EED54C7E531d91668Bd3f3703"
    const userAccount = useWeb3React().account;
    const StABI = TokenABI.abi
    const EntaTokenContract = new web3.eth.Contract(StABI, "0x0675FB9AE378C64f0F213A667C8510F99c4e663D");
    const LeoTokenContract = new web3.eth.Contract(StABI, "0x8cB36311D10680270a4976EC0f9D84bf8D9444E1");
    const BebTokenContract = new web3.eth.Contract(StABI, "0xa3d2841e639fF266E7B36c4bFcF7Bf360e0f211a");
    const [tokenContract, setTokenContract] = useState(EntaTokenContract);
    const [isRestricted, setIsRestricted] = useState(false);

    
    // console.log(curPrice)
    function contractChange(token){
        if(token === 'enta') setTokenContract(EntaTokenContract)
        if(token === 'beb') setTokenContract(BebTokenContract)
        if(token === 'leo') setTokenContract(LeoTokenContract)
    }

    async function changeRestricted(){
        const isRestricted = await tokenContract.methods.isRestricted().call()
        setIsRestricted(isRestricted)
    }

    function priceChange(){
        let curprice = currentPrice.close;
        setPrice(curprice)
    }
//=========useEffect==============================


return(
    <div className="main_page" onMouseEnter={onMouseEnterHandler}>
        <WelcomePage
            isWelcome={isWelcome}
            setIsWelcome={setIsWelcome}
            account={account}
            tutorialCnt={isEnroll.cnt}
            isLoading={isLoading}
        />
        <div className="main_head">
            <ChartWrapper
                ST_Name={OPTIONS}
                stName={stName}
                setStName={setStName}
                chartTermArr={chartTermArr}
                setTermValue={setTermValue}
                term={term}
                termValue={termValue}
                isLoading={isLoading}
                defaultLimit={defaultLimit}
                setDataLength={setDataLength}
                dataLength={dataLength}
                tokenName={tokenName}
                setTokenName={setTokenName}
                currentPrice={currentPrice}
                setTotalChartData={setTotalChartData}
            />
            <LimitOrderBook
                powerOfMarket={-powerOfMarket}
                ST_CurrentPrice={currentPrice.close} 
            />

            {(staking ?
            <Staking
            staking={staking}
            ST_Name={ST_Name}
            stName={stName}
            setStName={setStName}
            setStaking={setStaking}
            tokenContract={tokenContract}
            setTokenContract={setTokenContract}
            setTokenName={setTokenName}
            userAccount={userAccount}
            web3={web3}
            curPrice={currentPrice.close}
            userEntaToken={userEntaToken}
            userBebToken={userBebToken}
            userLeoToken={userLeoToken}
            entaStakeToken={entaStakeToken}
            bebStakeToken={bebStakeToken}
            leoStakeToken={leoStakeToken}
            entaStakeReward={entaStakeReward}
            bebStakeReward={bebStakeReward}
            leoStakeReward={leoStakeReward}
            tokenName={tokenName}
            />
            : 
            <Order
                staking={staking}
                myPage={myPage}
                stName={stName}
                setStName={setStName}
                account={account}
                faucetBtn={faucetBtn}
                isFaucet={isFaucet}
                curPrice={currentPrice.close}
                setAmount={setAmount}
                tokenContract={tokenContract}
                token={token}
                serverAddress={serverAddress}
                userAccount={userAccount}
                web3={web3}
                price={price}
                amount={amount}
                ST_Name={OPTIONS}
                setTokenName={setTokenName}
                refresh={refresh}
                setRefresh={setRefresh}
                ST_CurrentPrice={currentPrice.close}
                userEth={userEth}
                userEntaToken={userEntaToken}
                userBebToken={userBebToken}
                userLeoToken={userLeoToken}
                tokenName={tokenName}
                totalCurrentPrices={currentPrice.totalCurrentPrices}
                setStaking={setStaking}
                entaStakeToken={entaStakeToken}
                bebStakeToken={bebStakeToken}
                leoStakeToken={leoStakeToken}
            />
            )}
            
        </div>
        <div className="main_bottom">
            <Historys
                handleConnect={handleConnect}
                account={account}
                positions={userPosition}
                setCurrentPageNum={setCurrentPageNum}
                pages={pages}
                currentPageNum={currentPageNum}
                setTxs={setTxs}
            />
            <Assets
                userDividend={userDividend}
                ST_CurrentPrice={currentPrice.close} 
                powerOfMarket={powerOfMarket}
                userEth={userEth}
                userEntaToken={userEntaToken}
                userBebToken={userBebToken}
                userLeoToken={userLeoToken}
                userPosition={userPosition}
                userAccount={userAccount}
                totalCurrentPrices={currentPrice.totalCurrentPrices}
            />
        </div>
        <Footer
            isCircuitBreaker={isCircuitBreaker}
            setIsCircuitBreaker={setIsCircuitBreaker}
        />
    </div>
    )
}
export default MainPage
