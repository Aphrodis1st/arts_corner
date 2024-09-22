import { useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import ChangeRole from './common/CangeRole';

const workItems = [
  {
    id: 1,
    firstName: "GIgs", 
    lastName: 'Diet for my kin',
    email: 'Human diets are determined by...',
    role:"ARTIST"
  },
  {
    id: 2,
    firstName: "GIgs",
    lastName: 'Diet for my kin',
    email: 'Human diets are determined by...',
    role:"ARTIST"
  },
  {
    id: 3,
    firstName: "GIgs",
    lastName: 'Diet for my kin',
    email: 'Human diets are determined by...',
    role:"ARTIST"
  },
  {
    id: 4,
    firstName: "GIgs",
    lastName: 'Diet for my kin',
    email: 'Human diets are determined by...',
    role:"ARTIST"
  },
  {
    id: 5,
    firstName: "GIgs",
    lastName: 'Diet for my kin',
    email: 'Human diets are determined by...',
    role:"ARTIST"
  },
  {
    id: 6,
    firstName: "GIgs",
    lastName: 'Diet for my kin',
    email: 'Human diets are determined by...',
    role:"ARTIST"
  },
  {
    id: 7,
    firstName: "GIgs",
    lastName: 'Diet for my kin',
    email: 'Human diets are determined by...',
    role:"ARTIST"
  },
  {
    id: 8,
    firstName: "GIgs",
    lastName: 'Diet for my kin',
    email: 'Human diets are determined by...',
    role:"USER"
  },
];

const Users = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className="p-4 relative">
        <h2 className="text-white text-lg font-bold mb-4">Users</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-[#3c3c3c] text-white">
              <tr>
                <th scope="col" className="px-6 py-3">Nº</th>
                <th scope="col" className="px-6 py-3">First name</th>
                <th scope="col" className="px-6 py-3">Last name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Role</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {workItems.map((item, index) => (
                <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white text-black' : 'bg-[#3c3c3c] text-white'} border-b dark:border-gray-700`}>
                  <td className={`${index % 2 === 0 ? "text-black" : "text-white"} px-5`}>{String(index + 1).padStart(2, '0')}</td>
                  <td className="px-6">
                    {item.firstName}
                  </td>
                  <td className={`${index % 2 === 0 ? "text-black" : "text-white"} px-2 font-medium whitespace-nowrap`}>
                    {item.lastName}
                  </td>
                  <td className="px-6">{item.email}</td>
                  <td className="px-6">{item.role}</td>
                  <td className="px-6 flex items-center space-x-2 h-12 text-xl">
                    <button className="text-green-600" onClick={toggleModal}>
                      <FaPen />
                    </button>
                    <button className="text-red-600">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
              {modal && <ChangeRole toggleModal={toggleModal}/>}
    </>
  );
};

export default Users;
