const { BEB_Contract, web3Http } = require('./index');

const { ADMIN_ADDRESS, ADMIN_PK, BEB_CA, GAS, GASPRICE } = process.env;

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

const getBEBTotalSupply = async () => {
  try {
    const totalSupply = await BEB_Contract.methods.totalSupply().call();
    return totalSupply;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getBEBSimpleTotalSupply = async () => {
  try {
    const totalSupply = await BEB_Contract.methods.simpleTotalSupply().call();
    return totalSupply;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getBEBTokenBalance = async (account) => {
  try {
    const balance = await BEB_Contract.methods.balanceOf(account).call();
    return balance;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getBEBSimpleTokenBalance = async (account) => {
  try {
    const balance = await BEB_Contract.methods.simpleBalanceOf(account).call();
    return balance;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getBEBTokenName = async () => {
  try {
    const name = await BEB_Contract.methods.name().call();
    return name;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const sendBEBTokenToUser = async (recipient, amount) => {
  const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
  const weiAmount = web3Http.utils.toWei(amount, 'ether');
  try {
    const bytedata = await BEB_Contract.methods.transfer(recipient, weiAmount).encodeABI();
    const tx = {
      from: ADMIN_ADDRESS,
      to: BEB_CA,
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
const restrictBEBToken = async () => {
  const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
  try{
    const bytedata = await BEB_Contract.methods.restrictToken().encodeABI();
    const tx = {
      from: ADMIN_ADDRESS,
      gasPrice:GASPRICE,
      gas: GAS,
      to: BEB_CA,
      data: bytedata
    }
    return signAndSendTx(adminAccount, tx);
  } catch (err) {
    console.error(err);
    return false;
  }
};

// 거래 재허용 함수
const allowBEBToken = async () => {
  const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
  try{
    const bytedata = await BEB_Contract.methods.allowToken().encodeABI();
    const tx = {
      from: ADMIN_ADDRESS,
      gasPrice:GASPRICE,
      gas: GAS,
      to: BEB_CA,
      data: bytedata
    }
    return signAndSendTx(adminAccount, tx);
  } catch (err) {
    console.error(err);
    return false;
  }
};

// 거래 제한 여부 확인 함수
const isRestrictedBEB = async () => {
  try{
    const isRestricted = await BEB_Contract.methods.isRestricted().call();
    return isRestricted;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const showAllBEBTokenHolders = async () => {
  try {
    const tokenholders = await BEB_Contract.methods.showAllTokenHolders().call();
    return tokenholders;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = { 
  getBEBTotalSupply,
  getBEBSimpleTotalSupply,
  getBEBTokenBalance, 
  getBEBSimpleTokenBalance,
  getBEBTokenName, 
  signAndSendTx, 
  sendBEBTokenToUser,
  restrictBEBToken,
  allowBEBToken,
  isRestrictedBEB,
  showAllBEBTokenHolders
};