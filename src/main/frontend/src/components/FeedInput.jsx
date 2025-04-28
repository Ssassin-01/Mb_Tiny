import React, { useState } from 'react';
import '../css/FeedInput.css';

const FeedInput = ({ onPost }) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onPost(content);
      setContent('');
    }
  };

  return (
    <div className="feed-input-container">
      <textarea
        placeholder="무슨 일이 있었나요?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="feed-textarea"
      />
      <div className="feed-input-actions">
        <button className="feed-post-btn" onClick={handleSubmit}>
          게시하기
        </button>
      </div>
    </div>
  );
};

export default FeedInput;
