import { useState } from 'react';
import { HomeIcon, RectangleGroupIcon } from '@heroicons/react/24/solid';
import TopBar from './TopBar';
import Drawer from './Drawer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [drawer, setDrawer] = useState(true);
  const navItems = [
    {
      name: 'Home',
      icon: <HomeIcon className='mr-auto h-6 w-6' />,
      to: '/',
    },
    {
      name: 'Products',
      icon: <RectangleGroupIcon className='mr-auto h-6 w-6' />,
      to: '/products',
    },
  ];
  return (
    <div>
      <TopBar drawer={drawer} setDrawer={setDrawer} />
      <Drawer navItems={navItems} drawer={drawer} setDrawer={setDrawer} />
      <div
        className={`root ${
          drawer
            ? 'ml-auto w-[calc(100%-theme(width.smallNav))] md:w-[calc(100%-theme(width.nav))]'
            : 'w-full'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
