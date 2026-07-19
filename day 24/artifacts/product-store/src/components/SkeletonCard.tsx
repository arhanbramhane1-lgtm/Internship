import React from 'react';
import '../styles/skeleton.css';

const SkeletonCard: React.FC = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image skeleton-shimmer"></div>
      <div className="skeleton-content">
        <div className="skeleton-category skeleton-shimmer"></div>
        <div>
          <div className="skeleton-title skeleton-shimmer"></div>
          <div className="skeleton-title-2 skeleton-shimmer"></div>
        </div>
        <div className="skeleton-rating skeleton-shimmer"></div>
        <div className="skeleton-footer">
          <div className="skeleton-price skeleton-shimmer"></div>
          <div className="skeleton-button skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
