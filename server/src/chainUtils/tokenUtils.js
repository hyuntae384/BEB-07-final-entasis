const { tokenContract, web3Http } = require('./index');

const { ADMIN_ADDRESS, ADMIN_PK, TOKEN_CA, GAS, GASPRICE } = process.env;

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

const getTotalSupply = async () => {
  try {
    const totalSupply = await tokenContract.methods.totalSupply().call();
    return totalSupply;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getSimpleTotalSupply = async () => {
  try {
    const totalSupply = await tokenContract.methods.simpleTotalSupply().call();
    return totalSupply;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getTokenBalance = async (account) => {
  try {
    const balance = await tokenContract.methods.balanceOf(account).call();
    return balance;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getSimpleTokenBalance = async (account) => {
  try {
    const balance = await tokenContract.methods.simpleBalanceOf(account).call();
    return balance;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getTokenName = async () => {
  try {
    const name = await tokenContract.methods.name().call();
    return name;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const sendTokenToUser = async (recipient, amount) => {
  const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
  const weiAmount = web3Http.utils.toWei(amount, 'ether');
  try {
    const bytedata = await tokenContract.methods.transfer(recipient, weiAmount).encodeABI();
    const tx = {
      from: ADMIN_ADDRESS,
      to: TOKEN_CA,
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
const restrictToken = async () => {
  const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
  try{
    const bytedata = await tokenContract.methods.restrictToken().encodeABI();
    const tx = {
      from: ADMIN_ADDRESS,
      gasPrice:GASPRICE,
      gas: GAS,
      to: TOKEN_CA,
      data: bytedata
    }
    return signAndSendTx(adminAccount, tx);
  } catch (err) {
    console.error(err);
    return false;
  }
};

// 거래 재허용 함수
const allowToken = async () => {
  const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
  try{
    const bytedata = await tokenContract.methods.allowToken().encodeABI();
    const tx = {
      from: ADMIN_ADDRESS,
      gasPrice:GASPRICE,
      gas: GAS,
      to: TOKEN_CA,
      data: bytedata
    }
    return signAndSendTx(adminAccount, tx);
  } catch (err) {
    console.error(err);
    return false;
  }
};

// 거래 제한 여부 확인 함수
const isRestricted = async () => {
  try{
    const isRestricted = await tokenContract.methods.isRestricted().call();
    return isRestricted;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const showAllTokenHolders = async () => {
  try {
    const tokenholders = await tokenContract.methods.showAllTokenHolders().call();
    return tokenholders;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = { 
  getTotalSupply,
  getSimpleTotalSupply,
  getTokenBalance, 
  getSimpleTokenBalance,
  getTokenName, 
  signAndSendTx, 
  sendTokenToUser,
  restrictToken,
  allowToken,
  isRestricted,
  showAllTokenHolders
};