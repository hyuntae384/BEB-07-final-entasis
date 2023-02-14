const { ENTA_Contract, web3Http } = require('./index');

const { ADMIN_ADDRESS, ADMIN_PK, ENTA_CA, GAS, GASPRICE } = process.env;

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

const getENTATotalSupply = async () => {
  try {
    const totalSupply = await ENTA_Contract.methods.totalSupply().call();
    return totalSupply;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getENTASimpleTotalSupply = async () => {
  try {
    const totalSupply = await ENTA_Contract.methods.simpleTotalSupply().call();
    return totalSupply;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getENTATokenBalance = async (account) => {
  try {
    const balance = await ENTA_Contract.methods.balanceOf(account).call();
    return balance;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getENTASimpleTokenBalance = async (account) => {
  try {
    const balance = await ENTA_Contract.methods.simpleBalanceOf(account).call();
    return balance;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getENTATokenName = async () => {
  try {
    const name = await ENTA_Contract.methods.name().call();
    return name;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const sendENTATokenToUser = async (recipient, amount) => {
  const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
  const weiAmount = web3Http.utils.toWei(amount, 'ether');
  try {
    const bytedata = await ENTA_Contract.methods.transfer(recipient, weiAmount).encodeABI();
    const tx = {
      from: ADMIN_ADDRESS,
      to: ENTA_CA,
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
const restrictENTAToken = async () => {
  const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
  try{
    const bytedata = await ENTA_Contract.methods.restrictToken().encodeABI();
    const tx = {
      from: ADMIN_ADDRESS,
      gasPrice:GASPRICE,
      gas: GAS,
      to: ENTA_CA,
      data: bytedata
    }
    return signAndSendTx(adminAccount, tx);
  } catch (err) {
    console.error(err);
    return false;
  }
};

// 거래 재허용 함수
const allowENTAToken = async () => {
  const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
  try{
    const bytedata = await ENTA_Contract.methods.allowToken().encodeABI();
    const tx = {
      from: ADMIN_ADDRESS,
      gasPrice:GASPRICE,
      gas: GAS,
      to: ENTA_CA,
      data: bytedata
    }
    return signAndSendTx(adminAccount, tx);
  } catch (err) {
    console.error(err);
    return false;
  }
};

// 거래 제한 여부 확인 함수
const isRestrictedENTA = async () => {
  try{
    const isRestricted = await ENTA_Contract.methods.isRestricted().call();
    return isRestricted;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const showAllENTATokenHolders = async () => {
  try {
    const tokenholders = await ENTA_Contract.methods.showAllTokenHolders().call();
    return tokenholders;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = { 
  getENTATotalSupply,
  getENTASimpleTotalSupply,
  getENTATokenBalance, 
  getENTASimpleTokenBalance,
  getENTATokenName, 
  signAndSendTx, 
  sendENTATokenToUser,
  restrictENTAToken,
  allowENTAToken,
  isRestrictedENTA,
  showAllENTATokenHolders
};