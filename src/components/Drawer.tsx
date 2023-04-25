import { XMarkIcon } from '@heroicons/react/24/solid';
import SideNavItem from './SideNavItem';

export type NavItemType = {
  name: string;
  icon: JSX.Element;
  to: string;
};

interface IDrawer {
  drawer: boolean;
  setDrawer: (drawerState: boolean) => void;
  navItems: NavItemType[];
}
const Drawer = ({ drawer, setDrawer, navItems }: IDrawer) => {
  const onDrawerClose = () => {
    setDrawer(false);
  };
  return (
    <div
      className={`root ${
        drawer ? 'w-smallNav md:w-nav' : 'hidden'
      } h-screen top-0 left-0 fixed bg-slate-200 z-10`}
    >
      <div className=' flex justify-end items-center w-11/12 h-16'>
        <XMarkIcon className='h-6 w-6 text-blue-800' onClick={onDrawerClose} />
      </div>
      <div className='h-full mt-20 p-4 w-full flex-col items-center'>
        {navItems.map((navItem, i) => (
          <SideNavItem
            name={navItem.name}
            icon={navItem.icon}
            to={navItem.to}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Drawer;
