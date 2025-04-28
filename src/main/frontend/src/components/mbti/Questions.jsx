const Questions = [
  // E / I
  { id: 1, text: "나는 여러 사람과 어울릴 때 에너지가 생긴다.", dimension: "EI", direction: "E" },
  { id: 2, text: "나는 혼자 있는 시간이 충전하는 데 필요하다.", dimension: "EI", direction: "I" },
  { id: 3, text: "새로운 사람을 만나는 것이 즐겁다.", dimension: "EI", direction: "E" },
  { id: 4, text: "모르는 사람과 대화하는 것이 부담스럽다.", dimension: "EI", direction: "I" },
  { id: 5, text: "나는 외부 활동보다 집에서 조용히 시간을 보내는 것을 선호한다.", dimension: "EI", direction: "I" },
  { id: 6, text: "나는 파티나 모임에서 중심이 되는 편이다.", dimension: "EI", direction: "E" },
  
  // S / N
  { id: 7, text: "나는 세부사항을 꼼꼼하게 확인하는 것을 좋아한다.", dimension: "SN", direction: "S" },
  { id: 8, text: "나는 새로운 아이디어를 생각해내는 것이 즐겁다.", dimension: "SN", direction: "N" },
  { id: 9, text: "나는 현재에 집중하는 편이다.", dimension: "SN", direction: "S" },
  { id: 10, text: "나는 미래의 가능성을 상상하는 것을 좋아한다.", dimension: "SN", direction: "N" },
  { id: 11, text: "나는 실제 경험을 통해 배우는 것을 선호한다.", dimension: "SN", direction: "S" },
  { id: 12, text: "나는 직관에 따라 결정을 내릴 때가 많다.", dimension: "SN", direction: "N" },

  // T / F
  { id: 13, text: "나는 문제를 해결할 때 감정보다 논리를 우선시한다.", dimension: "TF", direction: "T" },
  { id: 14, text: "나는 다른 사람의 감정을 중요하게 생각한다.", dimension: "TF", direction: "F" },
  { id: 15, text: "나는 결정을 내릴 때 객관적인 사실을 중시한다.", dimension: "TF", direction: "T" },
  { id: 16, text: "나는 갈등을 피하고 모두가 편안하길 바란다.", dimension: "TF", direction: "F" },
  { id: 17, text: "나는 분석적이고 비판적인 시각을 가진 편이다.", dimension: "TF", direction: "T" },
  { id: 18, text: "나는 타인의 입장을 고려하며 결정을 내린다.", dimension: "TF", direction: "F" },

  // J / P
  { id: 19, text: "나는 계획을 세우고 따르는 것을 좋아한다.", dimension: "JP", direction: "J" },
  { id: 20, text: "나는 상황에 맞게 유연하게 대처하는 것을 좋아한다.", dimension: "JP", direction: "P" },
  { id: 21, text: "나는 미리 일정을 정리해두는 편이다.", dimension: "JP", direction: "J" },
  { id: 22, text: "나는 즉흥적으로 움직이는 것을 즐긴다.", dimension: "JP", direction: "P" },
  { id: 23, text: "나는 마감 기한을 잘 지키는 편이다.", dimension: "JP", direction: "J" },
  { id: 24, text: "나는 계획보다는 그때그때 기분에 따라 움직이는 편이다.", dimension: "JP", direction: "P" },

  // 추가 문항 (균형 맞추기)
  { id: 25, text: "나는 에너지가 넘치는 활동을 좋아한다.", dimension: "EI", direction: "E" },
  { id: 26, text: "나는 복잡한 것보다 단순하고 명확한 것을 선호한다.", dimension: "SN", direction: "S" },
  { id: 27, text: "나는 논리적 설득을 중요하게 생각한다.", dimension: "TF", direction: "T" },
  { id: 28, text: "나는 주변 사람들의 감정 변화를 민감하게 느낀다.", dimension: "TF", direction: "F" },
  { id: 29, text: "나는 세세한 계획보다는 전체적인 방향만 정하는 것을 좋아한다.", dimension: "JP", direction: "P" },
  { id: 30, text: "나는 주변 상황에 따라 유연하게 움직이는 것이 편하다.", dimension: "JP", direction: "P" },
];

export default Questions;
