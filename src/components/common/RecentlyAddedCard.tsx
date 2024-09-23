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
        <div className="h-[40vh]">
          <img src={image} alt="image" className="h-full w-full object-cover" />
        </div>
        <div className="absolute top-0 px-5">
          <h1 className="text-2xl font-black">{title}</h1>
          <p className="text-base mt-2">
            {description.length > 12
              ? `${description.slice(0, 12)}...`
              : description}
          </p>
        </div>
        <div className="absolute bottom-4 italic font-bold px-5">{owner}</div>
      </div>
    </div>
  );
};

export default RecentlyAddedCard;
