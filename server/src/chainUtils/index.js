require('dotenv').config({ path: '../.env'});

const { WEB3NETWORK, TOKEN_CA, ADMIN_PK } = process.env;
//if (!ADMIN_PK) throw new Error('.env not configured!');

const Web3 = require('web3');
const TokenABI = require('./ABIs/ERC1400.json').abi; // 생성해야함

const web3Endpoint = 'http://18.182.9.156:8545/';

const web3Http = new Web3(new Web3.providers.HttpProvider(web3Endpoint));

const tokenContract = new web3Http.eth.Contract(TokenABI, TOKEN_CA);

module.exports = { tokenContract, web3Http };