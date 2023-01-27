const { web3Http } = require('./index');

const { ADMIN_ADDRESS } = process.env;

const depositFaucet = async (recipient, value = '10') => { // faucet 얼마나 할지 설정 필요
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
    await web3Http.eth.sendTransaction({
      from: ADMIN_ADDRESS,
      to: recipient,
      value: value,
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports = { depositFaucet, sendEtherToUser };