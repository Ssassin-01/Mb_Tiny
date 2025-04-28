// src/pages/FriendProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../css/profile/FriendProfilePage.css'; // (스타일 따로)

const FriendProfilePage = () => {
  const { id } = useParams(); // URL에서 친구 ID 가져옴
  const [friendInfo, setFriendInfo] = useState(null);

  useEffect(() => {
    // 나중에 여기서 API 호출
    // axios.get(`/api/members/${id}`).then(res => setFriendInfo(res.data))

    // 일단은 더미 데이터
    const dummyFriends = [
      { id: 1, nickname: "nickname1", mbti: "ISFP", img: "/img/user1.jpg", intro: "안녕하세요!" },
      { id: 2, nickname: "nickname2", mbti: "ISFJ", img: "/img/user2.jpg", intro: "반갑습니다!" },
      { id: 3, nickname: "nickname3", mbti: "ESFP", img: "/img/user3.jpg", intro: "즐거운 하루!" },
    ];

    const friend = dummyFriends.find(f => f.id === parseInt(id));
    setFriendInfo(friend);
  }, [id]);

  if (!friendInfo) {
    return <div>로딩 중...</div>; // 정보 없으면 로딩
  }

  return (
    <div className="friend-profile-container">
      <img src={friendInfo.img} alt="프로필 이미지" className="friend-profile-img" />
      <h2>{friendInfo.nickname}</h2>
      <p>MBTI: {friendInfo.mbti}</p>
      <p>한 줄 소개: {friendInfo.intro}</p>
    </div>
  );
};

export default FriendProfilePage;
