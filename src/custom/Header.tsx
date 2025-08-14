import React from 'react';
import './Header.scss';

const Header: React.FC = () => {
  return (
    <div className="header-container">
      {/* Main background rectangle */}
      <div className="background-rect"></div>
      
      {/* Language selector */}
      <div className="language-selector">
        Каз Рус Eng
      </div>
      
      {/* Main content group */}
      <div className="content-group">
        {/* Logo/Vector element */}
        <div className="logo-vector"></div>
      </div>
      
      {/* Profile circle */}
      <div className="profile-circle"></div>
      
      {/* Menu icon group */}
      <div className="menu-group">
        <div className="menu-line menu-line-1"></div>
        <div className="menu-line menu-line-2"></div>
        <div className="menu-line menu-line-3"></div>
      </div>
    </div>
  );
};

export default Header;