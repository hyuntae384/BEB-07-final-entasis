const { users, companys, dividend_his, position_his, price_his } = require('../models');
const { depositFaucet, sendEtherToUser } = require('../chainUtils/etherUtils');
const { getTokenBalance, getTokenName, signAndSendTx, sendTokenToUser } = require('../chainUtils/tokenUtils');

module.exports = {}