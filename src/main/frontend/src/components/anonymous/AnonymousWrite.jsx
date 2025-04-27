import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/anonymous/AnonymousWrite.css';

function AnonymousWrite() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const postId = params.get('id');

  const [form, setForm] = useState({ category: '수다', title: '', content: '' });
  const [image, setImage] = useState(null);

  const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));

  // ✅ 로그인 안 되어 있으면 차단
  useEffect(() => {
    if (!loginUser) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, []);

  // ✅ 수정 모드일 경우 기존 글 불러오기
  useEffect(() => {
    if (postId) {
      axios.get(`http://localhost:8080/api/posts/${postId}`)
        .then(res => {
          setForm({
            category: res.data.category || '수다',
            title: res.data.title,
            content: res.data.content,
          });
        })
        .catch(err => {
          alert('글 정보를 불러오지 못했습니다. (더미)');
        });
    }
  }, [postId]);

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
      if (postId) {
        await axios.put(`http://localhost:8080/api/posts/${postId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('글이 수정되었습니다!');
      } else {
        await axios.post('http://localhost:8080/api/posts', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('글이 등록되었습니다!');
      }

      navigate('/anonymous');
    } catch (err) {
      alert(postId ? '수정 실패!' : '등록 실패!');
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
              <button type="submit" className="submit">
                {postId ? '수정완료' : '작성완료'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AnonymousWrite;
