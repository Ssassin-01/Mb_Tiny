import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUpPage from './pages/SignUpPage';
import AnonymousBoard from './components/AnonymousBoard';
import AnonymousDetail from './components/AnonymousDetail';
import AnonymousWrite from './components/AnonymousWrite';
import MessagesPage from './pages/MessagesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/anonymous" element={<AnonymousBoard />} />
        <Route path="/anonymous/:id" element={<AnonymousDetail />} /> 
        <Route path="/anonymous/write" element={<AnonymousWrite />} />
        <Route path="/messages" element={<MessagesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
