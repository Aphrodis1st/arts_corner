import RecentlyAdded from "../components/RecentlyAddedComponent";

/* eslint-disable react/no-unescaped-entities */
const HomePage = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-[5%] py-20 bg-black text-white min-h-screen">
        <div className="w-1/2">
          <h1 className="text-4xl font-bold mb-6">Art's Corner</h1>
          <p className="text-lg mb-6">
            The ultimate platform for artists and art enthusiasts! This app will
            provide a dynamic space where artists can showcase their work to a
            global audience. By uploading their creations, artists can create a
            personalized portfolio that highlights their unique style and
            talent. Art lovers can browse through diverse galleries, discover
            inspiring pieces, and connect directly with the creators behind the
            artwork. Whether you’re an artist seeking to gain recognition or a
            collector looking to discover new talent, bridges the gap between
            creativity and appreciation, making it easy to engage and
            collaborate.
          </p>
          <button className="bg-gray-800 hover:bg-gray-700 px-10 py-3 rounded-full text-white">
            Explore
          </button>
        </div>

        <div className=" gap-4 b p-4">
          <img
            src="/art_home_image.png"
            alt="Trench"
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>
      <div className="bg-black text-white px-[5%] mx-auto">
        <RecentlyAdded />
      </div>
    </div>
  );
};

export default HomePage;
