import { useEffect, useState } from 'react'
import {Tutorial} from '../apis/user'
const WelcomePage =({isLoading, tutorialCnt, account})=>{
    const [welcomeClose, setWelcomeClose] = useState(false)

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
export default WelcomePage