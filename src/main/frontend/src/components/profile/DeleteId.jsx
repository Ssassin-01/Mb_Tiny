// src/components/profile/DeleteId.jsx
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import '../../css/profile/DeleteId.css';

const DeleteId = ({ onClose, onConfirm }) => {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <h2><FaExclamationTriangle className="warning-icon" /> 회원 탈퇴 안내</h2>
        <p className="warning-text">회원탈퇴를 진행하면 계정 정보는 복구되지 않습니다.</p>

        <div className="button-group">
          <button className="cancel-btn" onClick={onClose}>취소</button>
          <button className="delete1-btn" onClick={onConfirm}>회원탈퇴</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteId;
