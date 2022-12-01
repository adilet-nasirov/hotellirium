import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import city_ids from "../lib/data-files/city_ids";
const SmallCard = ({ img, location, distance }) => {
  const axios = require("axios");
  const router = useRouter();
  const startDate = new Date();
  const endDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const handleClick = () => {
    const { id, location_name } = city_ids[location][0];
    router.push({
      pathname: "/search",
      query: {
        location: location_name,
        id: id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        nofGuests: "1",
      },
    });
  };
  return (
    <div
      key={location}
      onClick={handleClick}
      className="flex items-center mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out mr-4"
    >
      {/* Left */}
      <div className="relative h-16 w-16">
        <Image src={img} layout="fill" className="rounded-lg" />
      </div>
      {/* Right */}
      <div>
        <h2>{location}</h2>
        <h3 className="text-gray-500">{distance}</h3>
      </div>
    </div>
  );
};;;;
export default SmallCard;
