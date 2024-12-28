import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-black px-4 py-2 flex justify-between items-center">
      {/* Logo */}
      <div className="text-white text-lg font-bold">MyLogo</div>
      
      {/* Nav Items */}
      <div className="flex space-x-4">
        {["Home", "About", "Services", "Contact"].map((item, index) => (
          <a
            key={index}
            href={`#${item.toLowerCase()}`}
            className="text-white bg-gray-800 px-4 py-2 rounded-full relative group"
          >
            {/* Border Shine Effect */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300"></span>
            <span className="relative z-10">{item}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
