import React from "react";
import { getAuthenticatedUser } from "@edx/frontend-platform/auth";
import { getConfig } from "@edx/frontend-platform";

import OrleuLogo from "../../public/static/ORLEU_Vector.svg";
import DefaultProfile from "../../public/static/defaultProfile.png";
import "./Header.scss";

const Header = () => {
  //#region Profile
  const config = getConfig();

  const user = getAuthenticatedUser();
  const accountProfileURL = config.ACCOUNT_PROFILE_URL;
  const profileHref = `${accountProfileURL}/u/${user.username}`;
  //#endregion

  //#region Account
  const accountSettingsUrl = config.ACCOUNT_SETTINGS_URL;
  const accountHref = `${accountSettingsUrl}`;
  //#endregion

  //#region Logout
  const accountLogoutURL = config.LOGOUT_URL;
  //#endregion

  const [open, setOpen] = React.useState(false);

  const userControlsRef = React.useRef(null);

  // Закрытие по клику вне
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userControlsRef.current &&
        !userControlsRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container">
      <div className="logo">
        <img src={OrleuLogo} alt="Orleu Logo" />
      </div>

      <div className="menu">
        <nav className="language-switcher">
          <a href="#" className="lang-link">
            Каз
          </a>
          <a href="#" className="lang-link active">
            Рус
          </a>
          <a href="#" className="lang-link">
            Eng
          </a>
        </nav>

        <div className="user-controls" ref={userControlsRef}>
          <div className="user-avatar" onClick={() => setOpen((prev) => !prev)}>
            <img src={DefaultProfile} alt="Profile" />
          </div>

          {/* <button
            className={`menu-button ${open ? "active" : ""}`}
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="menu-line"></div>
            <div className="menu-line"></div>
            <div className="menu-line"></div>
          </button> */}

          {open && (
            <div className="dropdown-menu-1">
              <ul>
                <li>
                  <a href={profileHref}>Профиль</a>
                </li>
                <li>
                  <a href={accountHref}>Аккаунт</a>
                </li>
                <li>
                  <a href={accountLogoutURL}>Выход</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
