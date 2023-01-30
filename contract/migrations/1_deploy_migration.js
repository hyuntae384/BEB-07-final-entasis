const ERC1400 = artifacts.require('ERC1400');
module.exports = async function(deployer) {
  deployer.deploy(ERC1400, 'ENTAToken', 'ENTA', '0xB01cBF8A6E692DA1EED2B7143cFBb9e8C4B164bf'); // 가나슈 재실행시 수정 필요!
  // const token = await ERC1400.deployed();
}