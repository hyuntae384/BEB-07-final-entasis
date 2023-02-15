# Project_Entasis
## 소개 영상

https://www.youtube.com/watch?v=0fmODCTVs0g

## 👨‍👨‍👧‍👧 참여자

|Name|Role|Github|Blog|
|---|-----|---|---|
|윤수빈|Frontend|https://github.com/Russ481-k|작성|
|백준석|Frontend|https://github.com/bajnsk|작성|
|김현태|Backend|https://github.com/hyuntae384|https://www.notion.so/_-7eb68268711f40619020318efcaeca0c|
|박도형|Backend|https://github.com/pdhyeong|https://shapespark.tistory.com/|


# **Security Token Trading Platform Tutorial**

### "당신은 STO에 대해 알고 계십니까?"

이 질문을 받는 대부분의 사람들은 잘 모른다고 답할 것입니다. 주식, 채권, 코인 등에 투자를 한 경험은 많지만, 대다수의 사람들이 STO에 대해서는 모르는 만큼, 투자자의 입장에서 STO가 무엇이고, 어떤 기능이 있으며, 어떻게 투자할 수 있는지를 이 프로젝트를 통해 이해하도록 도움으로써 증권형 토큰에 대한 투자를 확대시키는 것이 이 프로젝트의 목표입니다.

 글로벌 자산운용사 블랙록의 대표 **래리핑크**는 2022. 12. 1. 인터뷰에서 STO를 통해 현재 증권 거래 비용에 포함된 브로커들의 수수료를 매매 당사자들에게 나누어주며 수수료가 낮아질 것이고 투표 또한 ST 소유자들이 할 수 있게 될 것이라고 말했습니다. 이 블랙록 자산운용사 대표의 STO에 대한 인식은 프로젝트 주제 선정에 결정에 도움을 주었습니다.
 
 우리가 흔히 알고 있는 토큰은 ICO를 기반한 ‘유틸리티 토큰’ 입니다.

**그렇다면 STO란 무엇일까요?**

![Untitled (4)](https://user-images.githubusercontent.com/113375908/218378018-99a17ba4-a2bb-4b49-8d88-5e7a917f5b04.png)

우선 STO의 기반이 되는 “**증권형 토큰(Secturity Token)**”이 무엇인지에 대해 이해할 필요가 있습니다.

증권형 토큰(일명 ST)은 기업이 주식, 채권 대신 암호화폐 형태로 발행하는 유가 증권입니다. 이 증권형 토큰은 블록체인 플랫폼이 제공하는 서비스를 활용할 권리 대신 주식과 마찬가지로 기업의 법적 소유권을 가졌음을 의미합니다. 때문에 증권형 토큰을 보유하고 있으면 기업 또는 기업의 블록체인 플랫폼이 낸 수익이나 자산의 일부를 배당받을 수 있습니다.

증권형 토큰은 그 용도가 주식, 채권 등 유가증권과 동일하기 때문에 법과 정책의 개입과 규제를 받아야만 합니다. 상법에 정해진 절차에 따라 주식을 발행하듯 관련 법에 따라 증권형 토큰을 발행해야 한다는 것입니다.

이 증권형 토큰을 IPO와 같이 상장하여 거래가 이루어지도록 하는 것이 STO 입니다.

![Untitled (2)](https://user-images.githubusercontent.com/113375908/218378219-0cb8a073-2795-4c90-8fae-330d7aed3740.png)

기존 ICO와 차이점으로는 아래 이미지와 같이 배당금 투표와 그에 따른 배당금 지급 기능, 스테이킹 등의 기능들이 있습니다. 

![Untitled (3)](https://user-images.githubusercontent.com/113375908/218378258-62d6a2e4-8183-4d70-ad3b-c743a6bbd818.png)

# [ About Service ]

우리 Entasis는 실제 STO 거래소의 기능을 일부 축소하여 상대적으로 기업보다 **STO에 대해 접근을 어려워 할 개인 투자자들에게 실제 ST에 투자를 해봄으로써 증권형 토큰에 대해서 더 쉽게 이해하고 접근할 수 있도록 도와주는 “STO 거래소 튜토리얼”**입니다.

## 기본 환경 조성

- **토큰 가격 형성 및 변동성**
    
    실제 거래소에서 Market Maker, Market Taker 와 토큰 매매를 통해 가격이 형성이 되지만, 이 프로젝트를 진행하는데 있어서 튜토리얼이라는 점과 당장 이용자가 없다는 점으로 인해 실제 거래소에서 가격 형성이 되는 방식으로 구현하는 것은 제한된다고 판단하였습니다.
    
    그에 따라 난수를 통해 가격을 형성하고 주기적으로 가격이 변동할 수 있도록 구현하였습니다.
    

- **블록체인**
    - 근본적으로 토큰 거래 기능을 위해 ERC20을 사용하였으며, 증권형 토큰의 기능 일부를 추가하기 위해 ERC1400의 운영자 및 제어자 변수와 거래제한 함수를 발췌하였습니다.
    - 투자자 입장에서 다양한 토큰에 대해서 분석하고 거래를 할 필요가 있다고 판단하여 3개의 기업으로 다양화하여 3개의 컨트랙트를 배포하였으며, 토큰 거래가 이루어질 때마다 해당 토큰 보유자 배열에 저장하여 배당금을 분배할 때 토큰 보유 여부를 확인할 수 있도록 하였습니다.
    - 스테이킹시 토큰 매매 제한을 강제하기 위해서 스테이킹의 모든 기능은 컨트랙트 내에서 구현하였으며, 만료일을 계산하는 데에는 block.timestamp 를 이용하여 만료 여부를 확인할 수 있도록 하였습니다.

## 주요기능
- 1초마다 실시간으로 가격 변동이 일어나는 차트 중심의 한 메인 페이지
- 메타 마스크를 통한 지갑 등록 기능(간편 회원가입 및 로그인)
- 튜토리얼 및 이용법 설명 기능
- FAUCET을 통한 초기 자본금 지급 기능
- ETH를 통한 증권형 토큰 구매 및 판매 기능
- 배당금 투표, 지급 기능
- 거래제한 및 해제 기능
- 스테이킹 기능

***
***

### 프로젝트 자세한 내용들은 아래 위키 링크를 통해 확인하실 수 있습니다

# Index
- 🏠 [Home](https://github.com/codestates-beb/beb-07-final-entasis/wiki)

## Introduce
- 💾 [Product](https://github.com/codestates-beb/beb-07-final-entasis/wiki/Product)
- 🧩 [Function](https://github.com/codestates-beb/beb-07-final-entasis/wiki/Function)
- ❓ [Requirement](https://github.com/codestates-beb/beb-07-final-entasis/wiki/Requirement)

## Role & Rule
- 👥 [Role](https://github.com/codestates-beb/beb-07-final-entasis/wiki/Role)
- 👩‍⚖️ [Rule](https://github.com/codestates-beb/beb-07-final-entasis/wiki/Rule)

## Design
- 🎨[Design Plan](https://github.com/codestates-beb/beb-07-final-entasis/wiki/Design-Plan)
- 📈[Flow Chart](https://github.com/codestates-beb/beb-07-final-entasis/wiki/Flow-Chart)

## Tech
- 🗄 [DB Schema](https://github.com/codestates-beb/beb-07-final-entasis/wiki/DB-Schema)
- 📋 [API DOC](https://github.com/codestates-beb/beb-07-final-entasis/wiki/API-DOC)
- 🖲 [SC Plan](https://github.com/codestates-beb/beb-07-final-entasis/wiki/SC-Plan)
- 🧷 [Architecture](https://github.com/codestates-beb/beb-07-final-entasis/wiki/Architecture)
- ⭐️ [Tech Stack](https://github.com/codestates-beb/beb-07-final-entasis/wiki/Tech-Stack)

## Demo
- 📱 [Go Demo](https://github.com/codestates-beb/beb-07-final-entasis/wiki/Go-Demo)
