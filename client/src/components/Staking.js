import { useState , useEffect} from "react"
import { useTranslation } from "react-i18next";

const Staking =({setStaking,stName,tokenContract,setTokenName,userAccount,web3,curPrice,userEntaToken,userBebToken,userLeoToken})=>{
    const {t} = useTranslation();
    const [restTime, setRestTime] = useState("")
    const [amount, setAmount]  = useState("0")
    const [isStake,setIsStake] = useState(0)
    const [token, setToken] = useState("enta")
    const [tokenReward, setTokenReward] = useState("0")

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
        console.log(amount)
    }

    if(stName === 'ENTAToken') setTokenName('enta')
    if(stName === 'BEBToken') setTokenName('beb')
    if(stName === 'LEOToken') setTokenName('leo')

    async function finishUnixTime(){
        if(isStake == 0) return setRestTime("Any Token Staked")
        const time = await tokenContract.methods.showFinishAt(userAccount).call()
        if(time == 0) return setRestTime("Any Token Staked")
        const date = new Date(time*1000)
        setRestTime(date.toString())
    }

    useEffect(() => {
        finishUnixTime()
        checkStake()
        getTokenBalance()
        getRewardOf()
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
        })
    }

    async function getTokenBalance(){
        if(stName === 'ENTAToken') setToken(userEntaToken)
        if(stName === 'BEBToken') setToken(userBebToken)
        if(stName === 'LEOToken') setToken(userLeoToken)
    }

    async function getRewardOf(){
        const reward = await tokenContract.methods.rewardOf(userAccount).call()
        setTokenReward(web3.utils.fromWei(reward, 'ether'))
    }


    return(
        <div>
            <div>{stName}</div>
            <h5>{t("Available Token")} : {token}</h5>
            <input type="text" onChange={e => amountChange(e)} placeholder={"Amount"}></input>
            <div>
                <button onClick={stake}>{t("Staking")}</button>
            </div><br/>
            <div>
                <h5>{t("Available Withdraw Time")}</h5>
                <h6>{restTime}</h6>
                <button onClick={reward}>{t("Reward")}</button>
            </div>
            <div>
                <h5>{t("Token Reward")} : {tokenReward}</h5>
            </div>
            <div>
                <button onClick={changeOrder}>Order</button>
            </div>
        </div>
    )
}

export default Staking