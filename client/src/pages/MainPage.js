import Chart from "../components/Chart/Chart"
import LimitOrderBook from '../components/LimitOrderBook'
import Order from '../components/Order'
import OrderList from "../components/OrderList"
import Position from "../components/Positions"
import Footer from "../components/Footer"
import Navigator from "../components/Navigator"
import Header from "../components/Header"

const MainPage =()=>{

    return(
    <div className="main_page">
        <Header/>
        <Navigator/>
        <div className="main_head">
            <Chart/>
            <LimitOrderBook/>
            <Order/>
        </div>
        <Position/>
        <Footer/>
    </div>
    )
}
export default MainPage