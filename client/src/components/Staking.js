import { useState , useEffect} from "react"
import { useTranslation } from "react-i18next";
import {Stake, Reward} from '../apis/token';

const Staking =({setStaking,stName,tokenContract,setTokenName,userAccount,web3,curPrice,userEntaToken,userBebToken,userLeoToken,bebStakeToken,entaStakeToken,leoStakeToken,entaStakeReward,bebStakeReward,leoStakeReward,tokenName})=>{
    const {t} = useTranslation();
    const [restTime, setRestTime] = useState("")
    const [amount, setAmount]  = useState("0")
    const [isStake,setIsStake] = useState(0)
    const [token, setToken] = useState("enta")
    const [countTime, setCountTime] = useState("Any Token Staked")
    const [dateTime, setDateTime] = useState("")

    // tokenContract.methods.showFinishAt(userAccount).call().then(console.log)
    // tokenContract.methods.stakeOf(userAccount).call().then(console.log)
    
    async function checkStake() {
        const check = await tokenContract.methods.stakeOf(userAccount).call()
        setIsStake(check)
    }

    function changeOrder() {
        setStaking(false)
    }

    function amountChange(e) {
        setAmount(e.target.value)
    }

    function changeMonth(month) {
        if(month =="Jan") return "01"
        if(month =="Feb") return "02"
        if(month =="Mar") return "03"
        if(month =="Apr") return "04"
        if(month =="May") return "05"
        if(month =="Jun") return "06"
        if(month =="Jul") return "07"
        if(month =="Aug") return "08"
        if(month =="Sep") return "09"
        if(month =="Oct") return "10"
        if(month =="Nov") return "11"
        if(month =="Dec") return "12"
    }

    if(stName === 'ENTAToken') setTokenName('enta')
    if(stName === 'BEBToken') setTokenName('beb')
    if(stName === 'LEOToken') setTokenName('leo')

    async function finishUnixTime(){
        if(isStake == 0) return (
            setCountTime("Any Token Staked"),
            setDateTime(''))
        const time = await tokenContract.methods.showFinishAt(userAccount).call()
        const date = new Date(time*1000)
        const realTime = String(Date.now()).slice(0,10)
        const leftTime = time*1000 - realTime*1000
        if(Number(leftTime) <= 0) return (
            setCountTime("Able"),
            setRestTime(0)
            )
        const returnTime = leftTime/1000
        const split = (date.toString()).split(" ")
        const resultDate = `${split[3]} ${changeMonth(split[1])} ${split[2]} ${split[4]}`
        setDateTime(resultDate)
        setRestTime(returnTime)
    }

    function getLeftTime(seconds) {
        if(seconds === 0) return setCountTime("Able")
        const hour = parseInt(seconds/3600);
        const min = parseInt((seconds%3600)/60);
        const sec = seconds%60;
        const time = `${hour}시 : ${min}분 : ${sec}초`
        setCountTime(time)
        }

    useEffect(() => {
        getLeftTime(restTime)
        finishUnixTime()
    },[new Date().getSeconds()])

    useEffect(() => {
        checkStake()
        getTokenBalance()
    },[curPrice])

    async function stake(){
        const data = await tokenContract.methods.createStake(web3.utils.toWei(amount)).encodeABI()
        const tx = {
            from: userAccount,
            to: tokenContract._address,
            data: data,
            gas: 210000,
            gasPrice: 100000000
        }
        await web3.eth.sendTransaction(tx).then(function(receipt){
            console.log(receipt)
            Stake(tokenName, String(curPrice), String(amount), userAccount, receipt.transactionHash)
        })
    }

    async function reward(){
        const data = await tokenContract.methods.withdrawReward().encodeABI()
        const tx = {
            from: userAccount,
            to: tokenContract._address,
            data: data,
            gas: 210000,
            gasPrice: 100000000
        }
        await web3.eth.sendTransaction(tx).then(function(receipt){
            console.log(receipt)
            Reward(tokenName, String(curPrice), String(amount), userAccount, receipt.transactionHash)
        })
    }

    async function getTokenBalance(){
        if(stName === 'ENTAToken') setToken(userEntaToken)
        if(stName === 'BEBToken') setToken(userBebToken)
        if(stName === 'LEOToken') setToken(userLeoToken)
    }

    function CheckAble() {
        if(countTime ==="Any Token Staked"){
            return (
                <h5>Start Staking</h5>)
        }
        if(countTime ==="Able"){
            return (
                <div className="make_reward">
                    <button type="button" className="staking_reward" onClick={reward}>
                        <h5>Reward</h5>
                    </button>
                </div>)
        }
        else return (
            <div className="make_reward">
                <button type="button" className="cant_reward">
                    <h5>Reward</h5>
                </button>
            </div>)

    }

    // 출금까지 남은 시간 표시
    // 출금 가능 시간에 따라서 버튼 활성 시각화
    

    return(
        <div className="order">
            <div className="order_mode">
            {/* <h3>Limit</h3> */}
            <h3>{t("Market Order")}</h3>
            <h3 onClick={changeOrder}>Order</h3>

            {/* <div className="order_select">
                <SelectBox
                    set={ST_Name}
                    termValue={stName}
                    value={setStName}
                ></SelectBox>
            </div> */}
            </div>
            <form>
                <h6 className="order_available">{t("Available Token")} : {token} {stName}</h6>
                <input type="text" className="order_price" placeholder={curPrice} readOnly></input>
                <input type="text" className="order_amount" onChange={e => amountChange(e)} placeholder={t("Amount")}></input>
                <div className="make_staking">
                    <button type="button" className="staking_stake" onClick={stake}>
                        <h5>Staking</h5>
                    </button>
                </div>
            </form>
            <div className='assets'>
                <div className="total_assets">
                    <h4>Stake Amount List</h4>
                </div>      
                <div className='assets_wraper'>
                    <h6>ENTAToken : {entaStakeToken}</h6>
                    <h6>BEBToken : {bebStakeToken}</h6>
                    <h6>LEOToken : {leoStakeToken}</h6>
                </div>
            </div>
            <div className='assets'>
                <div className="total_assets">
                    <h4>Staking Reward List</h4>
                </div>      
                <div className='assets_wraper'>
                    <h6>{entaStakeReward} ENTA</h6>
                    <h6>{bebStakeReward} BEB</h6>
                    <h6>{leoStakeReward} LEO</h6>
                </div>
            </div>
            <div className='deposit'>
                <h4>Available Reward Time</h4>
                <div className='deposit_wrapper'>
                    <h5>{dateTime}</h5>
                    <div className='deposit_faucet'>
                        <h5>{countTime}</h5>
                    </div>
                    <CheckAble/>
                </div>
            </div>
        </div>
    )
}






export default Staking