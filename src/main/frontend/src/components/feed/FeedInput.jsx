import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import '../../css/feed/FeedInput.css';

const FeedInput = ({ onPost }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = () => {
    if (content.trim()) {
      // content + image 넘겨주기
      onPost({ content, image });

      setContent('');
      setImage(null);
      setPreview(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="feed-input-container">
      <textarea
        placeholder="성격만큼 다양한 이야기, 지금 남겨보세요!"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="feed-textarea"
      />

      {preview && (
        <div className="image-preview-container">
          <img src={preview} alt="미리보기" className="image-preview" />
        </div>
      )}

      <div className="feed-input-actions">
        <label className="image-upload-label">
          <FaImage className="image-icon" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </label>
        <button className="feed-post-btn" onClick={handleSubmit}>
          게시하기
        </button>
      </div>
    </div>
  );
};


export default FeedInput;