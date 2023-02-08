const BEB_ST = artifacts.require('ERC1400');
module.exports = async function(deployer) {
  deployer.deploy(BEB_ST, 'BEBToken', 'BEB', '0xcF2d1489aa02781EED54C7E531d91668Bd3f3703'); // 가나슈 재실행시 수정 필요!
}