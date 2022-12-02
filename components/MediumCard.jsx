import React from "react";
import { useRouter } from "next/router";
import city_names from "../lib/data-files/cities";
import Image from "next/image";
const MediumCard = ({ img, title }) => {
  const axios = require("axios");
  const router = useRouter();
  const startDate = new Date();
  const endDate = new Date();
  const handleFlexible = () => {
    const randomIdx = Math.floor(Math.random() * city_names.length);
    console.log(city_names[randomIdx]);
    const options = {
      method: "GET",
      url: "https://airbnb19.p.rapidapi.com/api/v1/searchDestination",
      params: { query: city_names[randomIdx] },
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
          pathname: "/medium",
          query: {
            location: display_name,
            type: title,
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
      onClick={handleFlexible}
      key={img}
      className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out "
    >
      <div className="relative h-80 w-80">
        <Image className="rounded-xl" src={img} layout="fill" />
      </div>
      <h3 className="text-2xl mt-3">{title}</h3>
    </div>
  );
};

export default MediumCard;
