const Footer =()=>{

    return(
    <div className="footer">
        <div className="footer_top">
        <div>
            <img src = {require('../assets/images/ENTASIS_white.png')} alt='logo'/>
        </div>
        <div className='footer_top_right'>
            <div className='chains'>
                <i className='fab fa-bitcoin'/>
                <i className='fab fa-ethereum'/>
                </div>
                <div className='social'>
                    <i className='fab fa-facebook-f'/>
                    <i className='fab fa-instagram'/>
                    <i className='fab fa-reddit-alien'/>
                    <i className='fab fa-youtube'/>
                    <i className='fab fa-tiktok'/>
                    <i className='fab fa-google'/>
                    <i className='fab fab fa-apple'/>
                </div>
            </div>
        </div>
        <div className="footer_body">
        <div>

        <h5>블록체인기반 거래소 ENTASIS는</h5>
        <h5>기업의 STO(Security Token Offering : 보안토큰공개)를 </h5>
        <h5>주관하며, 개인은 ST(Security Token: 보안토큰)를 매매 할 수 있다.</h5>
        <h5>ST의 기능은 </h5>
        <h5>지분의 토큰화, </h5>
        <h5>투명한 거래내역 공개,  </h5>
        <h5>차기 배당율 투표로 의결권 행사가 있으며,</h5>
        <h5>기준 이상의 변동성 발생 시 서킷브레이커와 사이드카와 같은 </h5>
        <h5>거래제한 기능을 적용할 수 있다.</h5>
        <h5>기준 이상의 변동성 발생 시 서킷브레이커와 사이드카와 같은 </h5>
        <h5>모든 기능은 스마트 컨트랙트 내에서 이루워지며, </h5>
        <h5>트랜젝션 스캔에서 그 내역을 확인할 수 있다.</h5>
        <h5>ERC - 1400을 기준으로 개발하였다.</h5>
        </div>
        <div className='team_introduce'>
        <h5>윤수빈</h5>
        <h5>김현태</h5>
        <h5>백준석</h5>
        <h5>박도형</h5>
        </div>
        <div></div>
        <div></div>

        </div>
        <div className="footer_bottom">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </div>
    </div>
    )
}
export default Footer