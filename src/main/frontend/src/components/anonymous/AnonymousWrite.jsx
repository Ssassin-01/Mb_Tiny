import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/anonymous/AnonymousWrite.css';

function AnonymousWrite() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const postId = params.get('id'); // 수정할 글 id (없으면 새글 작성)

  const [form, setForm] = useState({
    category: '수다',
    title: '',
    content: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));

  useEffect(() => {
    if (!loginUser) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [loginUser, navigate]);

  // 수정모드: 기존 글 정보 불러오기
  useEffect(() => {
    if (postId) {
      axios
        .get(`http://localhost:8080/api/anonymous-posts/${postId}`, {
          withCredentials: true,
        })
        .then((res) => {
          setForm({
            category: res.data.category || '수다',
            title: res.data.title,
            content: res.data.content,
          });
          if (res.data.imageUrl) {
            setPreview(`http://localhost:8080${res.data.imageUrl}`);
          }
        })
        .catch((err) => {
          console.error('글 불러오기 실패', err);
          alert('❌ 글 정보를 불러오지 못했습니다. (더미)');
        });
    }
  }, [postId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ✅ 작성/수정 통합
  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title: form.title,
      content: form.content,
      // (category는 화면용이고 실제 저장은 안함)
    };

    const formData = new FormData();
    formData.append(
      'postData',
      new Blob([JSON.stringify(postData)], { type: 'application/json' })
    );

    if (image) {
      formData.append('image', image);
    }

    try {
      if (postId) {
        await axios.put(
          `http://localhost:8080/api/anonymous-posts/${postId}`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true,
          }
        );
        alert('✅ 글이 수정되었습니다!');
        navigate('/anonymous');
      } else {
        await axios.post(
          'http://localhost:8080/api/anonymous-posts',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true,
          }
        );
        setSuccess(true);
        setTimeout(() => navigate('/anonymous'), 1500);
      }
    } catch (err) {
      alert(postId ? '❌ 수정 실패!' : '❌ 등록 실패!');
      console.error(err);
    }
  };

  return (
    <div className='anonymous-page'>
      <div className='anonymous-layout'>
        <div className='write'>
          <div className='logo-box'>
            <img src='/img/logo.png' alt='MBTiny Logo' className='logo' />
          </div>

          <form className='form-box' onSubmit={handleSubmit}>
            <div className='header'>
              {isMobile && (
                <div
                  className='fake-select'
                  onClick={() => document.getElementById('realSelect').click()}
                >
                  {form.category} ▼
                </div>
              )}
              <select
                id='realSelect'
                name='category'
                value={form.category}
                onChange={handleChange}
                className={isMobile ? 'hidden-select' : ''}
              >
                <option value='수다'>수다</option>
                <option value='공지'>공지</option>
              </select>
              <input
                name='title'
                value={form.title}
                onChange={handleChange}
                placeholder='제목을 입력하세요'
                maxLength={50}
              />
            </div>

            <div className='char-count'>{form.title.length} / 50자</div>

            <textarea
              name='content'
              value={form.content}
              onChange={handleChange}
              placeholder='내용을 입력하세요'
              rows='12'
              maxLength={1000}
              className='content-area'
            />
            <div className='char-count'>{form.content.length} / 1000자</div>

            <div className='tools'>
              <label className='file-label'>
                이미지 첨부
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </label>
              {image && <span className='file-name'>{image.name}</span>}
            </div>

            {preview && (
              <img src={preview} alt='미리보기' className='preview-image' />
            )}

            <div className='actions'>
              <button type='submit' className='submit'>
                {postId ? '수정완료' : '작성완료'}
              </button>
            </div>

            {success && <div className='success-banner'>작성 완료!</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AnonymousWrite;
