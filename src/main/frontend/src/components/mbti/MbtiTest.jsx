import React, { useState } from 'react';
import questions from './questions';
import '../../css/mbti/MbtiTest.css';
import MbtiMatchResult from './MbtiMatchResult';
import DetailMbti from './DetailMbti'; // 설명용 컴포넌트 추가

const MBTI_GROUPS = {
  분석가형: {
    types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
    color: '#6c5ce7',
    emoji: '🧠',
  },
  외교관형: {
    types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'],
    color: '#00b894',
    emoji: '💚',
  },
  관리자형: {
    types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'],
    color: '#0984e3',
    emoji: '🛡️',
  },
  탐험가형: {
    types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'],
    color: '#fdcb6e',
    emoji: '🌟',
  },
};



const MbtiTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0,
  });
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState('');
  const [selectedMbti, setSelectedMbti] = useState(null); // 선택된 MBTI 상태

  const handleAnswer = (isAgree) => {
    const { direction, weight = 1 } = questions[currentQuestion];
    const target = isAgree ? direction : getOpposite(direction);

    setScores((prev) => ({
      ...prev,
      [target]: prev[target] + weight,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const finalResult = calculateResult();
      setResult(finalResult);
      setIsFinished(true);
    }
  };

  const getOpposite = (letter) => {
    const opposites = {
      E: 'I', I: 'E', S: 'N', N: 'S', T: 'F', F: 'T', J: 'P', P: 'J'
    };
    return opposites[letter];
  };

  const calculateResult = () => {
    let final = '';
    final += scores.E >= scores.I ? 'E' : 'I';
    final += scores.S >= scores.N ? 'S' : 'N';
    final += scores.T >= scores.F ? 'T' : 'F';
    final += scores.J >= scores.P ? 'J' : 'P';
    return final;
  };

  return (
    <div className='mbti-test-page'>
      {!isFinished ? (
        <>
          <h2>MBTI 성격유형 검사</h2>
          <div className='question-box'>
            <p>{questions[currentQuestion].text}</p>
            <div className='options'>
              <button onClick={() => handleAnswer(true)}>그렇다</button>
              <button onClick={() => handleAnswer(false)}>아니다</button>
            </div>
            <p className='progress'>{currentQuestion + 1} / {questions.length}</p>
          </div>
        </>
      ) : (
        <div className='result-box'>
          <h2>검사 결과</h2>
          <div className='result-card'>
            <p>당신의 MBTI는</p>
            <h1>{result}</h1>
          </div>
          <MbtiMatchResult userMbti={result} />
        </div>
      )}

      {/* 모든 MBTI 유형 버튼 렌더링 */}
      <div className='mbti-button-list'>
  <h3>MBTI 유형별 설명 보기</h3>
  {Object.entries(MBTI_GROUPS).map(([groupName, { types, color, emoji }]) => (
  <div key={groupName} className='mbti-group'>
    <h4 style={{ color }}>{emoji} {groupName}</h4>
    <div className='mbti-buttons'>
      {types.map((type) => (
        <button
          key={type}
          style={{
            backgroundColor: selectedMbti === type ? color : 'white',
            color: selectedMbti === type ? 'white' : color,
            border: `2px solid ${color}`,
          }}
          className='mbti-btn'
          onClick={() => setSelectedMbti(type)}
        >
          {type}
        </button>
      ))}
    </div>
  </div>
))}

</div>

      {/* 선택된 MBTI 유형 상세 설명 출력 */}
      {selectedMbti && (
        <div className='mbti-detail-container'>
          <DetailMbti type={selectedMbti} />
        </div>
      )}
    </div>
  );
};

export default MbtiTest;
