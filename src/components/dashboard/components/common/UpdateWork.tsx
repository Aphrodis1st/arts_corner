/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateProduct } from "../../../../redux/features/productSlice";
import { fetchSingleProduct } from "../../../../redux/features/singleProductSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hooks/manageState";
import { fetchCategories } from "../../../../redux/features/categorySlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormData = {
  title: string;
  name: string;
  description: string;
  images: FileList | null;
  categoryId: string;
};

const UpdateWork = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { singleProduct, status: productStatus } = useAppSelector(
    (state) => state.singleProduct,
  );
  const { categories, status: categoryStatus } = useAppSelector(
    (state) => state.category,
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchCategories());
    }
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [categoryStatus, id, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    if (singleProduct) {
      reset({
        title: singleProduct.title,
        name: singleProduct.name,
        description: singleProduct.description,
        categoryId: singleProduct.categoryId,
        images: null,
      });
    }
  }, [singleProduct, reset]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);

    if (data.images) {
      Array.from(data.images).forEach((image) => {
        formData.append("images", image);
      });
    }

    try {
      if (!singleProduct) {
        throw new Error("Product not found");
      }

      await dispatch(
        updateProduct({ id: singleProduct.id, updatedProduct: formData }),
      ).unwrap();

      toast.success("Product updated successfully!");

      setTimeout(() => {
        navigate("/dashboard/work");
      }, 2000);
    } catch (error) {
      toast.error("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black/20 flex items-center justify-center p-10">
      <div className="absolute -z-10 backdrop-blur-sm w-full h-full inset-0"></div>
      <div className="bg-black text-white flex justify-center items-center w-1/2 shadow-2xl">
        <form
          className="bg-[#1e1e1e] p-6 rounded-lg w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-xl mb-4">Update Work</h2>

          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="title">
              Title:
            </label>
            <input
              id="title"
              type="text"
              className="w-full p-2 rounded-md bg-gray-200 text-black"
              placeholder="Title of Art"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="name">
              Name:
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 rounded-md bg-gray-200 text-black"
              placeholder="Name of Art"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="description">
              Description:
            </label>
            <textarea
              id="description"
              className="w-full p-2 rounded-md bg-gray-200 text-black h-32"
              placeholder="Enter the description..."
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="category">
              Category:
            </label>
            <select
              id="category"
              className="w-full p-2 rounded-md bg-gray-200 text-black"
              {...register("categoryId", { required: "Category is required" })}
            >
              <option value="">Select a category</option>
              {categories?.data?.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 text-sm">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="images">
              Images:
            </label>
            <div className="flex items-center space-x-2">
              <input
                id="images"
                type="file"
                className="w-full p-2 rounded-md bg-gray-200 text-black"
                multiple
                {...register("images")}
              />
            </div>
            {errors.images && (
              <p className="text-red-500 text-sm">{errors.images.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-gray-400 text-black px-4 py-2 rounded-md w-full"
          >
            Update Work
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateWork;
