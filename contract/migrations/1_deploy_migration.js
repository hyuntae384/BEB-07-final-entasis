const ERC1400 = artifacts.require('ERC1400');
module.exports = async function(deployer) {
  deployer.deploy(ERC1400, 'ENTAToken', 'ENTA', '0x17585470A862DAc925FEBDE93318B924cD2Fe4fe'); // 가나슈 재실행시 수정 필요!
  // const token = await ERC1400.deployed();
}