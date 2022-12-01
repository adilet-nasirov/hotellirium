import React, { useState } from "react";
import Image from "next/image";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import BasicPopover from "./Popover";
import { SearchIcon, GlobeAltIcon, UsersIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Categories from "./Categories";
import { Alert, AlertTitle } from "@mui/material";
const Header = ({ placeholder }) => {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [nofGuests, setNofGuests] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const axios = require("axios");
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "Selection",
  };
  const handleSelect = (ranges) => {
    setStartDate(ranges.Selection.startDate);
    setEndDate(ranges.Selection.endDate);
  };
  const resetInput = () => {
    setSearchInput("");
  };

  const handleSearch = () => {
    const options = {
      method: "GET",
      url: "https://airbnb19.p.rapidapi.com/api/v1/searchDestination",
      params: { query: searchInput },
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
            nofGuests: nofGuests.toString(),
          },
        });
        resetInput();
      })
      .catch(function (error) {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      });
  };
  return (
    <div className="box-border z-20">
      <header className="sticky top-0 z-50  bg-white shadow-md p-3 md:px-10">
        <div className="grid grid-cols-3 max-w-7xl mx-auto">
          {/* Left div */}
          <div
            onClick={() => router.push("/")}
            className="relative flex items-center h-10 cursor-pointer my-auto"
          >
            <Image
              src="https://links.papareact.com/qd3"
              layout="fill"
              objectFit="contain"
              objectPosition="left"
              key={"kj12341213123145784319asf"}
            />
          </div>
          {/* Middle one */}
          <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-5 bg-transparent outline-none flex-grow text-gray-600 placeholder-gray-400"
              type="text"
              placeholder={placeholder?.toUpperCase() || "Start your search"}
            />
            <SearchIcon
              onClick={handleSearch}
              className="hidden md:inline-flex h-8 bg-rose-500 text-white rounded-full p-2 cursor-pointer md: mx-2 "
            />
          </div>
          {/* Right div */}
          <div className="flex  space-x-4 items-center justify-end text-gray-500">
            <p className="cursor-pointer hidden md:inline">Become a host</p>
            <GlobeAltIcon className="h-6 " />
            {/* <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div> */}
            <BasicPopover />
          </div>
          {/* error message */}
          <div>
            {errorMessage && (
              <Alert
                variant="filled"
                severity="warning"
                className="absolute object-center z-10 top-2 right-96 mx-12"
              >
                <AlertTitle>
                  Input doesn&apos;t match to any location
                </AlertTitle>
              </Alert>
            )}
          </div>
          <section>
            {searchInput && (
              <div className="flex flex-col col-span-3 mx-auto">
                <DateRangePicker
                  ranges={[selectionRange]}
                  minDate={new Date()}
                  rangeColors={["#FD5B61"]}
                  onChange={handleSelect}
                />
                <div className="flex items-center border-b mb-4">
                  <h2 className="text-2xl flex-grow font-semibold">
                    Number of guests
                  </h2>
                  <UsersIcon className="h-8" />
                  <input
                    value={nofGuests}
                    onChange={(e) => setNofGuests(e.target.value)}
                    type="number"
                    min={1}
                    className="w-12 pl-2 text-lg outline-none  text-rose-500"
                  />
                </div>
                <div className="flex">
                  <button
                    onClick={resetInput}
                    className="flex-grow text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSearch}
                    className="flex-grow text-rose-500"
                  >
                    Search
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </header>
      <div className="w-screen pt-5 box-border">
        <Categories />
      </div>
    </div>
  );
};

export default Header;
