import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/pages/SignUpPage.css';

function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    phone: '',
    birthday: '',
    nickname: '',
    mbti: '',
    address: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  // 비밀번호 유효성 검사 (영문 + 숫자, 8자 이상)
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  // 입력 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === 'password') {
      if (!validatePassword(value)) {
        setPasswordError('비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다.');
      } else {
        setPasswordError('');
      }
      if (form.confirmPassword && value !== form.confirmPassword) {
        setConfirmError('비밀번호가 일치하지 않습니다.');
      } else {
        setConfirmError('');
      }
    }

    if (name === 'confirmPassword') {
      if (value !== form.password) {
        setConfirmError('비밀번호가 일치하지 않습니다.');
      } else {
        setConfirmError('');
      }
    }
    if (name === 'phone') {
      const onlyNumbers = value.replace(/\D/g, ''); // 숫자 외 제거
      setForm((prev) => ({ ...prev, [name]: onlyNumbers }));
      return;
    }
  
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(form.password)) {
      setPasswordError('비밀번호 조건을 다시 확인해주세요.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setConfirmError('비밀번호가 일치하지 않습니다.');
      return;
    }

    const registerData = {
      email: form.email,
      password: form.password,
      gender: form.gender,
      phone: form.phone,
      birthday: form.birthday,
      nickname: form.nickname,
      mbti: form.mbti,
      address: form.address,
    };

    try {
      await axios.post('http://localhost:8080/api/members/register', registerData);
      alert('회원가입 성공!');
      navigate('/');
    } catch (err) {
      alert('회원가입 실패: ' + (err.response?.data?.message || '서버 오류'));
    }
  };

  // 다음 주소 API
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const searchAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setForm({ ...form, address: data.address });
      },
    }).open();
  };

  return (
    <div className='signup'>
      <img
        src='/img/logo2.png'
        alt='MBTiny Logo'
        className='logo'
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
      />
      <form className='form' onSubmit={handleSubmit}>
        <label>이메일</label>
        <input name='email' type='email' onChange={handleChange} required />

        <label>비밀번호</label>
        <input name='password' type='password' onChange={handleChange} required />
        {passwordError && <div className='error'>{passwordError}</div>}

        <label>비밀번호 확인</label>
        <input name='confirmPassword' type='password' onChange={handleChange} required />
        {confirmError && <div className='error'>{confirmError}</div>}

        <label>성별</label>
        <select name='gender' onChange={handleChange} defaultValue=''>
          <option value='' disabled>성별 선택</option>
          <option value='남자'>남자</option>
          <option value='여자'>여자</option>
        </select>

        <label>휴대전화</label>
        <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="- 없이 숫자만 입력해주세요"
          />


        <label>생년월일</label>
        <input
          type='date'
          name='birthday'
          onChange={handleChange}
          value={form.birthday}
          max={new Date().toISOString().split('T')[0]}
          required
        />

        <label>주소</label>
        <div className='address-group'>
          <input name='address' value={form.address} readOnly placeholder='주소를 검색해주세요' />
          <button type='button' className='address-btn' onClick={searchAddress}>
            주소 검색
          </button>
        </div>

        <label>닉네임</label>
        <input name='nickname' onChange={handleChange} />

        <label>MBTI</label>
        <select name='mbti' onChange={handleChange} defaultValue='' required >
          <option value='' disabled>MBTI 선택</option>
          {[
            'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
            'ISTP', 'ISFP', 'INFP', 'INTP',
            'ESTP', 'ESFP', 'ENFP', 'ENTP',
            'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
          ].map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <a
          href='https://www.16personalities.com/ko'
          target='_blank'
          rel='noopener noreferrer'
          className='mbti-test-link'
        >
          MBTI를 모르신다면? 👉 테스트하러 가기
        </a>

        <button type='submit' className='submit-btn'>가입하기</button>
      </form>
    </div>
  );
}

export default SignUpPage;
