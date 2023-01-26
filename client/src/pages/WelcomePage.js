import { useState } from 'react'

const Welcome =({})=>{
    const [welcomeClose, setWelcomeClose] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    if(isLoading)   
    return (
        <div className="welcome" onClick={() => setIsLoading()}>
            <img className="logo" src={require('../assets/images/ENTASIS.png')} alt="loading"/>
            <img src={require('../assets/images/Infinity.gif')} alt="loading"/>
        </div>
    )
    if(!isLoading && !welcomeClose)
    return (
        <div className="welcome" onClick={()=>setWelcomeClose(!welcomeClose)}>
            <img src={require('../assets/images/welcome.png')} alt="welcome"/>
        </div>
    )
}
export default Welcome