const BEB_ST = artifacts.require('ERC1400');
module.exports = async function(deployer) {
  deployer.deploy(BEB_ST, 'BEBToken', 'BEB', '0x48c02B8aFddD9563cEF6703df4DCE1DB78A6b2Eb'); // 가나슈 재실행시 수정 필요!
}