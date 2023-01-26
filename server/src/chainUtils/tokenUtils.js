const { tokenContract, web3Http } = require('./index');

const { ADMIN_ADDRESS, ADMIN_PK, TOKEN_CA } = process.env;

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
}

const getTokenBalance = async (account) => {
  try {
    const balance = await tokenContract.methods.balanceOf(account).call();
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

const tokenTransfer = async () => {} // msg.sender에 대한 개념 확인 필요

module.exports = { getTokenBalance, getTokenName, signAndSendTx };