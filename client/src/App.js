import {React}  from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Tutorials from './components/Tutorials';
import MainPage from './pages/MainPage';
import AccountPage from './pages/Server';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/account' element={<AccountPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
