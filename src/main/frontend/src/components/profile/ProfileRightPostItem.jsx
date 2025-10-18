import React from 'react';
import '../../css/profile/Profile.css';
import { toImageUrl } from '../../utils/image'; // ✅ 공통 함수 import

const PostItem = ({ post, isAnonymous }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return '날짜 없음';
    const date = new Date(dateStr);
    return isNaN(date) ? '날짜 오류' : date.toLocaleString('ko-KR');
  };

  const formattedDate = formatDate(post.createdAt || post.createDate);

  return (
    <div className='feed-card'>
      {isAnonymous ? (
        <>
          <h4 className='post-title'>{post.title}</h4>
          <p className='post-content'>{post.content}</p>
          {post.imageUrl && (
            <img
              src={toImageUrl(post.imageUrl)} // ✅ 통합 변환 함수 사용
              alt='게시글 이미지'
              className='feed-image'
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  'https://mbtiny-image-bucket.s3.ap-northeast-2.amazonaws.com/profile/default.png';
              }}
            />
          )}
          <div className='post-meta'>
            <p className='date'>🕒 {formattedDate}</p>
            <p className='info'>
              👁 조회 {post.viewCount || 0} · ❤️ 추천 {post.likeCount || 0}
            </p>
          </div>
        </>
      ) : (
        <>
          <p className='post-writer'>
            <strong>{post.writer || post.nickname}</strong>
          </p>
          <p className='post-content'>{post.content}</p>
          {post.imageUrl && (
            <img
              src={toImageUrl(post.imageUrl)} // ✅ 이 부분도 통합
              alt='피드 이미지'
              className='feed-image'
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  'https://mbtiny-image-bucket.s3.ap-northeast-2.amazonaws.com/profile/default.png';
              }}
            />
          )}
          <p className='date'>🕒 {formattedDate}</p>
        </>
      )}
    </div>
  );
};

export default PostItem;
