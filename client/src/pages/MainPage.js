import Chart from "../components/MainPage/Chart/Chart"
import LimitOrderBook from "../components/MainPage/LimitOrderBook"
import Order from "../components/MainPage/Order"
import OrderList from "../components/MainPage/OrderList"
import Position from "../components/MainPage/Position"
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