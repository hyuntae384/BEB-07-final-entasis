require('dotenv').config();
const ERC1400 = artifact.require('ERC1400');

module.exports = async function(deployer) {
  deployer.deploy(ERC1400, 'ENTAToken', 'ENTA', process.env.ADMIN_ADDRESS);
  // const token = await ERC1400.deployed();
}