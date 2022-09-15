import React, { useState } from "react";
import Image from "next/image";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-3 md:px-10 ">
      {/* Left div */}
      <div className="relative flex items-center h-10 cursor-pointer my-auto">
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      {/* Middle one */}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-5 bg-transparent outline-none flex-grow text-gray-600 placeholder-gray-400"
          type="text"
          placeholder="Start your search"
        />
        <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md: mx-2 " />
      </div>
      {/* Right div */}
      <div className="flex  space-x-4 items-center justify-end text-gray-500">
        <p className="cursor-pointer hidden md:inline">Become a host</p>
        <GlobeAltIcon className="h-6 " />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>
      {searchInput && <div></div>}
    </header>
  );
};

export default Header;
