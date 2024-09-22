import { useForm } from 'react-hook-form';

type FormData = {
  role: string;
};

interface ChangeRoleProps {
  toggleModal: () => void;
}

const ChangeRole = ({ toggleModal }: ChangeRoleProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      role: 'Artist'
    }
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className='fixed inset-0 w-full h-full bg-black/20 flex items-center justify-center p-10 rounded-lg overflow-hidden'>
      <div className='absolute -z-10 backdrop-blur-sm w-full h-full inset-0' onClick={() => toggleModal()}></div>
      <div className="bg-black text-white flex justify-center items-center w-1/2 shadow-2xl">
        <form
          className="bg-[#1e1e1e] p-6 rounded-lg w-full px-24 py-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-xl mb-4">Change Role</h2>

          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="role">
              Role
            </label>
            <input
              id="role"
              type="text"
              className="w-full p-2 rounded-md bg-gray-200 text-black"
              placeholder="title of Art"
              {...register('role', { required: 'Role is required' })}
            />
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-gray-400 text-black px-4 py-2 rounded-md w-full"
          >
            Change role
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeRole;
