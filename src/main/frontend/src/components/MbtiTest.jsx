import React from 'react';
import '../css/MbtiTest.css';


const MbtiTest = () => {
    return (
      <div className="mbti-test-page">
        <h2>MBTI 성격유형 테스트</h2>
        <div className="question-box">
          <p>1. 새로운 사람을 만나는 것을 좋아합니까?</p>
          <div className="options">
            <button>예</button>
            <button>아니오</button>
          </div>
        </div>
      </div>
    );
  };
  
export default MbtiTest;