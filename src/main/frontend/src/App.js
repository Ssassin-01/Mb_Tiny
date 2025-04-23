import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUpPage from './pages/SignUpPage';
import AnonymousBoard from './components/AnonymousBoard';
import AnonymousDetail from './components/AnonymousDetail';
import AnonymousWrite from './components/AnonymousWrite';
import Layout from './components/Layout';
import ChatList from './components/ChatList';
import Profile from './components/Profile';
import MbtiTest from './components/MbtiTest';

function App() {
  return (
    <Router>
      <Routes>
        {/* 사이드바, 탑바 없이 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* 사이드바/탑바 포함된 공통 레이아웃 적용 */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/anonymous" element={<AnonymousBoard />} />
          <Route path="/anonymous/:id" element={<AnonymousDetail />} />
          <Route path="/anonymous/write" element={<AnonymousWrite />} />
          <Route path="/chatlist" element={<ChatList/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/mbtitest" element={<MbtiTest/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
