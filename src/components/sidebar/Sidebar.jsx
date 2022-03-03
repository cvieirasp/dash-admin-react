import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import sidebarItems from '../../assets/JsonData/sidebar_routes.json';

import './sidebar.css';

const SidebarItem = props => {
  const active = props.active ? 'active' : '';

  return (
    <div className='sidebar__item'>
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>
          {props.title}
        </span>
      </div>
    </div>
  );
};

const Sidebar = props => {
  const activeItem = sidebarItems.findIndex(item => item.route === props.location.pathname);

  return (
    <div className='sidebar'>
      <div className="sidebar__logo">
        <img src={logo} alt="Logotipo da Empresa" />
      </div>
      {
        sidebarItems.map((item, index) => (
          <Link to={item.route} key={index}>
            <div>
              <SidebarItem
                title={item.display_name}
                icon={item.icon}
                active={index === activeItem}
              />
            </div>
          </Link>
        ))
      }
    </div>
  );
};

export default Sidebar;
