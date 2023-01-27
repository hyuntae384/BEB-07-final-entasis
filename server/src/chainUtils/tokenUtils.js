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

const sendTokenToUser = async (recipient, amount) => {
  const adminAccount = web3Http.eth.accounts.privateKeyToAccount(ADMIN_PK);
  try {
    const bytedata = await tokenContract.methods.transfer(recipient, amount).encodeABI();
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
}

module.exports = { getTokenBalance, getTokenName, signAndSendTx, sendTokenToUser };