import React, { useState } from 'react';
import belesAIIcon from '../../../../public/static/beles_ai_icon.svg';

const BelesAIHelper = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="position-relative mb-4">
      {/* Speech Bubble - only visible on hover/click */}
      {isVisible && (
        <div className="bg-white rounded-3 p-3 shadow-sm position-absolute" style={{
          maxWidth: '300px',
          bottom: '100%',
          left: '0',
          zIndex: 1000,
          marginBottom: '10px'
        }}>
          <p className="mb-0 text-dark fw-medium">
            Если есть вопросы могу помочь
          </p>
          {/* Speech bubble pointer */}
          <div className="position-absolute" style={{
            top: '100%',
            left: '20px',
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid white'
          }}></div>
        </div>
      )}
      
      {/* AI Helper Icon and Name - clickable to toggle speech bubble */}
      <div className="d-flex align-items-center">
        {/* Icon */}
        <div 
          className="me-3 d-flex align-items-center justify-content-center cursor-pointer" 
          style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #0D81FF, #4A90E2)',
            borderRadius: '35%',
            boxShadow: '0 4px 12px rgba(13, 129, 255, 0.3)',
            cursor: 'pointer'
          }}
          onClick={handleToggle}
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <img 
            src={belesAIIcon} 
            alt="Beles AI Icon" 
            style={{
              width: '50px',
              height: '50px'
            }}
          />
        </div>
        
        {/* Name Text */}
        <span 
          className="text-muted fw-medium cursor-pointer ml-2"
          style={{ cursor: 'pointer' }}
          onClick={handleToggle}
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          Beles AI помощник
        </span>
      </div>
    </div>
  );
};

export default BelesAIHelper;
