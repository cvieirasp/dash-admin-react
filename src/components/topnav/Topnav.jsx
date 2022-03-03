import React from 'react';
import { Link } from 'react-router-dom';

import Dropdown from '../dropdown/Dropdown';
import ThemeMenu from '../theme-menu/ThemeMenu';
import notifications from '../../assets/JsonData/notification.json';
import userMenu from '../../assets/JsonData/user_menus.json';
import userImage from '../../assets/images/profile.jpg';

import './topnav.css';

const currentUser = {
  displayName: 'Carlos Figueiredo',
  avatar: userImage
}

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
);

const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img src={user.avatar} alt="Avatar do Usuário" />
    </div>
    <div className="topnav__right-user__name">
      {user.displayName}
    </div>
  </div>
);

const renderUserMenu = (item, index) => (
  <Link to='/' key={index}>
    <div className="notification-item">
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  </Link>
);

const Topnav = () => {
  return (
    <div className='topnav'>
      <div className="topnav__search">
        <input type='text' placeholder='Pesquise aqui...' />
        <i className='bx bx-search'></i>
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          <Dropdown 
            customToggle={() => renderUserToggle(currentUser)}
            contentData={userMenu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        <div className="topnav__right-item">
          <Dropdown 
            icon='bx bx-bell'
            badge='12'
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to='/'>Ver todos</Link>}
          />
        </div>
        <div className="topnav__right-item">
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
