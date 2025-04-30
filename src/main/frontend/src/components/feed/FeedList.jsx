import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedCard from "./FeedCard";
import FeedInput from './FeedInput';
import FeedFilter from './FeedFilter';
import axios from "axios";

import "../../css/feed/Feed.css";

function FeedList() {
  const [feeds, setFeeds] = useState([]);
  const [allFeeds, setAllFeeds] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [mbtiFilter, setMbtiFilter] = useState(["선택 안함", "선택 안함", "선택 안함", "선택 안함"]);
  useEffect(() => {
    loadMoreFeeds();
  }, []);
  useEffect(() => {
    setFeeds(filterFeeds(allFeeds, mbtiFilter));
  }, [mbtiFilter, allFeeds]);

  // 서버에서 피드 가져오기
  const loadMoreFeeds = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/posts', { withCredentials: true });
      const fetchedFeeds = response.data;
  
      setAllFeeds(fetchedFeeds);
      setFeeds(filterFeeds(fetchedFeeds, mbtiFilter)); // 가져오자마자 필터 적용
      setHasMore(false);
    } catch (error) {
      console.error('서버 에러 상세:', error.response?.data);
    }
  };
  const filterFeeds = (feeds, mbtiFilter) => {
    const [IorE, NorS, TorF, JorP] = mbtiFilter;
  
    return feeds.filter(feed => {
      if (!feed.mbti) return false; // MBTI 없는 글 제외
      const mbti = feed.mbti.toUpperCase();
      if (IorE !== "선택 안함" && mbti[0] !== IorE) return false;
      if (NorS !== "선택 안함" && mbti[1] !== NorS) return false;
      if (TorF !== "선택 안함" && mbti[2] !== TorF) return false;
      if (JorP !== "선택 안함" && mbti[3] !== JorP) return false;
      return true;
    });
  };
  

  // 새 글 작성
  const handleNewPost = async ({ content, image }) => {
    try {
      const formData = new FormData();
      const postData = {
        content: content,
        title: '',
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
        timeout: 30000,
      });

      loadMoreFeeds();
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

  // 피드 삭제 함수
  const handleDelete = async (postId) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await axios.delete(`/api/posts/${postId}`, { withCredentials: true });
      alert('게시글이 삭제되었습니다.');
      loadMoreFeeds(); // 삭제 후 다시 로드
    } catch (error) {
      console.error('게시글 삭제 실패', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  // 좋아요 함수
  const handleLike = async (postId) => {
    try {
      await axios.post(`/api/posts/${postId}/like`, null, { withCredentials: true });
      loadMoreFeeds(); // 좋아요 성공하면 피드 다시 불러오기
    } catch (error) {
      console.error('좋아요 실패:', error);
      alert('좋아요에 실패했습니다.');
    }
  };

  // 피드 수정 함수
  const handleUpdate = async (postId, newContent, newImage) => {
    try {
      const formData = new FormData();
      const postData = {
        content: newContent,
        title: '', // 필요에 따라 수정
      };
      formData.append('postData', JSON.stringify(postData));
      if (newImage) {
        formData.append('image', newImage);
      }

      await axios.put(`/api/posts/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      alert('게시글이 수정되었습니다.');
      loadMoreFeeds(); // 수정 후 다시 로드
    } catch (error) {
      console.error('게시글 수정 실패', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  return (
    <div className="feed-container">
      <FeedInput onPost={handleNewPost} />
      <FeedFilter mbtiFilter={mbtiFilter} onChange={handleFilterChange} />

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
          <FeedCard
            key={feed.id}
            feed={feed}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onLike={handleLike}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default FeedList;
