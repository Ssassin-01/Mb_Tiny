import React from "react";
import "../css/TagList.css";

const tags = [];

const TagList = () => {
  return (
    <div className="tag-list">
      
      {tags.map((tag, index) => (
        <span key={index} className="tag-item">{tag}</span>
      ))}
    </div>
  );
};

export default TagList;
