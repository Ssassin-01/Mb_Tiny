import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AnonymousWrite.css';

function AnonymousWrite() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category: '수다',
    title: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('글이 등록되었습니다!');
    navigate('/anonymous');
  };

  return (
    <div className="write">
      <div className="logo-box">
        <img src="/img/logo.png" alt="MBTiny Logo" className="logo" />
      </div>

      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <div className="header">
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="수다">수다</option>
              <option value="공지">공지</option>
            </select>
            <input
              type="text"
              name="title"
              placeholder="제목을 입력하세요"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <textarea
            name="content"
            placeholder="내용을 입력하세요"
            rows="12"
            value={form.content}
            onChange={handleChange}
          />

          <div className="tools">
            <button type="button">이미지 첨부</button>
            <button type="button">파일 첨부</button>
          </div>

          <div className="actions">
            <button type="submit" className="submit">작성완료</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AnonymousWrite;
