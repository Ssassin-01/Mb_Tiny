import React, { useState, useEffect, useRef } from 'react';
import axios from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import '../../css/layout/Topbar.css';

function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const wrapperRef = useRef(null); // 🔹 드롭다운 영역 참조용

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

  useEffect(() => {
    if (keyword.trim() === '') {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      axios
        .get(`http://localhost:8080/api/members/search?keyword=${keyword}`)
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
    <div className="search-bar-wrapper" ref={wrapperRef}>
      <input
        type="text"
        value={keyword}
        onChange={handleChange}
        placeholder="닉네임 검색"
        className="search-input"
      />

      {results.length > 0 && (
        <ul className="search-dropdown">
          {results.map((item, idx) => (
            <li
              key={idx}
              className="search-item"
              onClick={() => handleSelect(item.nickname)}
            >
              <img
                src={item.profileImgUrl ? `http://localhost:8080${item.profileImgUrl}` : '/img/default-profile.png'}
                alt="profile"
                className="search-profile-img"
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
