import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../../src/redux/features/singleProductSlice";
import { single_image } from "../assets/images"; // Fallback image
import { useAppDispatch, useAppSelector } from "../redux/hooks/manageState";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const SingleArtsPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { singleProduct, status, error } = useAppSelector(
    (state) => state.singleProduct,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!singleProduct) {
    return <div>No product found.</div>;
  }

  return (
    <div className="bg-black text-white px-[5%] mx-auto py-10 min-h-screen mt-14">
      <div className="flex flex-col px-[20%] mx-auto">
        <h1 className="text-4xl font-black">{singleProduct.title}</h1>
        <p className="text-2xl">{singleProduct.description}</p>
        <div className="w-full mt-4">
          <Carousel
            responsive={{
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 1,
                partialVisibilityGutter: 40,
              },
              mobile: {
                breakpoint: { max: 1024, min: 0 },
                items: 1,
                partialVisibilityGutter: 30,
              },
            }}
            itemClass="carousel-item-padding-40-px"
          >
            {singleProduct.images.map((image, index) => (
              <div key={index} className="h-[70vh] w-full">
                <img
                  src={image || single_image}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default SingleArtsPage;
