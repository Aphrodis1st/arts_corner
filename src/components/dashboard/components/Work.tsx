import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPen, FaTrash } from "react-icons/fa";
import AddWork from "./common/AddWork";
import { arts_image } from "../../../assets/images";
import {
  getAllProducts,
  deleteProduct,
} from "../../../redux/features/productSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import HashLoader from "react-spinners/HashLoader";
import { Link } from "react-router-dom";

const Work = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status } = useSelector(
    (state: RootState) => state.products,
  );
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const confirmDelete = (productId: string) => {
    setProductToDelete(productId);
    setDeleteModal(true);
  };

  const cancelDelete = () => {
    setProductToDelete(null);
    setDeleteModal(false);
  };

  const handleDelete = async () => {
    if (productToDelete) {
      setIsDeleting(true);
      await dispatch(deleteProduct(productToDelete));
      setIsDeleting(false);
      cancelDelete();
    }
  };

  return (
    <>
      <div className="p-4 relative">
        <h2 className="text-white text-lg font-bold mb-4">My Work</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-[#3c3c3c] text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nº
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {status === "loading" && (
                <div className="w-[100vw]">
                  <div className="text-center py-4 w-full h-[70vh] flex items-center justify-center">
                    <HashLoader size={50} color={"#36d7b7"} />
                  </div>
                </div>
              )}
              {status === "failed" && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-red-500">
                    Failed to load products.
                  </td>
                </tr>
              )}
              {status === "succeeded" &&
                products.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0
                        ? "bg-white text-black"
                        : "bg-[#3c3c3c] text-white"
                    } border-b dark:border-gray-700`}
                  >
                    <td
                      className={`${index % 2 === 0 ? " text-black" : "text-white"} px-5`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="px-2">
                      <img
                        src={item.images[2] || arts_image}
                        alt={item.title}
                        className="w-12 h-12 object-cover"
                      />
                    </td>
                    <td
                      className={`${index % 2 === 0 ? "text-black" : "text-white"} px-2 font-medium whitespace-nowrap`}
                    >
                      {item.title}
                    </td>
                    <td className="px-2">{item.description}</td>
                    <td className="px-6 flex items-center space-x-2 h-12 text-xl">
                      <Link to={`/dashboard/work/${item.id}`} state={item}>
                        <button className="text-green-600">
                          <FaPen />
                        </button>
                      </Link>
                      <button
                        className="text-red-600"
                        onClick={() => confirmDelete(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <button
          className="mt-4 text-blue-700 flex items-center space-x-1 bg-blue-100 py-2 px-4 rounded-lg hover:bg-blue-200 absolute -top-5 right-4"
          onClick={() => toggleModal()}
        >
          <span className="text-xl">+</span> <span>Add</span>
        </button>
      </div>

      {modal && <AddWork toggleModal={toggleModal} />}

      {deleteModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-4 rounded shadow-lg">
            <h3 className="text-lg font-bold">Confirm Delete</h3>
            <p>Are you sure you want to delete this product?</p>
            {isDeleting ? (
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-4"
                  onClick={handleDelete}
                >
                  <HashLoader size={20} color={"#36d7b7"} />
                  Delete
                </button>
                <button
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Work;
