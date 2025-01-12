/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useForm } from "react-hook-form";
import { createProduct } from "../../../../redux/features/productSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hooks/manageState";
import { useEffect } from "react";
import { fetchCategories } from "../../../../redux/features/categorySlice";

type FormData = {
  title: string;
  name: string;
  description: string;
  images: FileList;
  artistId: string;
  categoryId: string;
};

interface AddWorkProps {
  toggleModal: () => void;
}

const AddWork = ({ toggleModal }: AddWorkProps) => {
  const dispatch = useAppDispatch();
  const { categories, status } = useAppSelector((state) => state.category);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  console.log(categories);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);

    Array.from(data.images).forEach((image) => {
      formData.append("images", image);
    });

    dispatch(createProduct(formData));
    toggleModal();
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black/20 flex items-center justify-center p-10">
      <div
        className="absolute -z-10 backdrop-blur-sm w-full h-full inset-0"
        onClick={() => toggleModal()}
      ></div>
      <div className="bg-black text-white flex justify-center items-center w-1/2 shadow-2xl">
        <form
          className="bg-[#1e1e1e] p-6 rounded-lg w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-xl mb-4">Add New Work</h2>

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
            a
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
                {...register("images", {
                  required: "At least one image is required",
                })}
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
            Add Work
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWork;
