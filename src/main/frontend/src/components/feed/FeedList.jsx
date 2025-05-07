import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedCard from "./FeedCard";
import FeedInput from './FeedInput';
import FeedFilter from './FeedFilter';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/feed/Feed.css";

function FeedList() {
  const [feeds, setFeeds] = useState([]);
  const [allFeeds, setAllFeeds] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const [mbtiFilter, setMbtiFilter] = useState(["선택 안함", "선택 안함", "선택 안함", "선택 안함"]);
  const [sortType, setSortType] = useState("recent");

  const [message, setMessage] = useState('');
  const [showBanner, setShowBanner] = useState(false);
  const navigate = useNavigate();

  const showAutoBannerThenLogin = (text) => {
    setMessage(text);
    setShowBanner(true);
    setTimeout(() => {
      setShowBanner(false);
      navigate('/login');
    }, 2000);
  };

  useEffect(() => {
    resetAndLoadFeeds();
  }, [sortType]);

  useEffect(() => {
    resetAndLoadFeeds();
  }, [mbtiFilter]);

  const resetAndLoadFeeds = async () => {
    setPage(1);
    setHasMore(true);
    try {
      const url =
        sortType === "popular"
          ? "http://localhost:8080/api/posts/popular"
          : "http://localhost:8080/api/posts";

      const response = await axios.get(url, { withCredentials: true });
      const fetched = filterFeeds(response.data, mbtiFilter);

      setAllFeeds(fetched);
      setFeeds(fetched.slice(0, perPage));
      if (fetched.length <= perPage) setHasMore(false);
    } catch (error) {
      console.error('서버 에러 상세:', error.response?.data);
    }
  };

  const loadMoreFeeds = () => {
    setTimeout(() => {
      const nextPage = page + 1;
      const start = (nextPage - 1) * perPage;
      const end = nextPage * perPage;
  
      const more = allFeeds.slice(start, end);
      setFeeds(prev => [...prev, ...more]);
      setPage(nextPage);
  
      if (end >= allFeeds.length) setHasMore(false);
    }, 500); // 스피너 보일 수 있게 0.5초 지연
  };
  
  const filterFeeds = (feeds, mbtiFilter) => {
    const [IorE, NorS, TorF, JorP] = mbtiFilter;
    return feeds.filter(feed => {
      if (!feed.mbti) return false;
      const mbti = feed.mbti.toUpperCase();
      if (IorE !== "선택 안함" && mbti[0] !== IorE) return false;
      if (NorS !== "선택 안함" && mbti[1] !== NorS) return false;
      if (TorF !== "선택 안함" && mbti[2] !== TorF) return false;
      if (JorP !== "선택 안함" && mbti[3] !== JorP) return false;
      return true;
    });
  };

  const handleNewPost = async ({ content, image }) => {
    const user = sessionStorage.getItem('loginUser');
    if (!user) {
      showAutoBannerThenLogin('로그인이 필요합니다.');
      return;
    }

    try {
      const formData = new FormData();
      const postData = { content, title: '' };
      formData.append('postData', JSON.stringify(postData));
      if (image) formData.append('image', image);

      await axios.post('http://localhost:8080/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      resetAndLoadFeeds();
    } catch (error) {
      console.error('게시글 업로드 실패', error);
      alert('게시글 업로드에 실패했습니다.');
    }
  };

  const handleFilterChange = (index, value) => {
    const newFilter = [...mbtiFilter];
    newFilter[index] = value;
    setMbtiFilter(newFilter);
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await axios.delete(`http://localhost:8080/api/posts/${postId}`, { withCredentials: true });
      alert('게시글이 삭제되었습니다.');
      resetAndLoadFeeds();
    } catch (error) {
      console.error('게시글 삭제 실패', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:8080/api/posts/${postId}/like`, null, { withCredentials: true });
      resetAndLoadFeeds();
    } catch (error) {
      console.error('좋아요 실패:', error);
      alert('좋아요에 실패했습니다.');
    }
  };

  const handleUpdate = async (postId, newContent, newImage) => {
    try {
      const formData = new FormData();
      const postData = { content: newContent, title: '' };
      formData.append('postData', JSON.stringify(postData));
      if (newImage) formData.append('image', newImage);

      await axios.put(`http://localhost:8080/api/posts/${postId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      alert('게시글이 수정되었습니다.');
      resetAndLoadFeeds();
    } catch (error) {
      console.error('게시글 수정 실패', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  return (
    <div className="feed-container">
      {showBanner && <div className="alert-message">{message}</div>}

      <FeedInput onPost={handleNewPost} />
      <FeedFilter mbtiFilter={mbtiFilter} onChange={handleFilterChange} />

      <div className="sort-buttons">
        <button
          className={sortType === 'recent' ? 'active' : ''}
          onClick={() => setSortType('recent')}
        >
          최신순
        </button>
        <button
          className={sortType === 'popular' ? 'active' : ''}
          onClick={() => setSortType('popular')}
        >
          좋아요순
        </button>
      </div>

      <InfiniteScroll
        dataLength={feeds.length}
        next={loadMoreFeeds}
        hasMore={hasMore}
        loader={<div className="spinner"></div>}
        endMessage={<p style={{ textAlign: "center" }}><b>더 이상 불러올 피드가 없습니다</b></p>}
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
