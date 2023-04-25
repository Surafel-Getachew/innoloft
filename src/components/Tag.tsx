const Tag = ({ title }: { title: string }) => {
  return (
    <div className='bg-[#E6E7EB] min-w-[90px] my-2 ml-10 px-8 py-1 rounded-3xl'>
      <p className='text-[#6C7280]'>{title}</p>
    </div>
  );
};

export default Tag;
