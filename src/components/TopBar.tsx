import { Bars3Icon } from '@heroicons/react/24/solid';
import { useGetAppConfigQuery } from '../features/api/appConfigSliceQuery';

interface IDrawer {
  drawer: boolean;
  setDrawer: (drawerState: boolean) => void;
}
const TopBar = ({ drawer, setDrawer }: IDrawer) => {
  const { data: appConfig } = useGetAppConfigQuery('getAppConfig');

  const openDrawer = () => {
    setDrawer(true);
  };
  const mainColor = appConfig?.mainColor;
  const logo = appConfig?.logo;
  const id = appConfig?.id;
  return (
    <div
      className={`root transition duration-150 ${
        drawer
          ? 'lg:w-[calc(100%-theme(width.nav))] sm:w-[calc(100%-theme(width.smallNav))]'
          : 'w-full'
      } ml-auto h-16 drop-shadow-lg  text-white flex items-center`}
      style={{ backgroundColor: mainColor }}
    >
      {!drawer && (
        <Bars3Icon className='ml-10 h-6 w-6 text-white' onClick={openDrawer} />
      )}
      <div className={`mx-auto ${id == 1 ? 'bg-white px-3 h-[64px]' : ''}`}>
        <img src={logo} className='w-[100px] h-[60px]' alt='logo' />
      </div>
    </div>
  );
};

export default TopBar;
