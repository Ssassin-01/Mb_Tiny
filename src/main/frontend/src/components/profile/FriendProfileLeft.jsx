import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/axiosInstance';
import FollowButton from '../follow/FollowButton';
import mbtiDescriptions from './mbtiDescriptions';
import { MessageCircle } from 'lucide-react';
import '../../css/profile/Profile.css';
import { toImageUrl } from '../../utils/image';

const FriendProfileLeft = ({
  nickname,
  mbti,
  joinDate,
  onTogglePosts,
  postCount,
  isOwner,
  targetId,
  profileImgUrl,
}) => {
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();

  const fetchFollowCounts = async () => {
    try {
      const url = isOwner ? '/follow/count' : `/follow/count/${nickname}`;
      const res = await api.get(url, { withCredentials: true });
      setFollowerCount(res.data.followers);
      setFollowingCount(res.data.following);
    } catch (error) {
      console.error('❌ 팔로우 수 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    if (!targetId) return;
    fetchFollowCounts();
  }, [targetId, refreshTrigger]);

  const handleFollowChange = (delta) => {
    setFollowerCount((prev) => prev + delta);
    setRefreshTrigger((prev) => prev + 1);
  };

  const mbtiInfo = mbtiDescriptions[mbti?.toUpperCase()] || {
    title: '성격유형',
    tags: [],
    description: '아직 등록되지 않은 MBTI입니다.',
  };

  return (
    <div className='profile-left'>
      <div className='profile-card'>
        <div className='profile-img-wrapper'>
          <img
            src={toImageUrl(profileImgUrl)}
            alt='프로필'
            className='profile-img'
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = toImageUrl(null);
            }}
          />
        </div>

        <p className='profile-nickname'>{nickname}</p>

        <div className='profile-info'>
          <div className='mbti-and-buttons'>
            <p className='profile-mbti'>{mbti}</p>

            {!isOwner && (
              <div className='inline-button-wrapper'>
                <FollowButton
                  targetId={targetId}
                  onFollowChange={handleFollowChange}
                />
                <button
                  className='message-btn'
                  onClick={async () => {
                    try {
                      const res = await api.post(
                        '/api/chatrooms',
                        { receiverNickname: nickname },
                        { withCredentials: true }
                      );
                      const roomId = res.data.roomId;

                      const listRes = await api.get('/chatrooms', {
                        withCredentials: true,
                      });
                      const updatedRooms = listRes.data.map((room) => ({
                        ...room,
                        targetNickname: room.receiverNickname,
                      }));

                      const targetRoom = updatedRooms.find(
                        (r) => r.roomId === roomId
                      );
                      if (targetRoom) {
                        navigate(`/messagespage?roomId=${roomId}`);
                      }
                    } catch (err) {
                      console.error('❌ 메시지 버튼 실패:', err);
                    }
                  }}
                >
                  <MessageCircle size={16} />
                  메시지
                </button>
              </div>
            )}
          </div>

          <div className='profile-stats'>
            <div className='stats-buttons'>
              <span className='stats-item' onClick={onTogglePosts}>
                게시글
              </span>
              <span className='stats-item'>팔로워 {followerCount}</span>
              <span className='stats-item'>팔로잉 {followingCount}</span>
            </div>
          </div>

          <div className='mbti-description'>
            <h4>
              {mbti} 유형: {mbtiInfo.title}
            </h4>
            <div className='mbti-tags'>
              {mbtiInfo.tags.map((tag, idx) => (
                <span key={idx}>{tag}</span>
              ))}
            </div>
            <p>{mbtiInfo.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendProfileLeft;
