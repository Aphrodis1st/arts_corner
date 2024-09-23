interface RecentlyAddedCardProps {
  title: string;
  description: string;
  owner: string;
  image: string;
}

const RecentlyAddedCard = ({
  description,
  owner,
  title,
  image,
}: RecentlyAddedCardProps) => {
  return (
    <div>
      <div className="relative">
        <div className="">
          <img src={image} alt="image" />
        </div>
        <div className="absolute top-0">
          <h1 className="text-2xl font-black">{title}</h1>
          <p className="text-base mt-2">{description}</p>
        </div>
        <div className="absolute bottom-4 italic font-bold">{owner}</div>
      </div>
    </div>
  );
};

export default RecentlyAddedCard;
