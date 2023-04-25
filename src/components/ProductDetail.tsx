interface IProductDetail {
  img: string;
  name: string;
  description: string;
}

const ProductDetail = ({ img, name, description }: IProductDetail) => {
  return (
    <div className='bg-white p-6 border-2 border-gray-200'>
      <img alt='product image' src={img} />
      <h1 className='mt-4 font-bold'>{name}</h1>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};

export default ProductDetail;
