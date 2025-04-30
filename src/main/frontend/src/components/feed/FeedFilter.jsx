// src/components/feed/FeedFilter.jsx
import React from "react";

const filterOptions = {
  0: ["선택 안함", "I", "E"],
  1: ["선택 안함", "S", "N"],
  2: ["선택 안함", "T", "F"],
  3: ["선택 안함", "J", "P"],
};

const labels = ["E / I", "S / N", "T / F", "J / P"];

function FeedFilter({ mbtiFilter, onChange }) {
  return (
    <div className="mbti-filter-container">
      {labels.map((label, idx) => (
        <div key={idx} className="mbti-filter-group">
          <label className="mbti-filter-label">{label}</label>
          <select value={mbtiFilter[idx]} onChange={(e) => onChange(idx, e.target.value)}>
            {filterOptions[idx].map((val) => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default FeedFilter;
