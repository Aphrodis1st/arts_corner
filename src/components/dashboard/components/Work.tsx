import { FaPen, FaTrash } from 'react-icons/fa';
import { arts_image } from '../../../assets/images';
import { useState } from 'react';
import AddWork from './common/AddWork';

const workItems = [
  {
    id: 1,
    image: arts_image, 
    title: 'Diet for my kin',
    description: 'Human diets are determined by...',
  },
  {
    id: 2,
    image: arts_image,
    title: 'Diet for my kin',
    description: 'Human diets are determined by...',
  },
  {
    id: 3,
    image: arts_image,
    title: 'Diet for my kin',
    description: 'Human diets are determined by...',
  },
  {
    id: 4,
    image: arts_image,
    title: 'Diet for my kin',
    description: 'Human diets are determined by...',
  },
  {
    id: 5,
    image: arts_image,
    title: 'Diet for my kin',
    description: 'Human diets are determined by...',
  },
  {
    id: 6,
    image: arts_image,
    title: 'Diet for my kin',
    description: 'Human diets are determined by...',
  },
  {
    id: 7,
    image: arts_image,
    title: 'Diet for my kin',
    description: 'Human diets are determined by...',
  },
  {
    id: 8,
    image: arts_image,
    title: 'Diet for my kin',
    description: 'Human diets are determined by...',
  },
];


const Work = () => {
    const [modal, setModal] = useState(false)
    const toggleModal = ()=>{
        setModal(!modal)
    }
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
            {workItems.map((item, index) => (
              <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white text-black' : 'bg-[#3c3c3c] text-white'} border-b dark:border-gray-700`}>
                <td className={`${index % 2 === 0 ? " text-black" : "text-white"} px-5 `}>{String(index + 1).padStart(2, '0')}</td>
                <td className="px-2">
                  <img src={item.image} alt={item.title} className="w-12 h-12 object-cover" />
                </td>
                <td className={`${index % 2 === 0 ? "text-black" : "text-white"} px-2 font-medium whitespace-nowrap `}>
                  {item.title}
                </td>
                <td className="px-2">{item.description}</td>
                <td className="px-6 flex items-center space-x-2 h-12 text-xl">
                  <button className="text-green-600">
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
        <button className="mt-4 text-blue-700 flex items-center space-x-1 bg-blue-100 py-2 px-4 rounded-lg hover:bg-blue-200 absolute -top-5 right-4" onClick={()=> toggleModal()}>
          <span className="text-xl">+</span> <span>Add</span>
        </button>
    </div>

    {modal && <AddWork toggleModal={toggleModal}/>}
    </>
  );
};

export default Work;
