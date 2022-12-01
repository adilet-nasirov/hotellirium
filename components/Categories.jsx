import React from "react";
import Image from "next/image";
const CategoryCard = ({ id, img, title }) => {
  console.log(id + "this is id");
  console.log(img + "this is img");
  console.log(title + "this is title");

  return (
    <div
      key={id}
      className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out "
    >
      <div className="h-10 w-10">
        <Image className="rounded-full" src={img} layout="fill" />
      </div>
      <p className="text-sm">{title}deee</p>
    </div>
  );
};

export default CategoryCard;
