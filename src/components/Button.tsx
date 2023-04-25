import { useGetAppConfigQuery } from '../features/api/appConfigSliceQuery';

interface IButton {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

const Button = ({ label, onClick, disabled = false }: IButton) => {
  const { data: appConfig } = useGetAppConfigQuery('getAppConfig');
  const bgColor = appConfig?.mainColor;
  return (
    <button
      disabled={disabled}
      className='py-2 px-6 rounded-lg m-auto'
      style={{ background: bgColor, color: 'white' }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
