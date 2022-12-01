import React from "react";
import Image from "next/image";
import city_names from "../lib/data-files/cities";
import { useRouter } from "next/router";
const Banner = () => {
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
    <div className=" max-w-7xl mx-auto px-8 relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
      <Image
        src="https://links.papareact.com/0fm"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute top-1/2 w-full text-center">
        <p className="text-sm sm:text-lg">Not sure where to go? Perfect.</p>
        <button
          onClick={handleFlexible}
          className="text-purple-500 bg-white px-10 py-4 rounded-full shadow-md font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150"
        >
          I&apos;m flexible
        </button>
      </div>
    </div>
  );
};

export default Banner;
