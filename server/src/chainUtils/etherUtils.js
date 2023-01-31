const { web3Http, Web3 } = require('./index');

const { ADMIN_ADDRESS } = process.env;

const depositFaucet = async (recipient, value = '10000000000000000000') => { // faucet 얼마나 할지 설정 필요
  try { 
    await web3Http.eth.sendTransaction({
      from: ADMIN_ADDRESS,
      to: recipient,
      value,
    });
    return true
  } catch (err) {
    console.error(err);
    return false;
  }
};

const sendEtherToUser = async (recipient, value) =>{
  try {
    const weiValue = web3Http.utils.toWei(value, 'ether')
    await web3Http.eth.sendTransaction({
      from: ADMIN_ADDRESS,
      to: recipient,
      value: weiValue,
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// 이더 잔액 가져오는 함수
const getEtherBalance = async (address) => {
  try {
    const balance = await web3Http.eth.getBalance(address)
    return balance;
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports = { depositFaucet, sendEtherToUser, getEtherBalance };