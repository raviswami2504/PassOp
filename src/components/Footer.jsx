import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between px-10 py-4 bg-slate-800 shadow-md text-white">
      
      <div className="logo font-bold  text-2xl text-white">
        <span className="text-green-700">&lt;</span>
        Pass
        <span className="text-green-700">OP/&gt;</span>
      </div>

      
      <div className="flex items-center space-x-2 text-white font-medium">
        <span>Created with</span>
        <img
          src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
          alt="Love"
          width="20"
          height="20"
          className="inline-block"
        />
        <span>by Ravi Swami</span>
      </div>
    </footer>
  );
};

export default Footer;
