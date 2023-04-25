import Tag from './Tag';

interface IOfferDetail {
  title: string;
  icon: JSX.Element;
  tags: [
    {
      name: string;
    }
  ];
}

const OfferDetails = ({ title, icon, tags }: IOfferDetail) => {
  return (
    <div>
      <div className='flex'>
        <div>{icon}</div>
        <h2 className='ml-4'>{title}</h2>
      </div>
      <div className='flex flex-wrap '>
        {tags.map((tag, i) => (
          <div key={i}>
            <Tag key={i} title={tag.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferDetails;
