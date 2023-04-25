import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { NavItemType } from './Drawer';
import { useGetAppConfigQuery } from '../features/api/appConfigSliceQuery';

const SideNavItem = ({ name, icon, to }: NavItemType) => {
  const [activePath, setActivePath] = useState('/');
  const location = useLocation();
  const pathname = location.pathname;
  const { data: appConfig } = useGetAppConfigQuery('getAppConfig');
  const mainColor = appConfig?.mainColor;
  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
    <Link to={to}>
      <div
        className={`flex  mb-4 ${
          activePath === to ? `text-[${mainColor}]` : ''
        }`}
        style={{ color: activePath === to ? mainColor : '#6C7270' }}
      >
        <div className='basis-1/4'>{icon}</div>
        <div className='basis-2/4 hidden md:block'>{name}</div>
      </div>
    </Link>
  );
};

export default SideNavItem;
