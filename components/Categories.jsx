import React, { useEffect, useState } from "react";
import getCategories from "../lib/data-files/categ";
import Image from "next/image";
const Categories = () => {
  const [categs, setCategs] = useState([]);
  useEffect(() => {
    const data = getCategories();
    setCategs(data);
  }, []);
  return (
    <div className="max-w-7xl mx-auto h-12 flex flex-nowrap mb-5 space-x-7 text-gray-800 whitespace-nowrap overflow-scroll scrollbar-hide box-border	">
      {categs &&
        categs.map((category) => {
          return (
            <div
              key={category.id}
              className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out flex flex-col items-center hover:text-black hover:border-b-4 border-rose-500 box-border"
            >
              <div className="relative h-6 w-6 ">
                <Image src={category.image} layout="fill" />
              </div>
              <p className="text-sm text-gray-400 hover:text-black">
                {category.title}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default Categories;
