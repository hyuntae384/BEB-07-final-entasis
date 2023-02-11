import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react"
import Modal from "react-modal"
import { Link } from "react-router-dom";
import { Tutorial } from "../apis/user";
import '../assets/css/main.css';
import i18n from "../lang/i18n";
import SelectBox from './Select';
import Tutorials from "./Tutorials";
import { useTranslation } from "react-i18next";

const Navigator =({isCircuitBreaker,stName,setStName,companyPD,totalCurrentPrices,coorpName,circuitBreakerTimer,ST_Name,userModalIsOpen,setUserModalIsOpen,

})=>{
    const {t} = useTranslation();
    const [pdModalIsOpen, setPdModalIsOpen] = useState(false);
    const [tutorialsClicked,setTutorialsClicked] = useState(false)
    const [userLang, setUserLang] = useState("en")
    let time = new Date()
    let date = (59-time.getMinutes())%5+":"+(59-time.getSeconds());

    // const countNumber=(e)=>{
    //     return e.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",")
    // }
    const modalStyle = {
        
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            overflow: "hidden",
            zIndex: 10,
        },
        content: {
            display: "block",
            justifyContent: "center",
            background: "#222223",
            overflow: "hidden",
            top: "0",
            left: "0",
            right: "80%",
            bottom: "0",
            border:"0",
            borderRadius: "0px",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            zIndex: 10,
            
        },
    };

    const onChange = () => {
        setUserLang((userLang === "ko") ? "en" : "ko")
        i18n.changeLanguage(userLang)
    }

    const company = {
        name:'BEBE',
        total_asset:'4000000000',
        income:'400000',
        divided_ratio:'0.005',
        divided:'10',
        next_ratio:'10',
    };;


    const PdModalOpen =()=>{
        document.body.style.overflow = 'hidden';
        setPdModalIsOpen(true)
        }
    const PdModalClose =()=>{
        document.body.style.overflow = 'unset';
        setPdModalIsOpen(false)
        }
        const {chainId, account, active, activate, deactivate} = useWeb3React();

        // Tutorial(account,tutorialCnt-1)
        // useEffect(()=>{
        //     Tutorial(account,tutorialCnt)
        // },[account,tutorialCnt])


    return(
    <div className="navigator">
    <div className="public_disclosure">
        <div className="public_disclosure_wrapper">
            <h4 onClick={()=>PdModalOpen()}>{t("Public Disclosure")}</h4>
        </div>
        <Modal
        appElement={document.getElementById('root') || undefined}
        onRequestClose={()=>PdModalClose()}
        isOpen={pdModalIsOpen}
        style={modalStyle}
        >   
            <div className="myaccount">
                <h1>{t("Public Disclosure")}</h1>
                <div className='close' onClick={()=>PdModalClose()}>
                    <img src={require('../assets/images/close.png')}></img>
                </div>
                <SelectBox
                        set={ST_Name}
                        termValue={stName}
                        value={setStName}
                ></SelectBox>
                <div className="myaccount_section">
                    <h3>{t("Name")}</h3>
                    <h5>{companyPD.name}</h5>
                </div>
                <div className="myaccount_section">
                    <h3>{t("Total Assets")}</h3>
                    <h5>{Number(coorpName).toFixed(4)} ETH</h5>

                </div>
                <div className="myaccount_section">
                    <h3>{t("Income")}</h3>
                    <h5>{(Number(companyPD.income).toFixed(4))} ETH</h5>
                </div>
                <div className="myaccount_section">
                    <h3>{t("Current Dividend")}</h3>
                    <h5>{(Number(companyPD.dividend).toFixed(4))} ETH</h5> </div>
                <div className="myaccount_section">
                    <h3>{t("Current Dividend Ratio")}</h3>
                    <h5>{companyPD.dividend_ratio} %</h5> 
                </div>
                <div className="myaccount_section">
                    <h3>{t("Next Dividend Ratio")}</h3>
                    <h5>{companyPD.dividend_ratio*100+'%'} * ( 1 + {Number(companyPD.voted_ratio)}) = {(companyPD.dividend_ratio*100 * (1+Number(companyPD.voted_ratio))).toFixed(2)} %</h5>
                </div>
            </div>
            </Modal>
            </div>
            {!isCircuitBreaker?
                <div className="until_the_next_dividend_release">
                <h4>{t("Until the Next Dividend Release")} {date}</h4>
                </div>
                : <div className="is_circuit_breaker">
                <h4>{t("Circuit Breaker")} {'00:'+circuitBreakerTimer}</h4>
                </div>     
                }  

            <div className="navigation_right">
            <Link to='/' onClick={()=>setTutorialsClicked(!tutorialsClicked)}><h4 >{t("Tutorial")}</h4></Link>
                {tutorialsClicked?<Tutorials
                account={account} 
                tutorialCnt={0}
                setPdModalIsOpen={setPdModalIsOpen}
                setUserModalIsOpen={setUserModalIsOpen}
                />:<></>}
                <Link to='/transaction'><h4>{t("Transactions")}</h4></Link>
                <h4><i className="fas fa-globe" onClick={onChange}></i></h4>
            </div>

        </div>
    )
}
export default Navigator