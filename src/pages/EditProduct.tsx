import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';
import Layout from '../components/Layout';
import CompanyDetail from '../components/CompanyDetail';
import Button from '../components/Button';
import {
  useGetProductsQuery,
  useUpdateProductMutation,
} from '../features/api/productSliceQuery';
import { useGetTrlsQuery } from '../features/api/trlSliceQuery';
import { IProduct } from '../types/IProduct';
import { useGetAppConfigQuery } from '../features/api/appConfigSliceQuery';
import LinkButton from '../components/LinkButton';

const EditProduct = () => {
  const [currentProduct, setCurrentProduct] = useState<IProduct>();

  // redux states
  const {
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    data: product,
  } = useGetProductsQuery('getPost');
  const { data: trls } = useGetTrlsQuery('getTrls');
  const [updateProduct, { isLoading: isProductUpdateLoading }] =
    useUpdateProductMutation();
  const { data: appConfig } = useGetAppConfigQuery('getAppConfig');

  // enable-disable-button
  const canSave =
    [
      currentProduct?.description,
      currentProduct?.categories,
      currentProduct?.businessModels,
      currentProduct?.trl,
    ].every(Boolean) && !isLoading;

  // change handlers
  const onEditProduct = async () => {
    if (canSave) {
      if (canSave && currentProduct) {
        try {
          await updateProduct(currentProduct).unwrap();
        } catch (error) {
          console.log('Failed to save the product', error);
        } finally {
          // setAddRequestStatus('idle');
        }
      }
    }
  };

  const handleDescriptionChange = (content: string) => {
    if (currentProduct) {
      setCurrentProduct({ ...currentProduct, description: content });
    }
  };

  const onTrlChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTrl = trls?.find(
      (trl) => trl.id === parseInt(e.target.value)
    );
    if (currentProduct && selectedTrl) {
      setCurrentProduct({ ...currentProduct, trl: selectedTrl });
    }
  };

  function removeTag(id: number, name: 'businessModels' | 'categories') {
    if (currentProduct) {
      const updateTag = currentProduct?.[name].filter((tag) => tag.id !== id);
      setCurrentProduct({ ...currentProduct, [name]: updateTag });
    }
  }

  function handleKeyDown(e) {
    if (e.key !== 'Enter') return;
    const value = e.target.value;
    const name = e.target.name;
    if (!value.trim()) return;
    if (currentProduct) {
      const newTag = {
        id: Date.now(),
        name: value as string,
      };
      setCurrentProduct({
        ...currentProduct,
        [name]: [...currentProduct[name], newTag],
      });
    }
    e.target.value = '';
  }

  const loading = isLoading || isFetching;

  useEffect(() => {
    setCurrentProduct(product);
  }, [product]);

  const renderProductEdit = () => {
    if (loading) {
      return <>Loading...</>;
    }

    if (isError || error) {
      return <>Error...</>;
    }
    if (currentProduct) {
      return (
        <div>
          <div className='w-[95%] my-4 mx-auto flex flex-wrap xl:flex-nowrap justify-between '>
            <div className='basis-[95%] lg:basis-[70%] flex flex-col items-between'>
              <div className='my-4'>
                <LinkButton label='View Product' to='/products' />
              </div>
              <div>
                <ReactQuill
                  value={DOMPurify.sanitize(currentProduct?.description)}
                  onChange={handleDescriptionChange}
                  style={{ display: 'block' }}
                />
              </div>
              <div className=' py-4'>
                <h1 className='font-bold'>Categories</h1>
                <input
                  type='text'
                  name='categories'
                  onKeyDown={handleKeyDown}
                  placeholder='Add Technologies'
                  className='border-2 my-4 px-2 border-[#6C7280] rounded-md'
                ></input>
                <div className='flex flex-wrap max-w-full'>
                  {currentProduct?.categories.map((value, i) => (
                    <div
                      key={i}
                      className={`ml-${
                        i === 0 ? 0 : 4
                      } bg-[#E6E7EB] px-8 py-1 rounded-3xl my-2`}
                    >
                      <span className='text-[#6C7280]'>{value.name}</span>
                      <span
                        onClick={() => removeTag(value.id, 'categories')}
                        className='text-[#6C7280] hover:cursor-pointer ml-4'
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className=''>
                <h1 className='font-bold'>Business Models</h1>
                <input
                  type='text'
                  name='businessModels'
                  onKeyDown={handleKeyDown}
                  placeholder='Add Business Models'
                  className='block my-4 border-2 px-2 border-[#6C7280] rounded-md'
                ></input>
                <div className='flex flex-wrap'>
                  {currentProduct?.businessModels.map((value, i) => (
                    <div
                      key={i}
                      className={` ml-${
                        i === 0 ? 0 : 4
                      } bg-[#E6E7EB] px-8 py-1 rounded-3xl my-2`}
                    >
                      <span className='text-[#6C7280]'>{value.name}</span>
                      <span
                        onClick={() => removeTag(value.id, 'businessModels')}
                        className='text-[#6C7280] hover:cursor-pointer ml-4'
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='py-4'>
                <label className='font-bold' htmlFor='trl'>
                  Select TRL:
                </label>
                <select
                  id='trls'
                  name='trls'
                  value={currentProduct.trl.id}
                  onChange={onTrlChange}
                  className='block w-full sm:text-sm md:w-1/2 lg:w-1/3 my-4 border-2 px-2 border-[#6C7280] rounded-md'
                >
                  {trls?.map((trl) => (
                    <option className='max-w-full' key={trl.id} value={trl.id}>
                      {trl.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Button
                  label='Edit Product'
                  disabled={false}
                  onClick={onEditProduct}
                />
              </div>
            </div>
            <div className='basis-[95%] my-4 lg:my-0 lg:basis-[28%] '>
              <CompanyDetail
                user={product?.user}
                companyDetail={product?.company}
              />
            </div>
          </div>
        </div>
      );
    }
  };

  return <Layout>{renderProductEdit()}</Layout>;
};

export default EditProduct;
