require('dotenv').config({ path: '../.env'});

const { ENTA_CA, BEB_CA, LEO_CA } = process.env;
//if (!ADMIN_PK) throw new Error('.env not configured!');

const Web3 = require('web3');
const TokenABI = require('./ABIs/ERC1400.json').abi; // 생성해야함

const web3Endpoint = 'http://18.183.252.200:8545/';

const web3Http = new Web3(new Web3.providers.HttpProvider(web3Endpoint));

const ENTA_Contract = new web3Http.eth.Contract(TokenABI, ENTA_CA);
const BEB_Contract = new web3Http.eth.Contract(TokenABI, BEB_CA);
const LEO_Contract = new web3Http.eth.Contract(TokenABI, LEO_CA);

module.exports = { ENTA_Contract, BEB_Contract, LEO_Contract, web3Http };