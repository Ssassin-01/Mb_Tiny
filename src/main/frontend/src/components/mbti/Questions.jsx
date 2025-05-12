const questions = [
  // E / I
  { id: 1, text: "나는 사람들과 함께 있을 때 에너지가 충전된다.", dimension: "EI", direction: "E", weight: 2 },
  { id: 2, text: "나는 혼자만의 시간을 보내야 에너지가 회복된다.", dimension: "EI", direction: "I", weight: 2 },
  { id: 3, text: "새로운 사람을 만나는 것을 즐긴다.", dimension: "EI", direction: "E", weight: 1 },
  { id: 4, text: "처음 만나는 사람과 대화할 때 어색함을 느낀다.", dimension: "EI", direction: "I", weight: 1 },
  { id: 5, text: "나는 많은 사람보다 소수의 친한 친구와 함께 있는 것이 편하다.", dimension: "EI", direction: "I", weight: 1 },
  { id: 6, text: "나는 모임에서 자연스럽게 분위기를 주도하는 편이다.", dimension: "EI", direction: "E", weight: 1 },

  // S / N
  { id: 7, text: "나는 구체적인 사실과 데이터를 중시하는 편이다.", dimension: "SN", direction: "S", weight: 2 },
  { id: 8, text: "나는 새로운 아이디어를 떠올리는 데 흥미를 느낀다.", dimension: "SN", direction: "N", weight: 2 },
  { id: 9, text: "나는 현재 눈앞에 있는 일에 집중하는 편이다.", dimension: "SN", direction: "S", weight: 1 },
  { id: 10, text: "나는 미래의 가능성과 변화를 상상하는 것을 좋아한다.", dimension: "SN", direction: "N", weight: 1 },
  { id: 11, text: "나는 실제 경험을 통해 배우는 것을 선호한다.", dimension: "SN", direction: "S", weight: 1 },
  { id: 12, text: "나는 감이나 직관을 믿고 결정을 내릴 때가 많다.", dimension: "SN", direction: "N", weight: 1 },

  // T / F
  { id: 13, text: "나는 의사결정 시 논리와 객관성을 가장 중시한다.", dimension: "TF", direction: "T", weight: 2 },
  { id: 14, text: "나는 다른 사람들의 감정과 분위기를 고려하려 노력한다.", dimension: "TF", direction: "F", weight: 2 },
  { id: 15, text: "나는 문제 해결에서 사실과 분석을 우선시한다.", dimension: "TF", direction: "T", weight: 1 },
  { id: 16, text: "나는 모두가 편안하고 조화롭게 지내는 것을 중요하게 생각한다.", dimension: "TF", direction: "F", weight: 1 },
  { id: 17, text: "나는 비판적 사고를 통해 사안을 객관적으로 바라본다.", dimension: "TF", direction: "T", weight: 1 },
  { id: 18, text: "나는 상대방의 입장을 공감하고 이해하려 노력한다.", dimension: "TF", direction: "F", weight: 1 },

  // J / P
  { id: 19, text: "나는 계획을 세우고 그 계획을 지키는 것을 선호한다.", dimension: "JP", direction: "J", weight: 2 },
  { id: 20, text: "나는 즉흥적으로 움직이며 상황에 유연하게 대처하는 것을 선호한다.", dimension: "JP", direction: "P", weight: 2 },
  { id: 21, text: "나는 일정을 미리 계획하고 준비하는 편이다.", dimension: "JP", direction: "J", weight: 1 },
  { id: 22, text: "나는 계획보다는 흐름에 맡겨 일을 진행하는 편이다.", dimension: "JP", direction: "P", weight: 1 },
  { id: 23, text: "나는 마감 기한을 잘 지키고 일을 체계적으로 처리하는 편이다.", dimension: "JP", direction: "J", weight: 1 },
  { id: 24, text: "나는 계획에 얽매이기보다는 그때그때 즉흥적으로 대응하는 편이다.", dimension: "JP", direction: "P", weight: 1 },

  // 추가 문항
  { id: 25, text: "나는 활동적이고 에너지가 넘치는 환경을 좋아한다.", dimension: "EI", direction: "E", weight: 2 },
  { id: 26, text: "나는 구체적이고 실질적인 정보를 더 신뢰하는 편이다.", dimension: "SN", direction: "S", weight: 1 },
  { id: 27, text: "나는 논리적인 설명과 근거를 중요하게 생각한다.", dimension: "TF", direction: "T", weight: 1 },
  { id: 28, text: "나는 다른 사람들의 감정 변화를 쉽게 알아차린다.", dimension: "TF", direction: "F", weight: 1 },
  { id: 29, text: "나는 전체적인 큰 그림을 그리고 세부사항은 나중에 고려하는 편이다.", dimension: "JP", direction: "P", weight: 1 },
  { id: 30, text: "나는 계획된 경로보다 상황에 맞춰 융통성 있게 조정하는 것을 선호한다.", dimension: "JP", direction: "P", weight: 1 },
];

export default questions;
