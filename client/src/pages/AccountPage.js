import Deposit from "../components/AccountPage/Deposit"
import Exchange from "../components/AccountPage/Exchange"
import Transfer from "../components/AccountPage/Transfer"
import Withdraw from "../components/AccountPage/Withdraw"
import Footer from "../components/Footer"
import Navigator from "../components/Navigator"
import Header from "../components/Header"

const AccountPage =()=>{
    return(
    <div className="account_page">
        <Header/>
        <Navigator/>
        <h1>AccountPage</h1>
        <Deposit/>
        <Exchange/>
        <Transfer/>
        <Withdraw/>
        <Footer/>
    </div>
    )
}
export default AccountPage