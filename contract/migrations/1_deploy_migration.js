const ERC1400 = artifacts.require('ERC1400');
module.exports = async function(deployer) {
  deployer.deploy(ERC1400, 'ENTAToken', 'ENTA', '0xD60e1416BE8657b8858443f2320D007672056eF5'); // 가나슈 재실행시 수정 필요!
  // const token = await ERC1400.deployed();
}