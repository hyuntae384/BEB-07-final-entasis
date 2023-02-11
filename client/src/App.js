import { useWeb3React } from '@web3-react/core';
import {React, useEffect, useState}  from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Header from './components/Header';
import Tutorials from './components/Tutorials';
import { injected } from './connectors';
import MainPage from './pages/MainPage';
import TransactionPage from './pages/TransactionsPage';
import { ChName} from '../src/apis/user'
import axios from 'axios';
import Navigator from './components/Navigator';

function App() {
  const [ratio, setRatio] = useState(0);
  const [voted,setVoted] = useState(false)
  const [isFaucet, setIsFaucet] = useState(false)
  const [editName, setEditName] = useState(false)
  const [isEnroll,setIsEnroll] =useState({});
  const [walletConnected, setWalletConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [isChartTotal, setIsChartTotal] = useState([]);
  const [tokenName, setTokenName] = useState('enta')
  const [chartOriginArr,setChartOriginArr] = useState([]);
  const [chartArr, setChartArr]  = useState([]);
  const [currentPageNum, setCurrentPageNum]=useState(1)
  const [myPage, setMyPage] =useState({})
  const [editNameValue,setEditNameValue] = useState('')
  let [circuitBreakerTimer,setCircuitBreakerTimer] = useState(60)
  const [isCircuitBreaker,setIsCircuitBreaker] = useState(false)
  const [userEth, setUserEth] = useState("")
  const [userEntaToken, setUserEntaToken] = useState("")
  const [userBebToken, setUserBebToken] = useState("")
  const [userLeoToken, setUserLeoToken] = useState("")

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
const [stName, setStName] = useState('ENTAToken');

  const [isWelcome,setIsWelcome]=useState(false)
  const [txs, setTxs] = useState({
    transaction_in:"",
    transaction_out:""
})
const [companyPD, setCompanyPD] =useState([]) 
const [coorpName,setCoorpName] = useState('')


const {chainId, account, active, activate, deactivate} = useWeb3React();

const origin = "52.78.173.200/";
const getUserURL = origin + "user/"; 
const mypage = getUserURL + "mypage/?wallet="
const faucet = getUserURL + "faucet/?wallet="


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

  MyPage(account)
  if(myPage.data!==undefined&&myPage.data.faucet===true) return setIsFaucet(true)
  else if(myPage.data===undefined) return setIsFaucet(false)

}, [new Date().getSeconds(), currentPageNum]);

    useEffect(()=>{
        setChartOriginArr(isChartTotal)
    },[isChartTotal,tokenName])



const OPTIONS = [
  { value: "ENTAToken", name: "ENTA" },
  { value: "BEBToken", name: "BEB" },
  { value: "LEOToken", name: "LEO" },
  ];

const dividendTimeLimit = (59-new Date().getMinutes())%5+":"+(59-new Date().getSeconds())
const onMouseEnterHandler = () => {
  document.body.style.overflow = 'unset';
}
const handleConnect = () => {
  if(active) {
      deactivate();
      localStorage.setItem('isWalletConnected', false)
      return setMyPage({});
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
const Change =()=>{
  ChName(account,editNameValue)
  MyPage(account)
  setEditName(false)
}
const MyPage = async(wallet) => {
  if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
  const resultAccount = await axios.get(mypage + wallet)
  .then(res=>res)
  .then(err=>err)
  setMyPage(resultAccount)
}
const faucetBtn=()=>{
  FaucetWallet(account)
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

console.log(myPage.data)

  return (
    <BrowserRouter>
        <Header
          setMyPage={setMyPage}
          setIsFaucet={setIsFaucet}
          faucetBtn={faucetBtn}
          userEth={userEth}
          setUserEth={setUserEth}
          userEntaToken={userEntaToken}
          userBebToken={userBebToken}
          userLeoToken={userLeoToken}
          setUserEntaToken={setUserEntaToken}
          setUserBebToken={setUserBebToken}
          setUserLeoToken={setUserLeoToken}
          currentPageNum={currentPageNum}
          MyPage={MyPage}
          account={account}
          tokenName={tokenName}
          setIsChartTotal={setIsChartTotal}
          ratio={ratio}
          voted={voted}
          dividendTimeLimit={dividendTimeLimit}
          isFaucet={isFaucet}
          editName={editName}
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
          setVoted={setVoted}
          setRatio={setRatio}
        />
        <Navigator
            ST_Name={OPTIONS}
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
      <Routes>


        <Route path='/' element={<MainPage
          myPage={myPage}
          userEth={userEth}
          setUserEth={setUserEth}
          userEntaToken={userEntaToken}
          userBebToken={userBebToken}
          userLeoToken={userLeoToken}
          setUserEntaToken={setUserEntaToken}
          setUserBebToken={setUserBebToken}
          setUserLeoToken={setUserLeoToken}
          account={account}
          currentPageNum={currentPageNum}
          setIsChartTotal={setIsChartTotal}
          tokenName={tokenName}
          chartArr={chartArr}
          setTxs={setTxs}
          isWelcome={isWelcome}
          setIsWelcome={setIsWelcome}
          chartOriginArr={chartOriginArr}
          setChartOriginArr={setChartOriginArr}
          setChartArr={setChartArr}
          isCircuitBreaker={isCircuitBreaker}
          currentPrice={currentPrice}
          setCurrentPrice={setCurrentPrice}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setCompanyPD={setCompanyPD}
          stName={stName}
          activate={activate}
          setIsEnroll={setIsEnroll}
          ratio={ratio}
          setCircuitBreakerTimer={setCircuitBreakerTimer}
          setIsCircuitBreaker={setIsCircuitBreaker}
          onMouseEnterHandler={onMouseEnterHandler}
          isEnroll={isEnroll}
          setStName={setStName}
          setTokenName={setTokenName}
          faucetBtn={faucetBtn}
          isFaucet={isFaucet}
          OPTIONS={OPTIONS}
          handleConnect={handleConnect}
          setCurrentPageNum={setCurrentPageNum}
          setCoorpName={setCoorpName}
          // ST_CurrentPrice={currentPrice.close} 
          // powerOfMarket={powerOfMarket}
          // userEth={userEth}
          // // userEntaToken={userEntaToken}
          // // userBebToken={userBebToken}
          // // userLeoToken={userLeoToken}
          // setOffset={setOffset}
          // setLimit={setLimit}
          // walletConnected = {walletConnected}
          // setWalletConnected = {setWalletConnected}
          // userPosition={userPosition}
        />}/>
        <Route path='/transaction' element={<TransactionPage
                txs={txs}
                // ST_CurrentPrice={currentPrice.close} 
                // powerOfMarket={powerOfMarket}
                // userEth={userEth}
                // // userBebToken={userBebToken}
                // // userLeoToken={userLeoToken}
                // setOffset={setOffset}
                // setLimit={setLimit}
                // walletConnected = {walletConnected}
                // setWalletConnected = {setWalletConnected}
                // userPosition={userPosition}
        />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
