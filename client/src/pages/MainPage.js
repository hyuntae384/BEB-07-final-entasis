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
import dataToArray from '../functions/data_to_array'
import { injected } from '../connectors';
import { ChName, Score, Position} from '../apis/user'

// import {FaucetWallet} from '../apis/user'

const MainPage =({setTxs,isWelcome,setIsWelcome})=>{

    // chart===================================================================
    const [totalChartData, setTotalChartData] = useState(false)
    const [currentPrice, setCurrentPrice] = useState({
        close : "0",
        createdAt : "0",
        high : "0",
        low : "0",
        open : "0",
        totalCurrentPrices : {enta: '0', beb: '0', leo: '0'},
        totalVolFrom : "0",
        totalVolTo : "0"
    })
    const currentPrice_ref = useRef({});
    // chart===================================================================

    // history===================================================================
    const [currentPageNum, setCurrentPageNum]=useState(1)
    // history===================================================================


    const [isLoading, setIsLoading] = useState(false);
    const [isEnroll,setIsEnroll] =useState({});
    const [userPosition,setUserPosition] = useState();
    const [copy, setCopy] = useState('');
    const [number, setNumber] = useState(0);
    const [walletConnected, setWalletConnected] = useState(false)
    const [isCircuitBreaker,setIsCircuitBreaker] = useState(false)
    const [tokenName, setTokenName] = useState('enta')
    const [refresh, setRefresh] = useState(false)
    const [stName, setStName] = useState('ENTAToken');
    const [companyPD, setCompanyPD] =useState([]) 

    const {chainId, account, active, activate, deactivate} = useWeb3React();
    const [defaultLimit, setDefaultLimit] = useState(0);
    const [dataLength, setDataLength] = useState(0);
    const [chartToggle,setChartToggle] = useState(false)
    const [termValue, setTermValue] = useState(1);
    const [offset,setOffset]=useState(1500);
    const [limit, setLimit]=useState(10000);
    const [total,setTotal] = useState(0);

    const [termArrLength,setTermArrLength] = useState(2000);
    const [chartArr, setChartArr]  = useState([]);
    const [chartTermArr, setChartTermArr] = useState([])
    const [chartOriginArr,setChartOriginArr] = useState([]);
    const [isChartTotal, setIsChartTotal] = useState([]);
    const apiAddress = "http://15.165.204.25:5050/user/personaldividend/?wallet="


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

useEffect(()=>{
    let limitChartArr=[];

    const origin = 'http://15.165.204.25:5050/chart/'
        const setChartTotal=(async(offset,limit,tokenName) => 
        {try {
            // setIsLoading(true)
            const resultTotal = await axios.get(origin + tokenName + `?offset=${offset}&limit=${limit}`)
            setTimeout(()=>{
                (resultTotal.data.priceinfo.map(e=>limitChartArr.push(Object.values(e))))
                setIsChartTotal(limitChartArr)
                setTotalChartData(true)         
                // setIsLoading(false)
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

    useEffect(()=>{
        setChartOriginArr(isChartTotal)
        
    },[isChartTotal,tokenName])
// console.log(`${new Date().getSeconds()}`)
    useEffect(() => {
        const loop = setInterval(() => {
            if(`${new Date().getSeconds()}`===`59`){
                let index = chartArr[chartArr.length-1]!==undefined?chartArr[chartArr.length-1][0]+1:undefined
                let createdAtB = currentPrice.createdAt;
                let openB= typeof chartArr[chartArr.length-1]==='object'&&!isNaN(chartArr[chartArr.length-1][3]) ?chartArr[chartArr.length-1][3]:currentPrice.open;
                let closeB= currentPrice.close;
                let highB= currentPrice.high;
                let lowB= currentPrice.low;
                let totalVolToB= currentPrice.totalVolTo;
                let totalVolFromB= currentPrice.totalVolFrom;
                setChartOriginArr([...chartOriginArr,[
                    index,
                    createdAtB,
                    openB,
                    closeB,
                    highB,
                    lowB,
                    totalVolToB,
                    totalVolFromB,
                ]]);
                highB= currentPrice.close;
                lowB= currentPrice.close;

            }  

        clearInterval(loop);
        }, 1000);

        priceChange()
        setToken(tokenName)
        contractChange(token)
        changeRestricted()
        getUserEth(userAccount);
        getUserEntaToken(userAccount);
        getUserBebToken(userAccount);
        getUserLeoToken(userAccount);
        Position(account,offset,10)
        if(account!==undefined){
            EnrollWallet(account)
            MyPage(account)
            }

            getDividend(userAccount)
    }, [new Date().getSeconds(), currentPageNum]);
    console.log(currentPageNum)
    const getDividend = async(wallet) => {
        if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
        const resultAmount = await axios.get(apiAddress + wallet)
        .then(res=>res)
        .then(err=>err)
        setUserDividend(resultAmount.data)
    }

    useEffect(()=>{
        setOffset(pageSet * (currentPageNum - 1))
        setLimit(pageSet * (currentPageNum - 1)+pageSet-1)
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
    const [userEth, setUserEth] = useState("")
    const [userEntaToken, setUserEntaToken] = useState("")
    const [userBebToken, setUserBebToken] = useState("")
    const [userLeoToken, setUserLeoToken] = useState("")

    const ST_Name = [
        { value: "enta", name: "ENTA" },
        { value: "beb", name: "BEB" },
        { value: "leo", name: "LEO" },
        ];
    const OPTIONS = [
        { value: "ENTAToken", name: "ENTA" },
        { value: "BEBToken", name: "BEB" },
        { value: "LEOToken", name: "LEO" },
    ];
        

    


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


    // chart===================================================================

    let powerOfMarket = (currentPrice.open - currentPrice.close)
    useEffect(()=>{
        let name = ' '
        if(name !== tokenName&&totalChartData===true){
            const setChartRTD=(async () => 
                {try {
                    currentPrice_ref.current = await axios.get('http://15.165.204.25:5050/rtd/'+tokenName)
                    setCurrentPrice(currentPrice_ref.current.data)
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





    },[new Date().getSeconds()])

    
    const copyHandler = (e) => {
        copy = e;
    }
    // URL
    const origin = "http://15.165.204.25:5050/";
    const chart = origin + "chart/data"

    const getUserURL = origin + "user/"; 
    const getCompanyURL = origin + "company/"; 

    const enroll = getUserURL + "enroll/?wallet="
    const position = getUserURL + "position/?wallet="
    const faucet = getUserURL + "faucet/?wallet="
    const mypage = getUserURL + "mypage/?wallet="
    const voteURL = getCompanyURL + "vote"

    // API Request


        // chart===================================================================

    const Position = async(wallet,offset,limit) => {
        if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
        const resultPosition = await axios.get(position + wallet + `&offset=${offset}&limit=${limit}`)
        .then(res=>res.data)
        .then(err=>err)
        // console.log(resultPosition)
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


        const onMouseEnterHandler = () => {
            document.body.style.overflow = 'unset';
        }
        // console.log(offset,limit)
    // history===================================================================


    // header===================================================================

    const handleConnect = () => {
        if(active) {
            deactivate();
            localStorage.setItem('isWalletConnected', false)
            return;
        }
        activate(injected, (error) => {
            if('/No ethereum provider was found on window.ethereum/'.test(error)) {
                window.open('https://metamask.io/download.html');
            }
        });
        try {
            localStorage.setItem('isWalletConnected', true) 
        } catch (ex) {
            console.log(ex)
        }
        setWalletConnected(true)
    }


        let positions = userPosition!==undefined&& userPosition!==null?userPosition:[]
        let pageSet = 10;
        let pages = Math.ceil(positions.totalLength/ 10);
        let offsetHis = pageSet * (currentPageNum - 1);
        let limitHis = offset + pageSet;
    

    // history===================================================================

    const [isFaucet, setIsFaucet] = useState(false)
    const [name, setName] = useState("aa");
    const [vote,setVote] =useState()
    const [ratio, setRatio] = useState(0);
    const [editName, setEditName] = useState(false)
    const [editNameValue,setEditNameValue] = useState('')
    const [voted,setVoted] = useState(false)
    const [myPage, setMyPage] =useState({})

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





    const MyPage = async(wallet) => {
        if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
        const resultAccount = await axios.get(mypage + wallet)
        .then(res=>res)
        .then(err=>err)
        setMyPage(resultAccount)
    }
    const EnrollWallet = async(wallet) => {
        if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
        const resultEnrollWallet =  await axios.post(enroll + wallet)
        .then(res=>res.data)
        .then(err=>err)
        setIsEnroll(resultEnrollWallet)
    }



    const FaucetWallet = async(wallet) => {
        if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
        const faucetJSON = {'wallet':wallet}
        const resultFaucetWallet = await axios.put(faucet + wallet,faucetJSON)
        .then(res=>res.data.status)
        .catch((error)=>{
            if(error.response.data.message==='user has already used the faucet'){setIsFaucet(true)}
        })
        return resultFaucetWallet
    }

    const Change =()=>{
        ChName(account,editNameValue)
        MyPage(account)
        setEditName(false)
    }
    const faucetBtn=()=>{
        console.log(FaucetWallet(account))
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
    const dividendTimeLimit = (59-new Date().getMinutes())%5+":"+(59-new Date().getSeconds())
    // header===================================================================

    // public disclosure===================================================================
    const [coorpName,setCoorpName] = useState('')
    // const [isDate, setIsDate] = useState(0);
    let [circuitBreakerTimer,setCircuitBreakerTimer] = useState(60)
    
    let i = 60 ;

    useEffect(()=>{
        if(isCircuitBreaker){
        const setTime = setInterval(()=>{
            if(i>0){
                i--
                setCircuitBreakerTimer(i)
            }else{
                clearInterval(setTime)
                setIsCircuitBreaker(false)
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
    const EntaTokenContract = new web3.eth.Contract(StABI, "0x7E8D575B3f4a8f419977CEDc14B2b7A229E09D07");
    const LeoTokenContract = new web3.eth.Contract(StABI, "0xd0A913d056748C1f33687eE90d3d996599bbeb07");
    const BebTokenContract = new web3.eth.Contract(StABI, "0xF642aEB3d76fc01149bb10dcD88120528aefDB16");
    const [tokenContract, setTokenConteact] = useState(EntaTokenContract);
    const [isRestricted, setIsRestricted] = useState(false);

    
    // console.log(curPrice)
    function contractChange(token){
        if(token === 'enta') setTokenConteact(EntaTokenContract)
        if(token === 'beb') setTokenConteact(BebTokenContract)
        if(token === 'leo') setTokenConteact(LeoTokenContract)
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


    useEffect(() => {

        /* console.log(userEth)
        console.log(currentPrice) */
    })

    // useEffect(()=>{

    // },[currentPrice,account,offset])

    // useEffect(()=>{
    // })


    // //======account=====================================
    // useEffect(()=>{

    //     },[account,editNameValue,editName]);

    // //======account=====================================


    // //======asset detail=====================================



        // useEffect(() => {

        // },[userAccount])
    
    
return(
    <div className="main_page" onMouseEnter={onMouseEnterHandler}>
        <WelcomePage
            isWelcome={isWelcome}
            setIsWelcome={setIsWelcome}
            account={account}
            tutorialCnt={isEnroll.cnt}
            isLoading={isLoading}
        />
        <Header 
            ratio={ratio}
            voted={voted}
            dividendTimeLimit={dividendTimeLimit}
            isFaucet={isFaucet}
            mypage={mypage}
            editName={editName}
            account={account}
            isEnroll={isEnroll}
            active={active}
            walletConnected = {walletConnected}
            isLoading = {isLoading}
            totalCurrentPrices={currentPrice.totalCurrentPrices}
            stName={stName}
            companyPD={companyPD}
            OPTIONS={OPTIONS}
            setStName={setStName}
            onMouseEnter={onMouseEnterHandler}
            setWalletConnected = {setWalletConnected}
            handleConnect={handleConnect}
            setEditName={setEditName}
            Change={Change}
            setEditNameValue={setEditNameValue}
            faucetBtn={faucetBtn}
            setVoted={setVoted}
            setRatio={setRatio}
        />
        <Navigator
            circuitBreakerTimer={circuitBreakerTimer}
            coorpName={coorpName}
            totalCurrentPrices={currentPrice.totalCurrentPrices}
            stName={stName}
            setStName={setStName}
            companyPD={companyPD}
            isCircuitBreaker={isCircuitBreaker}
            setIsCircuitBreaker={setIsCircuitBreaker}
            OPTIONS={OPTIONS}
        />
        <div className="main_head">
            <ChartWrapper
                chartTermArr={chartTermArr}
                setTermValue={setTermValue}
                term={term}
                isLoading={isLoading}
                defaultLimit={defaultLimit}
                setDataLength={setDataLength}
                dataLength={dataLength}
                ST_Name={ST_Name}
                tokenName={tokenName}
                setTokenName={setTokenName}
                currentPrice={currentPrice}
                setTotalChartData={setTotalChartData}
            />
            <LimitOrderBook
                powerOfMarket={-powerOfMarket}
                ST_CurrentPrice={currentPrice.close} 
            />
            <Order
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
                ST_Name={ST_Name}
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
            />
        </div>
        <div className="main_bottom">
            <Historys
                handleConnect={handleConnect}
                account={account}
                positions={positions}
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
            setIsCircuitBreaker={setIsCircuitBreaker}
        />
    </div>
    )
}
export default MainPage
