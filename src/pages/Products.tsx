import Layout from '../components/Layout';
// import { Provider } from 'react-redux';
// import { store } from './redux/store';
import DOMPurify from 'dompurify';
import ReactPlayer from 'react-player';
import {
  CpuChipIcon,
  BriefcaseIcon,
  ClockIcon,
  BanknotesIcon,
} from '@heroicons/react/24/solid';

import { useGetProductsQuery } from '../features/api/productSliceQuery';
import ProductDetail from '../components/ProductDetail';
import CompanyDetail from '../components/CompanyDetail';
import OfferDetails from '../components/OfferDetail';
import LinkButton from '../components/LinkButton';

const Products = () => {
  const {
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    data: product,
  } = useGetProductsQuery('getPost');

  const loading = isLoading || isFetching;

  const renderProduct = () => {
    if (loading) {
      return <>Loading...</>;
    }

    if (isError || error) {
      return <>Error...</>;
    }

    const offers = [
      {
        title: 'Technology',
        icon: <CpuChipIcon className='h-6 w-6' />,
        tags: product?.categories,
      },
      {
        title: 'Business Model',
        icon: <BriefcaseIcon className='h-6 w-6' />,
        tags: product?.businessModels,
      },
      {
        title: 'TRL',
        icon: <ClockIcon className='h-6 w-6' />,
        tags: [product?.trl],
      },
      {
        title: 'Cost',
        icon: <BanknotesIcon className='h-6 w-6' />,
        tags: [{ name: product?.investmentEffort }],
      },
    ];

    if (isSuccess) {
      return (
        <div className=''>
          <div className='w-[95%] my-4 mx-auto flex flex-wrap xl:flex-nowrap justify-between '>
            <div className='basis-[95%] lg:basis-[70%]'>
              <div className='my-4'>
                <LinkButton label='Edit Product' to='/products/edit' />
              </div>
              <ProductDetail
                name={product.name}
                description={DOMPurify.sanitize(product.description)}
                img={product.picture}
              />
            </div>
            <div className='basis-[95%] my-4 lg:my-0 lg:basis-[28%] '>
              <CompanyDetail
                user={product.user}
                companyDetail={product.company}
              />
            </div>
          </div>
          <div className='bg-white w-[95%] my-4 mx-auto p-6'>
            <div className=''>
              <h1 className='font-bold '>Video</h1>
            </div>
            <div className='flex justify-center w-full'>
              <ReactPlayer
                style={{ width: '100%', height: '100%' }}
                url={
                  'https://www.youtube.com/watch?v=x33kQ4jWnmw&ab_channel=DanielLaera'
                }
              />
            </div>
          </div>
          <div className='bg-white w-[95%] my-4 mx-auto '>
            <div className='p-6'>
              <h1 className='font-bold '>Offer Details</h1>
            </div>
            <div className='p-6 flex justify-between flex-wrap'>
              {offers.map((offer, i) => (
                <div className='w-full lg:w-[49%]' key={i}>
                  <OfferDetails
                    title={offer.title}
                    icon={offer.icon}
                    tags={offer.tags}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <Layout>
      <div className='bg-background '>{renderProduct()}</div>
    </Layout>
  );
};

export default Products;
