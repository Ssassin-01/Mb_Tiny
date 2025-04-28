import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedCard from "./FeedCard";
import FeedInput from './FeedInput';
import FeedFilter from './FeedFilter';
import axios from "axios";

import "../../css/feed/Feed.css";

function FeedList() {
  const [feeds, setFeeds] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [mbtiFilter, setMbtiFilter] = useState(["선택 안함", "선택 안함", "선택 안함", "선택 안함"]);

  useEffect(() => {
    loadMoreFeeds();
  }, [mbtiFilter]);

  // 서버에서 피드 가져오기
  const loadMoreFeeds = async () => {
    try {
      const response = await axios.get('/api/posts', { withCredentials: true });

      const fetchedFeeds = response.data;
      setFeeds(fetchedFeeds);
      setHasMore(false); // 일단 한 번만 호출
    } catch (error) {
      console.error('피드 불러오기 실패:', error);
    }
  };

  // 새 글 작성 후, 서버 피드 다시 불러오기
  const handleNewPost = async ({ content, image }) => {
    try {
      const userMbti = sessionStorage.getItem('mbti') || 'Unknown'; // 여기서 mbti 가져옴

      const formData = new FormData();
      const postData = {
        content: content,
        title: '',
        imageUrl: '',
        mbti: userMbti
      };
      formData.append('postData', JSON.stringify(postData));
      if (image) {
        formData.append('image', image);
      }

      await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
        timeout: 30000, // 추가: 최대 30초 기다림
      });

      loadMoreFeeds(); // 업로드 성공하면 다시 피드 불러오기

    } catch (error) {
      console.error('게시글 업로드 실패', error);
      alert('게시글 업로드에 실패했습니다.');
    }
  };

  // MBTI 필터 변경
  const handleFilterChange = (index, value) => {
    const newFilter = [...mbtiFilter];
    newFilter[index] = value; 
    setMbtiFilter(newFilter);
  };

  return (
    <div className="feed-container">
      <FeedInput onPost={handleNewPost} />
      <FeedFilter mbtiFilter={mbtiFilter} onChange={handleFilterChange} />

      {/* 무한 스크롤로 피드 리스트 */}
      <InfiniteScroll
        dataLength={feeds.length}
        next={loadMoreFeeds}
        hasMore={hasMore}
        loader={<div className="spinner"></div>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>더 이상 불러올 피드가 없습니다</b>
          </p>
        }
        scrollableTarget="mainScroll"
        style={{ overflow: 'visible', position: 'relative' }}
      >
        {feeds.map((feed) => (
          <FeedCard key={feed.id} feed={feed} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default FeedList;
