import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RequireLoginWithBanner = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/members/me', {
      withCredentials: true
    })
    .then(res => {
      setUser(res.data);
    })
    .catch(() => {
      setMessage('로그인이 필요합니다.');
      setShowBanner(true);
      setTimeout(() => {
        setShowBanner(false);
        navigate('/login');
      }, 2000);
    });
  }, []);

  if (!user) {
    return showBanner ? <div className="login-banner">{message}</div> : null;
  }

  return typeof children === 'function' ? children(user) : children;
};

export default RequireLoginWithBanner;
