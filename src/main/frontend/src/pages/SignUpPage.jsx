import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SignUpPage.css';

function SignUpPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('회원가입이 완료되었습니다!');
    navigate('/login'); 
  };

  return (
    <div className="signup">
      <img src="/img/logo2.png" alt="MBTiny Logo" className="logo" />
      <h2>회원 가입</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>E-MAIL</label>
        <input type="email" />

        <label>PW</label>
        <input type="password" />
        
        <label>성별</label>
        <input type="text" />

        <label>휴대전화</label>
        <input type="tel" />

        <label>생년월일</label>
        <div className="birth-group">
          <input type="text" placeholder="년" className="birth-input year" />
          <select className="birth-input month">
            <option value="">월</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <input type="text" placeholder="일" className="birth-input day" />
        </div>

        <label>닉네임</label>
        <input type="text" />

        <label>MBTI</label>
        <select defaultValue="">
          <option value="" disabled>MBTI 선택</option>
          {[
            "ISTJ", "ISFJ", "INFJ", "INTJ",
            "ISTP", "ISFP", "INFP", "INTP",
            "ESTP", "ESFP", "ENFP", "ENTP",
            "ESTJ", "ESFJ", "ENFJ", "ENTJ"
          ].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <button type="submit" className="submit-btn">가입하기</button>
      </form>
    </div>
  );
}

export default SignUpPage;
