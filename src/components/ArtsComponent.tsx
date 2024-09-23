import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/manageState";
import { getAllProducts } from "../../src/redux/features/productSlice";
import { Link } from "react-router-dom";

const ArtsComponent = () => {
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="text-white flex flex-col gap-4 py-6">
        <h1 className="text-4xl font-bold">The Artist&apos;s Corner</h1>
        <p className="text-xl my-4">
          Explore a curated gallery showcasing diverse artistic expressions,
          from vibrant paintings to captivating sculptures. Each piece tells a
          unique story, reflecting the artist&apos;s vision and creativity.
          Whether you&apos;re drawn to abstract art, contemporary styles, or
          classic influences, our collection offers something for every taste.
          Immerse yourself in a visual journey where color, form, and emotion
          collide, inspiring both art enthusiasts and casual visitors alike.
          Discover new talents and connect with the art that resonates with you.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-10">
        {products.map((product, idx) => (
          <Link
            to={`/gallery/${product.id}`}
            key={idx}
            className="h-full w-full"
          >
            <div className="w-full h-full">
              <img
                src={product.images[0]}
                alt={`art_image_${idx}`}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtsComponent;
