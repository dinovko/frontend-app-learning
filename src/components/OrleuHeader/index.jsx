import React, { useState, useRef, useEffect } from 'react';
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useIntl,defineMessages } from '@edx/frontend-platform/i18n';
import defaultProfile from '../../../public/static/default_profile.png';
import defaultLogoWhite from '../../../public/static/orleu_logo_white.svg';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

const messages = defineMessages({
  dashboard: {
    id: 'header.menu.dashboard',
    defaultMessage: 'Dashboard',
    description: 'Link to user dashboard page in header menu',
  },
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

const OrleuHeader = () => {
  const intl = useIntl();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);

  const DASHBOARD_URL = `${getConfig().LMS_BASE_URL}/dashboard`;
  const LOGOUT_URL = getConfig().LOGOUT_URL;
  const ACCOUNT_PROFILE_URL = `${getConfig().ACCOUNT_PROFILE_URL}/u/${currentUser}`;
  const ACCOUNT_SETTINGS_URL = getConfig().ACCOUNT_SETTINGS_URL;

  async function getCurrentUser() {
    const httpClient = getAuthenticatedHttpClient();
    const response = await httpClient.get(`${getConfig().LMS_BASE_URL}/api/user/v1/me`);
    setCurrentUser(response.data.username);
  }

  console.log(getConfig());

  // Close dropdown when clicking outside
  useEffect(() => {
    getCurrentUser();
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-100"
      style={{
        height: '48px',
        background: 'linear-gradient(0deg, #15171E, #15171E), #F6F6F6'
      }}>
      <div className="d-flex align-items-center justify-content-between px-3 mx-auto"
        style={{ maxWidth: '1400px', height: '100%' }}>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center justify-content-center text-white fw-bold border-opacity-10"
            style={{ width: '71.1px', height: '19.23px', fontSize: '16px', backgroundImage: `url(${defaultLogoWhite})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
          </div>
        </div>
        <LanguageSwitcher  />
        <div className="d-flex align-items-center position-relative" ref={dropdownRef}>
          <div
            className="rounded-circle border border-white border-opacity-10 d-flex align-items-center justify-content-center cursor-pointer overflow-hidden mr-2"
            style={{ width: '30px', height: '30px' }}
          >
            <img
              src={defaultProfile}
              alt="Profile"
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="d-flex flex-column justify-content-between ml-2 position-relative mb-2"
            style={{ width: '14px', height: '12px' }} onClick={toggleDropdown}>
            <div className="bg-white border border-white border-opacity-10 position-absolute"
              style={{ width: '2px', height: '14px', top: '0px', left: '0px', transform: 'rotate(90deg)' }}></div>
            <div className="bg-white border border-white border-opacity-10 position-absolute"
              style={{ width: '2px', height: '14px', top: '5px', left: '0px', transform: 'rotate(90deg)' }}></div>
            <div className="bg-white border border-white border-opacity-10 position-absolute"
              style={{ width: '2px', height: '14px', top: '10px', left: '0px', transform: 'rotate(90deg)' }}></div>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="position-absolute top-100 end-0 mt-2 bg-dark border border-white border-opacity-10 rounded shadow-lg"
              style={{ minWidth: '200px', zIndex: 1001, top: '23px', right: '0px', background: 'linear-gradient(0deg, #15171E, #15171E), #F6F6F6' }}>
              <div className="p-3 border-bottom border-white border-opacity-10">
                <div className="text-white fw-bold">{currentUser}</div>
              </div>
              <div className="py-2">
                <a href={ACCOUNT_PROFILE_URL} className="d-block px-3 py-2 text-white text-decoration-none hover-bg-secondary">
                  {intl.formatMessage(messages.profile)}
                </a>
                <a href={ACCOUNT_SETTINGS_URL} className="d-block px-3 py-2 text-white text-decoration-none hover-bg-secondary">
                  {intl.formatMessage(messages.account)}
                </a>
                <div className="border-top border-white border-opacity-10 my-2"></div>
                <a href={LOGOUT_URL} className="d-block px-3 py-2 text-white text-decoration-none hover-bg-secondary">
                  {intl.formatMessage(messages.signOut)}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrleuHeader;
