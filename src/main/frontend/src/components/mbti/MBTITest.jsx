import React, { useState } from 'react';
import questions from '../mbti/questions';
import MbtiMatchResult from './MbtiMatchResult';
import '../../css/mbti/MbtiTest.css';

const MbtiTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
  });
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState('');

  const handleAnswer = (isAgree) => {
    const { dimension, direction } = questions[currentQuestion];

    setScores(prev => ({
      ...prev,
      [isAgree ? direction : getOpposite(direction)]: prev[isAgree ? direction : getOpposite(direction)] + 1
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const finalResult = calculateResult();
      setResult(finalResult);
      setIsFinished(true); // 검사 끝남 표시
    }
  };

  const getOpposite = (letter) => {
    const opposites = {
      E: "I", I: "E",
      S: "N", N: "S",
      T: "F", F: "T",
      J: "P", P: "J"
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
    <div className="mbti-test-page">
      {!isFinished ? (
        <>
          <h2>MBTI 성격유형 검사</h2>
          <div className="question-box">
            <p>{questions[currentQuestion].text}</p>
            <div className="options">
              <button onClick={() => handleAnswer(true)}>그렇다</button>
              <button onClick={() => handleAnswer(false)}>아니다</button>
            </div>
            <p className="progress">{currentQuestion + 1} / {questions.length}</p>
          </div>
        </>
      ) : (
        <div className="result-box">
          <h2>검사 결과</h2>
          <div className="result-card">
            <p>당신의 MBTI는</p>
            <h1>{result}</h1>
          </div>
          <MbtiMatchResult userMbti={result} />
          <h3></h3>
        </div>
      )}
    </div>
  );
};

export default MbtiTest;
