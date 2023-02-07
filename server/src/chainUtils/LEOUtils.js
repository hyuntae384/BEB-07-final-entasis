const { LEO_Contract, web3Http } = require('./index');

const { ADMIN_ADDRESS, ADMIN_PK, LEO_CA, GAS, GASPRICE } = process.env;

const signAndSendTx = async (account, tx) => {
  try {
    const signedTx = await account.signTransaction(tx);
    const sentTx = await web3Http.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );
    return sentTx;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getLEOTotalSupply = async () => {
  try {
    const totalSupply = await LEO_Contract.methods.totalSupply().call();
    return totalSupply;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getLEOSimpleTotalSupply = async () => {
  try {
    const totalSupply = await LEO_Contract.methods.simpleTotalSupply().call();
    return totalSupply;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getLEOTokenBalance = async (account) => {
  try {
    const balance = await LEO_Contract.methods.balanceOf(account).call();
    return balance;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getLEOSimpleTokenBalance = async (account) => {
  try {
    const balance = await LEO_Contract.methods.simpleBalanceOf(account).call();
    return balance;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getLEOTokenName = async () => {
  try {
    const name = await LEO_Contract.methods.name().call();
    return name;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const sendLEOTokenToUser = async (recipient, amount) => {
  const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
  const weiAmount = web3Http.utils.toWei(amount, 'ether');
  try {
    const bytedata = await LEO_Contract.methods.transfer(recipient, weiAmount).encodeABI();
    const tx = {
      from: ADMIN_ADDRESS,
      to: LEO_CA,
      amount,
      gas: GAS,
      gasPrice: GASPRICE,
      data: bytedata,
    };
    return signAndSendTx(adminAccount, tx);
  } catch (err) {
    console.error(err);
    return false;
  }
};

// 거래 제한 함수
const restrictLEOToken = async () => {
  const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
  try{
    const bytedata = await LEO_Contract.methods.restrictToken().encodeABI();
    const tx = {
      from: ADMIN_ADDRESS,
      gasPrice:GASPRICE,
      gas: GAS,
      to: LEO_CA,
      data: bytedata
    }
    return signAndSendTx(adminAccount, tx);
  } catch (err) {
    console.error(err);
    return false;
  }
};

// 거래 재허용 함수
const allowLEOToken = async () => {
  const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
  try{
    const bytedata = await LEO_Contract.methods.allowToken().encodeABI();
    const tx = {
      from: ADMIN_ADDRESS,
      gasPrice:GASPRICE,
      gas: GAS,
      to: LEO_CA,
      data: bytedata
    }
    return signAndSendTx(adminAccount, tx);
  } catch (err) {
    console.error(err);
    return false;
  }
};

// 거래 제한 여부 확인 함수
const isRestrictedLEO = async () => {
  try{
    const isRestricted = await LEO_Contract.methods.isRestricted().call();
    return isRestricted;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const showAllLEOTokenHolders = async () => {
  try {
    const tokenholders = await LEO_Contract.methods.showAllTokenHolders().call();
    return tokenholders;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = { 
  getLEOTotalSupply,
  getLEOSimpleTotalSupply,
  getLEOTokenBalance, 
  getLEOSimpleTokenBalance,
  getLEOTokenName, 
  signAndSendTx, 
  sendLEOTokenToUser,
  restrictLEOToken,
  allowLEOToken,
  isRestrictedLEO,
  showAllLEOTokenHolders
};