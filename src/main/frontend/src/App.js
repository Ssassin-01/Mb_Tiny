import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MyInfo from './pages/MyInfo';
import Hello from './components/Hello';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hello />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/me' element={<MyInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
