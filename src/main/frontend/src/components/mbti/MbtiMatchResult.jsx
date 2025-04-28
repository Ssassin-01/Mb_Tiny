import React from 'react';

const mbtiMatchData = {
  INTJ: { good: ["ENFP", "ENTP", "INFJ"], bad: ["ESFP", "ISFP", "ESTP"] },
  INTP: { good: ["ENTP", "INTP", "INFJ"], bad: ["ESFJ", "ISFJ", "ESTJ"] },
  ENTJ: { good: ["INTP", "ENTP", "INFP"], bad: ["ISFP", "ESFP", "ISFJ"] },
  ENTP: { good: ["INFJ", "INTP", "ENFP"], bad: ["ISFJ", "ISTJ", "ISFP"] },
  INFJ: { good: ["ENFP", "INFP", "ENTP"], bad: ["ESTP", "ISTP", "ESFP"] },
  INFP: { good: ["ENFP", "INFJ", "INTJ"], bad: ["ESTJ", "ISTJ", "ESFJ"] },
  ENFJ: { good: ["INFP", "ISFP", "INFJ"], bad: ["ISTP", "ESTP", "INTP"] },
  ENFP: { good: ["INFJ", "INTJ", "INFP"], bad: ["ISTJ", "ESTJ", "ISFJ"] },
  ISTJ: { good: ["ESTJ", "ISFJ", "ISTP"], bad: ["ENFP", "INFP", "ENFJ"] },
  ISFJ: { good: ["ESFJ", "ISFP", "ISTJ"], bad: ["ENTP", "ENFP", "INTP"] },
  ESTJ: { good: ["ISTJ", "ESTP", "ESFJ"], bad: ["INFP", "ENFP", "INFJ"] },
  ESFJ: { good: ["ISFJ", "ESFP", "ESTJ"], bad: ["INTP", "ENTP", "INFJ"] },
  ISTP: { good: ["ESTP", "ISTJ", "ISFP"], bad: ["ENFJ", "INFJ", "ENFP"] },
  ISFP: { good: ["ESFP", "ISFJ", "ISTP"], bad: ["ENTJ", "ENTP", "ENFJ"] },
  ESTP: { good: ["ISTP", "ESFP", "ESTJ"], bad: ["INFJ", "INFP", "ENFJ"] },
  ESFP: { good: ["ISFP", "ESFJ", "ESTP"], bad: ["INTJ", "INFJ", "INTP"] },
};

const MbtiMatchResult = ({ userMbti }) => {
  if (!userMbti || !mbtiMatchData[userMbti]) {
    return <div>MBTI 결과를 불러올 수 없습니다.</div>;
  }

  const { good, bad } = mbtiMatchData[userMbti];

  return (
    <div className="mbti-match-result">
      <h2>당신의 MBTI는 <span className="highlight">{userMbti}</span>입니다!</h2>

      <div className="mbti-matches">
        <div className="good-mbti">
          <h3>잘 맞는 MBTI</h3>
          <ul>
            {good.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </div>

        <div className="bad-mbti">
          <h3>상극 MBTI</h3>
          <ul>
            {bad.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MbtiMatchResult;
