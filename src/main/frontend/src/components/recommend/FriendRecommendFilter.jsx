import React from "react";
import "../../css/recommend/FriendRecommendFilter.css";

const filterOptions = {
  0: ["선택 안함", "I", "E"],
  1: ["선택 안함", "S", "N"],
  2: ["선택 안함", "T", "F"],
  3: ["선택 안함", "J", "P"],
};

const labels = ["E / I", "S / N", "T / F", "J / P"];

function FriendRecommendFilter({ mbtiFilter, onChange }) {
    return (
      <div className="friend-filter-wrapper">
        <div className="friend-filter-container">
          {labels.map((label, idx) => (
            <div key={idx} className="friend-filter-group">
              <label className="friend-filter-label">{label}</label>
              <select value={mbtiFilter[idx]} onChange={(e) => onChange(idx, e.target.value)}>
                {filterOptions[idx].map((val) => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="friend-filter-guide">
          MBTI별로 친구를 찾아보세요! 🔍
        </div>
      </div>
    );
  }
  

export default FriendRecommendFilter;
