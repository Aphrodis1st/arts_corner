import { useForm } from 'react-hook-form';

type FormData = {
  title: string;
  name: string;
  description: string;
  image: FileList;
};

interface AddWorkProps{
    toggleModal: ()=> void
}

const AddWork = ({toggleModal}: AddWorkProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className='fixed inset-0 w-full h-full bg-black/20 flex items-center justify-center p-10'>
        <div className='absolute -z-10 backdrop-blur-sm w-full h-full inset-0' onClick={()=> toggleModal()}></div>
    <div className="bg-black text-white flex justify-center items-center w-1/2 shadow-2xl">
      <form 
        className="bg-[#1e1e1e] p-6 rounded-lg w-full" 
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-xl mb-4">Add New Work</h2>

        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="title">
            Title :
          </label>
          <input
            id="title"
            type="text"
            className="w-full p-2 rounded-md bg-gray-200 text-black"
            placeholder="title of Art"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="title">
            Title :
          </label>
          <input
            id="title"
            type="text"
            className="w-full p-2 rounded-md bg-gray-200 text-black"
            placeholder="name of Art"
            {...register('name', { required: 'Title is required' })}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="description">
            Description :
          </label>
          <textarea
            id="description"
            className="w-full p-2 rounded-md bg-gray-200 text-black h-32"
            placeholder="Enter the description..."
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="image">
            Image :
          </label>
          <div className="flex items-center space-x-2">
            <input
              id="image"
              type="file"
              className="w-full p-2 rounded-md bg-gray-200 text-black"
              {...register('image', { required: 'Image is required' })}
            />
          </div>
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>

        <button 
          type="submit" 
          className="bg-gray-400 text-black px-4 py-2 rounded-md w-full"
        >
          Add work
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddWork;
