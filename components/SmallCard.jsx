import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
const SmallCard = ({ img, location, distance }) => {
  const axios = require("axios");
  const router = useRouter();
  const startDate = new Date();
  const endDate = new Date();
  const handleClick = () => {
    const options = {
      method: "GET",
      url: "https://airbnb19.p.rapidapi.com/api/v1/searchDestination",
      params: { query: location },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_HOST,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        let display_name = response.data.data[0].display_name;
        let id = response.data.data[0].id;
        router.push({
          pathname: "/search",
          query: {
            location: display_name,
            id: id,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            nofGuests: "1",
          },
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <div
      key={location}
      onClick={handleClick}
      className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out"
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
};
export default SmallCard;
