import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUpPage from './pages/SignUpPage';
import AnonymousBoard from './components/anonymous/AnonymousBoard';
import AnonymousDetail from './components/anonymous/AnonymousDetail';
import AnonymousWrite from './components/anonymous/AnonymousWrite';
import Layout from './components/layout/Layout';
import Profile from './components/profile/Profile';
import FriendProfilePage from './components/profile/FriendProfilePage';
import MessagesPage from './pages/MessagesPage';
import ProfileEditPage from './components/profile/ProfileEditPage';
import MbtiTest from './components/mbti/MbtiTest';
import RequireLoginWithBanner from './components/etc/RequireLoginWithBanner';

function App() {
  return (
    <Router>
      <Routes>
        {/* 사이드바, 탑바 없이 보여지는 경로 */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUpPage />} />
        {/* 사이드바/탑바 포함 공통 레이아웃 */}
        <Route element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/anonymous' element={<AnonymousBoard />} />
          <Route path='/anonymous/:id' element={<AnonymousDetail />} />
          <Route path='/anonymous/write' element={<AnonymousWrite />} />
          <Route path='/profile/me' element={<Profile />} />
          
          <Route path='profile/:nickname' element={<FriendProfilePage />} />
          <Route path='/mbtitest' element={<MbtiTest />} />
          <Route
              path="/messagespage"
              element={
                <RequireLoginWithBanner>
                  {(user) => <MessagesPage user={user} />}
                </RequireLoginWithBanner>
              }
            />

          <Route path='/profile/edit' element={<ProfileEditPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
