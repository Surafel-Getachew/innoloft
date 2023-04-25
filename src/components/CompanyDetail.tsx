import { MapPinIcon } from '@heroicons/react/24/solid';
import { useGetAppConfigQuery } from '../features/api/appConfigSliceQuery';

interface IUser {
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface ICompany {
  name: string;
  logo: string;
  address: {
    country: { name: string };
    city: { name: string };
    street: string;
    zipCode: string;
    longitude: string;
    latitude: string;
  };
}

const CompanyDetail = ({ user, companyDetail }: IUser & ICompany) => {
  const { data: appConfig } = useGetAppConfigQuery('getAppConfig');

  const { country, city, street, zipCode, house, longitude, latitude } =
    companyDetail?.address;

  if (appConfig?.hasUserSection === false) {
    return null;
  }

  return (
    <div className='p-6 bg-white border-2 border-gray-200 flex flex-col'>
      <h1 className='py-4'>Offered by</h1>
      <img alt='company image' src={companyDetail?.logo} />{' '}
      <div className='flex my-4 items-center'>
        <img
          className='m-0'
          alt='avi'
          src={user?.profilePicture}
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
        <p className='ml-2'>
          {user?.firstName} {user?.lastName}
        </p>
      </div>
      <div className='flex my-2 text-gray-600 border-2'>
        <MapPinIcon className=' h-6 w-6' />
        <p className='ml-2'>
          {street} {house} {zipCode} {city?.name}, {country?.name}
        </p>
      </div>
      <iframe
        src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
        className='max-w-[100%]'
      ></iframe>
    </div>
  );
};

export default CompanyDetail;
