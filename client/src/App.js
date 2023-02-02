import {React}  from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Tutorials from './components/Tutorials';
import MainPage from './pages/MainPage';
import TransactionPage from './pages/TransactionsPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/transaction' element={<TransactionPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
