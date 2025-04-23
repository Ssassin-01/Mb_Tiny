import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/AnonymousDetail.css';

function AnonymousDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        alert('글을 불러오지 못했습니다');
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="detail">
      <h1 className="title">{post.title}</h1>
      <div className="info-row">
        <div className="left">
          <span className="writer">{post.writer}</span>
          <span className="date">{new Date(post.createdAt).toLocaleString()}</span>
        </div>
        <div className="right">
          <span>조회 {post.views}</span>
          <span>추천 {post.likes}</span>
        </div>
      </div>

      <div className="content">
        <p>{post.content}</p>
      </div>

      <div className="buttons">
        <button onClick={() => navigate('/anonymous')}>목록으로</button>
      </div>
    </div>
  );
}

export default AnonymousDetail;
