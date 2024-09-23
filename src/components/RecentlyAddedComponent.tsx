import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/manageState";
import { getAllProducts } from "../redux/features/productSlice";
import RecentlyAddedCard from "./common/RecentlyAddedCard";

const RecentlyAdded = () => {
  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllProducts());
    }
  }, [status, dispatch]);

  return (
    <div className="py-10">
      <div>
        <h1 className="text-2xl font-black py-8">Recently Added Post</h1>
        <div className="grid grid-cols-4 gap-4">
          {status === "loading" && <p>Loading...</p>}
          {status === "succeeded" &&
            products
              .slice(0, 4)
              .map((recent, idx) => (
                <RecentlyAddedCard
                  title={recent.title}
                  description={recent.description}
                  owner={recent.name}
                  image={recent.images[2]}
                  key={idx}
                />
              ))}
          {status === "failed" && <p>Error fetching products</p>}
        </div>
      </div>
    </div>
  );
};

export default RecentlyAdded;
