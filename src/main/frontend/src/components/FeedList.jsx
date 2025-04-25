import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedCard from "./FeedCard";
import FeedInput from './FeedInput';

import "../css/Feed.css";

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

  useEffect(() => {
    loadMoreFeeds();
  }, []);

  const loadMoreFeeds = () => {
    const nextCount = feeds.length + 10;
    const nextFeeds = allDummyFeeds.slice(0, nextCount);

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
      createDate: new Date().toISOString(),
      image: null,
    };
    setFeeds([newFeed, ...feeds]);
  };

  return (
    <div className="feed-container">
      <FeedInput onPost={handleNewPost} />

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
        scrollableTarget="mainScroll" // ✅ 중요: 무한 스크롤 대상 지정
      >
        {feeds.map((feed) => (
          <FeedCard key={feed.id} feed={feed} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default FeedList;
