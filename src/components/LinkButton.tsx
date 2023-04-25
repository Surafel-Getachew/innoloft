import { Link } from 'react-router-dom';
import { useGetAppConfigQuery } from '../features/api/appConfigSliceQuery';

interface ILinkButton {
  label: string;
  to: string;
}

const LinkButton = ({ label, to }: ILinkButton) => {
  const { data: appConfig } = useGetAppConfigQuery('getAppConfig');
  const bgColor = appConfig?.mainColor;
  return (
    <Link
      className='py-2 px-6 rounded-lg m-auto'
      style={{ background: bgColor, color: 'white' }}
      to={to}
    >
      {label}
    </Link>
  );
};

export default LinkButton;
