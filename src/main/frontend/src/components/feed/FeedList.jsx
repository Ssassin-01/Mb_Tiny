import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedCard from "./FeedCard";
import FeedInput from './FeedInput';
import FeedFilter from './FeedFilter'; 

import "../../css/feed/Feed.css";

// MBTI 더미 피드 데이터
const allDummyFeeds = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  writer: `유저${i + 1}`,
  content: `${i + 1}번째 피드입니다.`,
  mbti: ["INTJ", "ENFP", "ISFJ", "ESFP", "ENTP", "ISTP", "INFJ", "ESFJ"][(i + 1) % 8],
  createDate: new Date().toISOString(),
  image: i % 2 === 0 ? `/img/feed_img${(i % 3) + 1}.PNG` : null,
}));

function FeedList() {
  const [feeds, setFeeds] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [mbtiFilter, setMbtiFilter] = useState(["선택 안함", "선택 안함", "선택 안함", "선택 안함"]);

  useEffect(() => {
    setFeeds([]);
    setHasMore(true);
    loadMoreFeeds();
  }, [mbtiFilter]);

  const matchesFilter = (mbti) => {
    return mbtiFilter.every((val, idx) => val === "선택 안함" || mbti[idx] === val);
  };

  const loadMoreFeeds = () => {
    const filtered = allDummyFeeds.filter((feed) => matchesFilter(feed.mbti));
    const nextCount = feeds.length + 10;
    const nextFeeds = filtered.slice(0, nextCount);

    if (nextFeeds.length === feeds.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setFeeds(nextFeeds);
    }, 500);
  };

  const handleNewPost = (content) => {
    const newFeed = {
      id: Date.now(),
      writer: "나",
      content,
      mbti: "ENFP", // 임시 기본 MBTI
      createDate: new Date().toISOString(),
      image: null,
    };
    setFeeds([newFeed, ...feeds]);
  };

  const handleFilterChange = (index, value) => {
    const newFilter = [...mbtiFilter];
    newFilter[index] = value;
    setMbtiFilter(newFilter);
  };

  return (
    <div className="feed-container">
      <FeedInput onPost={handleNewPost} />

      {/* MBTI 필터 컴포넌트 */}
      <FeedFilter mbtiFilter={mbtiFilter} onChange={handleFilterChange} />

      {/* 피드 리스트 */}
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
  style={{
    overflow: 'visible',     // 내부 div 덮어쓰기
    position: 'relative'     // 안전하게 위치 제어
  }}
>
  {feeds.map((feed) => (
    <FeedCard key={feed.id} feed={feed} />
  ))}
</InfiniteScroll>

    </div>
  );
}

export default FeedList;
