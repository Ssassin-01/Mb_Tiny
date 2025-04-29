import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';


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
    <div className="search-bar-wrapper">
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
                src={item.profileImgUrl || '/img/default-profile.png'}
                alt="profile"
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
