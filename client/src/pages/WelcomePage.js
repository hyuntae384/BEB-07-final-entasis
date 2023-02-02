import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import {Tutorial} from '../apis/user'
const Welcome =({isLoading, tutorialCnt, account})=>{
    const [welcomeClose, setWelcomeClose] = useState(false)

    const modalStyle = {
        overlay: {
            position: "fixed",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            overflow: "hidden",
            zIndex: 10,
        },
        content: {
            display: "block",
            justifyContent: "center",
            background: "#2B2B2B",
            overflow: "hidden",
            border:"0",
            borderRadius: "10px",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            zIndex: 20,
            
        },
    };
    useEffect(()=>{
        Tutorial(account,tutorialCnt)
    },[account,tutorialCnt])

    if(isLoading){
    return (<div
            className="welcome logo"  onFocus={document.body.style.overflow='hidden'}>
            <img className="logo" src={require('../assets/images/ENTASIS_white.png')} alt="loading"/>
            <img src={require('../assets/images/Infinity.gif')} alt="loading"/>
            </div>)
    } else if(!welcomeClose){return (
        <div className="welcome" onClick={()=>setWelcomeClose(!welcomeClose)}  onFocus={document.body.style.overflow='hidden'}>
            <img src={require('../assets/images/welcome.png')} alt="welcome"/>
        </div>
    )}
}
export default Welcome