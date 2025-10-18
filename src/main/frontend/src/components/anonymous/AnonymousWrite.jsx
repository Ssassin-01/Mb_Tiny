import React, { useState, useEffect } from 'react';
import api from '../../api/axiosInstance';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/anonymous/AnonymousWrite.css';

function AnonymousWrite() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const postId = params.get('id'); // 수정 모드 시 존재

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

  // ✅ 이미지 URL 변환 유틸
  const S3_BASE =
    'https://mbtiny-image-bucket.s3.ap-northeast-2.amazonaws.com/';
  const isDev = process.env.NODE_ENV === 'development';
  const API_BASE = isDev ? 'http://localhost:8080' : '';

  const toImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http://') || url.startsWith('https://')) return url; // 절대경로(S3 등)
    if (url.startsWith('/profile/') || url.startsWith('/uploads/'))
      return S3_BASE + url.slice(1);
    return API_BASE + url;
  };

  useEffect(() => {
    if (!loginUser) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [loginUser, navigate]);

  // ✅ 수정모드: 기존 글 정보 불러오기
  useEffect(() => {
    if (postId) {
      api
        .get(`/anonymous-posts/${postId}`)
        .then((res) => {
          setForm({
            category: res.data.category || '수다',
            title: res.data.title,
            content: res.data.content,
          });

          if (res.data.imageUrl) {
            setPreview(toImageUrl(res.data.imageUrl));
          }
        })
        .catch((err) => {
          console.error('글 불러오기 실패', err);
          alert('❌ 글 정보를 불러오지 못했습니다.');
        });
    }
  }, [postId]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
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

  // ✅ 작성/수정 통합 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title: form.title,
      content: form.content,
    };

    const formData = new FormData();
    formData.append(
      'postData',
      new Blob([JSON.stringify(postData)], { type: 'application/json' })
    );
    if (image) formData.append('image', image);

    try {
      if (postId) {
        await api.put(`/anonymous-posts/${postId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('✅ 글이 수정되었습니다!');
        navigate('/anonymous');
      } else {
        await api.post('/anonymous-posts', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
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
