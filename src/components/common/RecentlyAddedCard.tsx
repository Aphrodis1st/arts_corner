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
        <div className="h-[40vh] relative">
          <img src={image} alt="image" className="h-full w-full object-cover" />
          <div className="w-full h-[40vh] top-0 z-10 bg-black/30 absolute"></div>
        </div>
        <div className="absolute z-20 top-0 px-5">
          <h1 className="text-2xl font-black">{title}</h1>
          <p className="text-base mt-2">
            {description.length > 12
              ? `${description.slice(0, 12)}...`
              : description}
          </p>
        </div>
        <div className="absolute z-20 bottom-4 italic font-bold px-5">
          {owner}
        </div>
      </div>
    </div>
  );
};

export default RecentlyAddedCard;
