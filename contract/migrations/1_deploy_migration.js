const ERC1400 = artifacts.require('ERC1400');
module.exports = async function(deployer) {
  deployer.deploy(ERC1400, 'ENTAToken', 'ENTA','0x257AF04ddA3Ec52297857af8faA97A96A3bDe451'); // 가나슈 재실행시 수정 필요!
  // const token = await ERC1400.deployed();
}