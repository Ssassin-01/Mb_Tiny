import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/AnonymousWrite.css';

function AnonymousWrite() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ category: '수다', title: '', content: '' });
  const [image, setImage] = useState(null); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('category', form.category);
    formData.append('title', form.title);
    formData.append('content', form.content);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:8080/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('글이 등록되었습니다!');
      navigate('/anonymous'); 
    } catch (err) {
      alert('글 등록 실패!');
      console.error(err);
    }
  };

  return (
    <div className="anonymous-page">
      <div className="anonymous-layout">
        <div className="write">
          <div className="logo-box">
            <img src="/img/logo.png" alt="MBTiny Logo" className="logo" />
          </div>

          <form className="form-box" onSubmit={handleSubmit}>
            <div className="header">
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="수다">수다</option>
                <option value="공지">공지</option>
              </select>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="제목을 입력하세요"
              />
            </div>

            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="내용을 입력하세요"
              rows="12"
            />

            <div className="tools">
              <label className="file-label">
                이미지 첨부
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </label>

              {image && (
                <span className="file-name">{image.name}</span>
              )}
            </div>

            <div className="actions">
              <button type="submit" className="submit">작성완료</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AnonymousWrite;
