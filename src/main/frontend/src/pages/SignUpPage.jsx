import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/SignUpPage.css';

function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    gender: '',
    phone: '',
    birthDate: '', // 생년월일 하나로 받기
    nickname: '',
    mbti: '',
    address: '',
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registerData = {
      email: form.email,
      password: form.password,
      gender: form.gender,
      phone: form.phone,
      birth: form.birthDate, // YYYY-MM-DD 형태로 전송
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

  const searchAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setForm({ ...form, address: data.address });
      }
    }).open();
  };

  return (
    <div className="signup">
      <img src="/img/logo2.png" alt="MBTiny Logo" className="logo" />
      <form className="form" onSubmit={handleSubmit}>
        <label>이메일</label>
        <input name="email" type="email" onChange={handleChange} required />

        <label>비밀번호</label>
        <input name="password" type="password" onChange={handleChange} required />

        <label>성별</label>
        <select name="gender" onChange={handleChange} defaultValue="">
          <option value="" disabled>성별 선택</option>
          <option value="남자">남자</option>
          <option value="여자">여자</option>
        </select>

        <label>휴대전화</label>
        <input name="phone" onChange={handleChange} />

        <label>생년월일</label>
        <input
          type="date"
          name="birthDate"
          onChange={handleChange}
          value={form.birthDate}
          max={new Date().toISOString().split("T")[0]}
          required
        />

        <label>주소</label>
        <div className="address-group">
          <input
            name="address"
            value={form.address}
            readOnly
            placeholder="주소를 검색해주세요"
          />
          <button
            type="button"
            className="address-btn"
            onClick={searchAddress}
          >
            주소 검색
          </button>
        </div>

        <label>닉네임</label>
        <input name="nickname" onChange={handleChange} />

        <label>MBTI</label>
        <select name="mbti" onChange={handleChange} defaultValue="">
          <option value="" disabled>MBTI 선택</option>
          {[
            "ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP",
            "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"
          ].map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <a
          href="https://www.16personalities.com/ko"
          target="_blank"
          rel="noopener noreferrer"
          className="mbti-test-link"
        >
          MBTI를 모르신다면? 👉 테스트하러 가기
        </a>

        <button type="submit" className="submit-btn">가입하기</button>
      </form>
    </div>
  );
}

export default SignUpPage;
