const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center flex items-center justify-center">
      <p className="text-sm py-5">
        &copy; {new Date().getFullYear()} Art&apos;s corner. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
