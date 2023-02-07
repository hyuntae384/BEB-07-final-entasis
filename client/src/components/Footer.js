import axios from 'axios';
import { useState } from 'react';

const Footer =({setIsCircuitBreaker})=>{
    const [isRestricted,setIsRestricted] = useState({});

    const restrict = "http://localhost:5050/restrict";

    const Restrict = async(wallet) => {
        setIsCircuitBreaker(true)
        if(wallet===null || wallet ===undefined)return new Error('Invalid Request!')
        const resultRestrict =  await axios.post(restrict)
        .then(res=>res.data)
        .then(err=>console.log(err))
        console.log(resultRestrict)
    }
    return(
    <div className="footer">
        <div className="footer_top">
            <div className='footer_top_left'>
                <h5>블록체인기반 거래소 ENTASIS</h5>
                <h5>기업의 자금 조달을 위한 STO(Security Token Offering : 보안토큰공개)를 </h5>
                <h5>주관하며, 투자자는 ST(Security Token: 보안토큰)를 매매 할 수 있다.</h5>
            </div>

            <div className='footer_top_right'>

                <div className='team_introduce'>
        <h5>윤수빈</h5>
        <h5>김현태</h5>
        <h5>백준석</h5>
        <h5>박도형</h5>
        </div>

            </div>
        </div>
        <div className="footer_body">
        <div className='footer_body_left'>
            <h5>ST의 기능은 지분의 토큰화, 거래내역 공개,  </h5>
            <h5>차기 배당율 투표 의결권 행사가 있으며,</h5>
            <h5>기준 이상의 변동성 발생 시 서킷브레이커와 같은 </h5>
            <h5>거래제한 기능을 적용할 수 있다.</h5>
            <h5>모든 기능은 스마트 컨트랙트 내에서 이루워지며, </h5>
            <h5>트랜젝션 스캔에서 그 내역을 확인할 수 있다.</h5>
            <h5>ERC - 1400을 기준으로 개발하였다.</h5>
        </div>
        <div className='footer_body_right'>
            <div className='circuit_breaker'>
                <div className='circuit_breaker_top'>
                    <div className='circuit_breaker_btn'><img src={require('../assets/images/danger.png')}  onClick={Restrict} alt='danger'></img>
                    </div>
                    <h1>Circuit Breaker</h1>
                </div>
                <h5>                <a className='circuit_breaker_link' href='https://namu.wiki/w/%EC%84%9C%ED%82%B7%EB%B8%8C%EB%A0%88%EC%9D%B4%EC%BB%A4'>Circuit Breaker</a>
는 주가의 급격한 변동으로 주식 시장이 단숨에 붕괴되는 것을 막기 위해 세계 각국에서 도입한 제도. 조건에 맞는 상황이 오면 일정시간 동안 주식시장 거래를 전면 중단시키는 제도이다. 미국은 20분(15분 거래중단+5분 동시호가), 대한민국은 30분(20분 거래중단+10분 동시호가) 거래를 중단시킨다. 다만 하락시에만 발동하는건 아니고 폭등 때도 발동할 수 있다.</h5></div>
        </div>


        </div>
        <div className="footer_bottom">

        </div>
        <img className='footer_foot' src = {require('../assets/images/ENTASIS_white.png')} alt='logo'/>
    </div>
    )
}
export default Footer