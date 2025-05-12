// import React, { useState } from 'react';
// import FollowButton from './FollowButton';
// import FollowModal from './FollowModal';

// const FollowSection = ({ targetId, followerCount, followingCount }) => {
//   const [modalType, setModalType] = useState(null);

//   const openModal = (type) => setModalType(type);
//   const closeModal = () => setModalType(null);

//   return (
//     <div className="follow-section">
//       <FollowButton targetId={targetId} />

//       <div className="follow-stats">
//         <span className="follow-count" onClick={() => openModal('followers')}>
//           팔로워 {followerCount}
//         </span>
//         <span className="follow-count" onClick={() => openModal('following')}>
//           팔로잉 {followingCount}
//         </span>
//       </div>

//       {modalType && <FollowModal type={modalType} onClose={closeModal} />}
//     </div>
//   );
// };

// export default FollowSection;
