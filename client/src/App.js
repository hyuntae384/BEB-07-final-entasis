import {React}  from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import MainPage from './pages/MainPage';
import AccountPage from './pages/AccountPage';
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
