import React from 'react';
import { Menu } from 'antd';
import { SideNavRoutes, SideNavData } from '../data/sideNavObject';
import "../styles/SideNav.css";
import { useNavigate } from 'react-router-dom';

export const SideNav = () => {
  const navigate = useNavigate();

  const routesByKey = SideNavRoutes;

  const onClick = (e) => {
    console.log('click ', e);

    const path = routesByKey[e.key];

    if (path) {
      window.location.href = path; // 👈 navigate
    }
  };

  
  return (
    <Menu
    className="sideNavWrapper"
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={SideNavData}
    />
  );
};
