import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';
import '../../css/layout/Topbar.css';

function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  // ✅ S3 기본 경로
  const S3_BASE =
    'https://mbtiny-image-bucket.s3.ap-northeast-2.amazonaws.com/';
  const isDev = process.env.NODE_ENV === 'development';
  const API_BASE = isDev ? 'http://localhost:8080' : '';

  // ✅ 이미지 URL 변환 함수
  const toImageUrl = (url) => {
    if (!url) return '/img/default-profile.png';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('/profile/')) return S3_BASE + url.slice(1);
    return API_BASE + url;
  };

  // 🔸 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🔍 검색 기능
  useEffect(() => {
    if (keyword.trim() === '') {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      api
        .get(`/members/search?keyword=${keyword}`)
        .then((res) => setResults(res.data))
        .catch((err) => console.error('검색 실패:', err));
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  const handleChange = (e) => setKeyword(e.target.value);

  const handleSelect = (nickname) => {
    navigate(`/profile/${nickname}`);
    setKeyword('');
    setResults([]);
  };

  return (
    <div className='search-bar-wrapper' ref={wrapperRef}>
      <input
        type='text'
        value={keyword}
        onChange={handleChange}
        placeholder='닉네임 검색'
        className='search-input'
      />

      {results.length > 0 && (
        <ul className='search-dropdown'>
          {results.map((item, idx) => (
            <li
              key={idx}
              className='search-item'
              onClick={() => handleSelect(item.nickname)}
            >
              <img
                src={toImageUrl(item.profileImgUrl)}
                alt='profile'
                className='search-profile-img'
              />
              <span>{item.nickname}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
