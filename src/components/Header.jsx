import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    const handleClick = () => {
        alert("Hello")
    };

    
  return (
    <header className="header">
      <div>
        <img src="" alt="logo" /> 
      </div>
      <div>
        <FaUserCircle size={24} onClick={handleClick} />
      </div>
    </header>
  );
};

export default Header;
