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

  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/members/me', {
          withCredentials: true,
        });
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

  // 비밀번호 유효성 검사 (영문+숫자, 8자 이상)
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 전화번호는 숫자만 입력
    if (name === 'phone') {
      const onlyNumbers = value.replace(/\D/g, '');
      setForm((prev) => ({ ...prev, [name]: onlyNumbers }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));

    // 비밀번호 유효성 + 확인 처리
    if (name === 'password') {
      if (!validatePassword(value)) {
        setPasswordError('비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다.');
      } else {
        setPasswordError('');
      }

      if (confirmPassword && value !== confirmPassword) {
        setConfirmError('비밀번호가 일치하지 않습니다.');
      } else {
        setConfirmError('');
      }
    }
  };

  const handleConfirmChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== form.password) {
      setConfirmError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmError('');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleResetToDefault = () => {
    const emptyFile = new File([], '');
    setImageFile(emptyFile);
    setPreview('http://localhost:8080/uploads/profile/default.png');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password) {
      if (!validatePassword(form.password)) {
        setPasswordError('비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다.');
        return;
      }
      if (form.password !== confirmPassword) {
        setConfirmError('비밀번호가 일치하지 않습니다.');
        return;
      }
    }

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
          {passwordError && <div className="error">{passwordError}</div>}
        </div>

        <div className="form-group">
          <label>비밀번호 확인</label>
          <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmChange} />
          {confirmError && <div className="error">{confirmError}</div>}
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
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="- 없이 숫자만 입력해주세요"
          />
        </div>

        <div className="form-group">
          <label>생일</label>
          <input type="date" name="birthday" value={form.birthday} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>MBTI</label>
          <select name="mbti" value={form.mbti} onChange={handleChange} required>
            <option value="">선택</option>
            {[
              'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
              'ISTP', 'ISFP', 'INFP', 'INTP',
              'ESTP', 'ESFP', 'ENFP', 'ENTP',
              'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
            ].map((type) => (
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