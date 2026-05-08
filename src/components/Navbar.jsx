import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-end gap-10 p-5 font-bold border-b border-black bg-[#EAEAEA]">
      <Link to="/" className="hover:text-orange-500 transition">
        Home
      </Link>
      <Link to="/owner" className="hover:text-orange-500 transition">
        Owner
      </Link>
    </nav>
  );
};

export default Navbar;
