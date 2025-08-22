import React, { useState, useRef, useEffect } from 'react';
import { useIntl, defineMessages } from '@edx/frontend-platform/i18n';
import defaultLogoWhite from '../../../public/static/orleu_logo_white.svg';
import nationalBankLogo from '../../../public/static/National_Bank_of_Kazakhstan_logo.svg.png';
import './OrleuFooter.scss';

const messages = defineMessages({
  profile: {
    id: 'header.menu.profile',
    defaultMessage: 'Profile',
    description: 'Link to user profile page in header menu',
  },
  account: {
    id: 'header.menu.account',
    defaultMessage: 'Account',
    description: 'Link to account settings page in header menu',
  },
  signOut: {
    id: 'header.menu.signOut',
    defaultMessage: 'Sign out',
    description: 'Link to log out from platform',
  },
});

const OrleuFooter = () => {
  

  return (
         <footer className="footer py-4 bg-dark text-white">
      <div className="container-fluid">
                 <div className="row align-items-center">
           <div className="text-center mb-3 d-flex justify-content-center gap-3 w-100" style={{ gap: '16px' }}>
             <img 
               src={nationalBankLogo} 
               alt="Orleu Logo" 
               className="img-fluid"
               style={{ maxHeight: '40px' }}
             />
             <img 
               src={defaultLogoWhite} 
               alt="Orleu Logo" 
               className="img-fluid"
               style={{ maxHeight: '40px' }}
             />
           </div>
         </div>
        <hr className="my-3 bg-secondary" />
        <div className="row">
          <div className="col-12 text-center">
            <small className="text-muted">&copy; 2024 Orleu. All rights reserved.</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default OrleuFooter;
