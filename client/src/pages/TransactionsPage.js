import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Header from '../components/Header';
import Navigator from '../components/Navigator';
import Web3 from "web3";
import TokenABI from "../ABIs/ERC1400.json"

const TransactionPage =()=>{
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

    const web3 = new Web3(
        window.ethereum || "http://18.182.9.156:8545"
    );
    const contractAccount = '0x04794606b3065df94ef3398aA2911e56abE169B6';
    const StABI = TokenABI.abi
    const tokenContract = new web3.eth.Contract(StABI, contractAccount);
    const [transaction, setTransaction] = useState()
    const [txObj, setTxObj] = useState([]);
    const BN = web3.utils.BN;

    async function getTx(tx) {
        const txdata =  await web3.eth.getTransaction(tx)
        setTxObj(txdata)
    }

    async function TxAddress(e) {
        setTransaction(e.target.value)
        console.log(transaction)
    }

    useEffect(() =>{
        getTx(transaction);
    },[transaction])

return(
    <div className='transaction'>
        <Header/>
        <Navigator/>
        <div className="show_transaction">
            {/* <button type="button" className="button_transaction" onClick={console.log(txObj)}>
                <h5>Get Transaction info</h5>
            </button> */}
            <input type="text" className="input_transaction" onChange={e => TxAddress(e)} placeholder='0x0000000.....'></input>
        </div>
        <div className='info'>
            {(txObj === null) ? 'Write Transaction Hash' : <div>
                <div>Transaction Hash : {transaction}</div>
                <div>Block Hash : {txObj.blockHash}</div>
                <div>Block Number : {txObj.blockNumber}</div>
                <div>From : {txObj.from}</div>
                <div>To : {txObj.to}</div>
                <div>Gas : {txObj.gas}</div>
                <div>Gas Price : {txObj.gasPrice}</div>
                <div>Input : {txObj.input}</div>
                <div>Nonce : {txObj.nonce}</div>
                <div>Transaction Index : {txObj.transactionIndex}</div>
                <div>value : {web3.utils.fromWei(BN(txObj.value).toString(), 'ether')}</div>
            </div>}<br/>
            {(txObj === null) ? 'Write Transaction Hash' : <div>
                <div>Transaction Hash : {transaction}</div>
                <div>Block Hash : {txObj.blockHash}</div>
                <div>Block Number : {txObj.blockNumber}</div>
                <div>From : {txObj.from}</div>
                <div>To : {txObj.to}</div>
                <div>Gas : {txObj.gas}</div>
                <div>Gas Price : {txObj.gasPrice}</div>
                <div>Input : {txObj.input}</div>
                <div>Nonce : {txObj.nonce}</div>
                <div>Transaction Index : {txObj.transactionIndex}</div>
                <div>value : {web3.utils.fromWei(BN(txObj.value).toString(), 'ether')}</div>
            </div>}
        </div>
        {/* <div>Blockchain Explorer</div>
        <div>Search</div>
        <div>Security Token Price</div>
        <div>Blockchain Explorer</div>
        <div>Block  #16538530</div>
        <div>Overview</div>
        <div>Consensus Info</div>
        <div>Comments</div>
        <div>Block Height: 16538530</div>
        <div>Status: Unfinalized</div>
        <div>Timestamp: 1 min ago (Feb-02-2023 03:46:47 AM +UTC)</div>
        <div>Proposed On: Block proposed on slot 5707132, epoch 178347</div>
        <div>Transactions: 87 transactions and 26 contract internal transactions in this block</div>
        <div>Fee Recipient: 0x3bee5122e2a2fbe11287aafb0cb918e22abb5436 (MEV Builder: 0x3B...436) in 12 secs</div>
        <div>Block Reward: 0.011897638841446206 Ether (0 + 0.161741941286184726 - 0.14984430244473852)</div>
        <div>Total Difficulty: 58,750,003,716,598,352,816,469</div>
        <div>Size: 31,667 bytes</div>
        <div>Gas Used: 7,121,505 (23.74%)
        -53% Gas Target</div>
        <div>Gas Limit: 30,000,000</div>
        <div>Base Fee Per Gas: 0.000000021041100504 Ether (21.041100504 Gwei)</div>
        <div>Burnt Fees: 🔥 0.14984430244473852 Ether</div>
        <div>Extra Data: 0x (Hex:Null)</div>
        <div>Hash: 0xcdd77ff699d4bba3ba7df16d54b20f4c0a580321d302657ab1abb65d0115d23f</div>
        <div>Parent Hash: 0xf372f918981c8dd0dd67f96118d1c8a9b822d52921ff7579c97a29606d67288d</div>
        <div>StateRoot: 0x66470eb855af73703ea30139a76bed8624617ec9e2c3595876c100f077fecaab</div>
        <div>Nonce: 0x0000000000000000</div> */}
    </div>
)
}
export default TransactionPage