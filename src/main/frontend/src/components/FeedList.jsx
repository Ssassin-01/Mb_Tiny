import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedCard from "./FeedCard";
import "../css/Feed.css";
// import axios from "axios"; 백엔드 연동 시

// 현재 더미 데이터 사용 중
const allDummyFeeds = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  writer: `유저${i + 1}`,
  content: `${i + 1}번째 피드입니다.`,
  createDate: new Date().toISOString(),
  image: i % 2 === 0 ? `/img/feed_img${(i % 3) + 1}.PNG` : null,
}));

function FeedList() {
  const [feeds, setFeeds] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0); // 백엔드용 페이지 번호

  // 초기 렌더링 시
  useEffect(() => {
    loadMoreFeeds(); 
  }, []);

  // 백엔드 연동용: 페이지 단위로 요청
  const loadMoreFeeds = async () => {
    try {
      // 백엔드 연동 시
      /*
      const res = await axios.get(`http://localhost:8080/api/posts?page=${page}&size=10`);
      const newFeeds = res.data;

      if (newFeeds.length === 0) {
        setHasMore(false);
        return;
      }

      setFeeds(prev => [...prev, ...newFeeds]);
      setPage(prev => prev + 1);
      */

      // 더미 로직 유지 (백엔드 연동시 위 구문으로 바꾸자)
      const nextCount = feeds.length + 10;
      const nextFeeds = allDummyFeeds.slice(0, nextCount);

      if (nextFeeds.length === feeds.length) {
        setHasMore(false);
        return;
      }

      setTimeout(() => {
        setFeeds(nextFeeds);
      }, 500);
    } catch (err) {
      console.error("피드 로딩 실패:", err);
      setHasMore(false); // 에러 시 로딩 중단
    }
  };

  return (
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
    >
      <div className="feed-container">
        {feeds.map((feed) => (
          <FeedCard key={feed.id} feed={feed} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default FeedList;