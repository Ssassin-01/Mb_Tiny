import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

const MyInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('/api/members/me') // baseURL + withCredentials 자동 포함됨
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setError('로그인이 필요합니다.');
        console.error(err);
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>로딩 중...</p>;

  return (
    <div>
      <h2>내 정보 🧑‍💻</h2>
      <p>
        <strong>이메일:</strong> {user.email}
      </p>
      <p>
        <strong>닉네임:</strong> {user.nickname}
      </p>
      <p>
        <strong>성별:</strong> {user.gender}
      </p>
    </div>
  );
};

export default MyInfo;
