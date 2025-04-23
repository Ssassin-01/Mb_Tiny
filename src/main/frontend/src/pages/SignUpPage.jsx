import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/SignUpPage.css'; // 꼭 CSS import!

function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    gender: '',
    phone: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    nickname: '',
    mbti: ''
  });

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
      birth: `${form.birthYear}-${form.birthMonth}-${form.birthDay}`,
      nickname: form.nickname,
      mbti: form.mbti,
    };

    try {
      await axios.post('http://localhost:8080/api/users/register', registerData); // ✅ 수정된 경로
      alert('회원가입 성공!');
      navigate('/');
    } catch (err) {
      alert('회원가입 실패: ' + (err.response?.data?.message || '서버 오류'));
    }
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
        <div className="birth-group">
          <input name="birthYear" placeholder="년" className="birth-input year" onChange={handleChange} />
          <select name="birthMonth" className="birth-input month" onChange={handleChange} defaultValue="">
            <option value="" disabled>월</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <input name="birthDay" placeholder="일" className="birth-input day" onChange={handleChange} />
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

        <button type="submit" className="submit-btn">가입하기</button>
      </form>
    </div>
  );
}

export default SignUpPage;
