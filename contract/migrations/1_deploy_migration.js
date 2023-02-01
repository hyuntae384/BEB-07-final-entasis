const ERC1400 = artifacts.require('ERC1400');
module.exports = async function(deployer) {
  deployer.deploy(ERC1400, 'ENTAToken', 'ENTA', '0x1289E91BB5Fd7F7769E367AAdEaD3Ee1a1829e69'); // 가나슈 재실행시 수정 필요!
  // const token = await ERC1400.deployed();
}