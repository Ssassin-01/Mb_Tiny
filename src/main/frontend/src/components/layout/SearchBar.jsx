import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import '../../css/layout/Topbar.css';

function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (keyword.trim() === '') {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      axios
        .get(`/api/members/search?keyword=${keyword}`)
        .then((res) => {
          setResults(res.data);
        })
        .catch((err) => {
          console.error('검색 실패:', err);
        });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSelect = (nickname) => {
    navigate(`/profile/${nickname}`);
    setKeyword('');
    setResults([]);
  };

  return (
    <div
      className='search-bar-wrapper'
      style={{ position: 'relative', width: '400px' }}
    >
      <input
        type='text'
        value={keyword}
        onChange={handleChange}
        placeholder='닉네임 검색'
        className='search-input'
      />

      {results.length > 0 && (
        <ul
          className='search-dropdown'
          style={{
            position: 'absolute',
            top: '110%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '8px',
            marginTop: '4px',
            listStyle: 'none',
            padding: '8px 0',
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {results.map((item, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 12px',
                cursor: 'pointer',
              }}
              onClick={() => handleSelect(item.nickname)}
            >
              {/* 프로필 이미지 */}
              <img
                src={item.profileImgUrl || '/img/default-profile.png'}
                alt='profile'
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: '12px',
                }}
              />
              {/* 닉네임 */}
              <span style={{ fontSize: '16px', fontWeight: '500' }}>
                {item.nickname}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;