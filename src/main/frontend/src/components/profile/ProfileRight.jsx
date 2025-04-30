import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProfileFeedCard from './ProfileFeedCard'; // ✅ 새 컴포넌트
import PostItem from './ProfileRightPostItem';   // 익명글용
import '../../css/profile/Profile.css';
import axios from 'axios';

function ProfileRight() {
  const [activeTab, setActiveTab] = useState('feed');
  const [feedPosts, setFeedPosts] = useState([]);
  const [anonymousPosts, setAnonymousPosts] = useState([]);
  const [hasMoreFeed, setHasMoreFeed] = useState(true);
  const [hasMoreAnon, setHasMoreAnon] = useState(true);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const userRes = await axios.get('http://localhost:8080/api/members/me', { withCredentials: true });
      const loginUser = userRes.data;

      if (!loginUser) return;
      const feedRes = await axios.get('http://localhost:8080/api/posts', { withCredentials: true });
      const myFeeds = feedRes.data.filter(post => post.email === loginUser.email);
      setFeedPosts(myFeeds);
      setHasMoreFeed(false);
      const anonRes = await axios.get('http://localhost:8080/api/anonymous-posts', { withCredentials: true });
      const myAnons = anonRes.data.filter(post => post.email === loginUser.email);
      setAnonymousPosts(myAnons);
      setHasMoreAnon(false);
    } catch (error) {
      console.error('내 게시글 불러오기 실패:', error);
    }
  };

  // ✅ 삭제
  const handleDelete = async (postId) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await axios.delete(`http://localhost:8080/api/posts/${postId}`, { withCredentials: true });
      alert('삭제되었습니다.');
      fetchMyPosts();
    } catch (err) {
      console.error('삭제 실패:', err);
      alert('삭제 실패');
    }
  };

  // ✅ 수정
  const handleUpdate = async (postId, newContent, newImage) => {
    try {
      const formData = new FormData();
      const postData = {
        content: newContent,
        title: '',
      };
      formData.append('postData', JSON.stringify(postData));
      if (newImage) {
        formData.append('image', newImage);
      }

      await axios.put(`http://localhost:8080/api/posts/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      alert('수정 완료');
      fetchMyPosts();
    } catch (err) {
      console.error('수정 실패:', err);
      alert('수정 실패');
    }
  };

  return (
    <div className='profile-right-container'>
      {/* 탭 */}
      <div className='profile-tab-buttons'>
        <button
          className={activeTab === 'feed' ? 'active' : ''}
          onClick={() => setActiveTab('feed')}
        >
          내가 쓴 피드
        </button>
        <button
          className={activeTab === 'anonymous' ? 'active' : ''}
          onClick={() => setActiveTab('anonymous')}
        >
          익명 게시판
        </button>
      </div>

      {/* 게시글 목록 */}
      <div className='profile-post-list' id='profileScroll'>
        {activeTab === 'feed' && (
          <InfiniteScroll
            dataLength={feedPosts.length}
            next={() => {}}
            hasMore={hasMoreFeed}
            loader={<div className='spinner'></div>}
            endMessage={<p style={{ textAlign: 'center' }}>더 이상 피드가 없습니다.</p>}
            scrollableTarget='profileScroll'
            style={{ overflow: 'visible', position: 'relative' }}
          >
            {feedPosts.map((feed) => (
              <ProfileFeedCard
                key={feed.id}
                feed={feed}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </InfiniteScroll>
        )}

        {activeTab === 'anonymous' && (
          <InfiniteScroll
            dataLength={anonymousPosts.length}
            next={() => {}}
            hasMore={hasMoreAnon}
            loader={<div className='spinner'></div>}
            endMessage={<p style={{ textAlign: 'center' }}>더 이상 익명글이 없습니다.</p>}
            scrollableTarget='profileScroll'
            style={{ overflow: 'visible', position: 'relative' }}
          >
            {anonymousPosts.map((post) => (
              <PostItem key={post.id} post={post} isAnonymous />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default ProfileRight;
