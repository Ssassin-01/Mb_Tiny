import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';
import '../../css/profile/ProfileEditPage.css';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [form, setForm] = useState({
    password: '',
    gender: '',
    phone: '',
    birthday: '',
    mbti: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/members/me', { withCredentials: true });
        const { gender, phone, birthday, mbti, profileImgUrl } = res.data;
        setForm({
          password: '',
          gender: gender || '',
          phone: phone || '',
          birthday: birthday || '',
          mbti: mbti || '',
        });
        setPreview(profileImgUrl ? `http://localhost:8080${profileImgUrl}` : null);
      } catch (err) {
        console.error('프로필 정보 불러오기 실패', err);
        alert('로그인이 필요합니다.');
        navigate('/login');
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleResetToDefault = () => {
    const emptyFile = new File([], ''); // 빈 파일을 전송하면 백엔드에서 default.png로 처리
    setImageFile(emptyFile);
    setPreview('http://localhost:8080/uploads/profile/default.png'); // 서버에 있는 기본 이미지 URL로 설정
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('password', form.password);
      formData.append('gender', form.gender);
      formData.append('phone', form.phone);
      formData.append('birthday', form.birthday);
      formData.append('mbti', form.mbti);
      if (imageFile !== null) {
        formData.append('profileImg', imageFile);
      }

      await axios.put('http://localhost:8080/api/members/modify', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      alert('프로필이 수정되었습니다.');
      window.location.href = '/profile/me';
    } catch (err) {
      console.error('수정 실패', err);
      alert('프로필 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="profile-edit-container">
      <h2>프로필 수정</h2>
      <form onSubmit={handleSubmit} className="profile-edit-form">
        <div className="form-group">
          <label>프로필 이미지</label>
          <div className="img-preview-wrapper">
            {preview ? (
              <img src={preview} alt="preview" className="img-preview" />
            ) : (
              <div className="default-profile-img">
                <FaCamera className="default-camera-icon" />
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} />
            <button type="button" className="reset-profile-btn" onClick={handleResetToDefault}>
              기본 이미지로 변경
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>비밀번호</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>성별</label>
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">선택</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
        </div>

        <div className="form-group">
          <label>전화번호</label>
          <input type="text" name="phone" value={form.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>생일</label>
          <input type="date" name="birthday" value={form.birthday} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>MBTI</label>
          <select name="mbti" value={form.mbti} onChange={handleChange}>
            <option value="">선택</option>
            {[ 'ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ' ].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="save-btn">저장</button>
      </form>
    </div>
  );
};

export default ProfileEditPage;
