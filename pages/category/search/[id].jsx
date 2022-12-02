import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DataContext } from "../../../lib/DataContext";
import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as LikedIcon } from "@heroicons/react/solid";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { FaConciergeBell, FaParking, FaStar, FaWifi } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { GiDesk } from "react-icons/gi";
import { IoMdHeartEmpty, IoMdSnow } from "react-icons/io";
import { CgGym } from "react-icons/cg";
import { UsersIcon } from "@heroicons/react/solid";
import ImageGallery from "react-image-gallery";
import { loadStripe } from "@stripe/stripe-js";
import {
  MdLocalLaundryService,
  MdOutlineLocalConvenienceStore,
  MdOutlineSmokeFree,
  MdPets,
} from "react-icons/md";
import ResponsiveDatePickers from "../../../components/ResponsiveDatePickers";

const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const [state, dispatch] = useContext(DataContext);
  const { days, guests } = state;
  const [nofGuests, setNofGuests] = useState(guests);
  const [loading, setLoading] = useState(false);
  const axios = require("axios");
  const [item, setItem] = useState({});
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (!router.isReady) return;
    const options = {
      method: "GET",
      url: "https://airbnb19.p.rapidapi.com/api/v1/getPropertyDetails",
      params: { propertyId: id, currency: "USD" },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_HOST,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setItem(response.data.data);
        let arr = [];
        for (let image of response.data.data.images) {
          arr.push({ original: image, thumbnail: image });
        }
        setImages(arr);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [router.isReady]);

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);
  const createCheckoutSession = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/create-stripe-session", {
      item: item,
      days: days,
      guests: guests,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
    setLoading(false);
  };
  function checkIfInLocal() {
    let localData = JSON.parse(localStorage.getItem("wishlisted"));

    if (!localData || localData.length === 0) return false;
    for (let loc of localData) {
      if (loc.title === item.title) return true;
    }
    return false;
  }
  const addToWishlist = () => {
    const dataFromStorage = JSON.parse(localStorage.getItem("wishlisted"));
    setIsWishlisted(!isWishlisted);
    if (!dataFromStorage) {
      localStorage.setItem("wishlisted", JSON.stringify([item]));
    } else {
      let isAlreadyInWishlist = false;
      for (let loc of dataFromStorage) {
        if (loc.title === item.title) isAlreadyInWishlist = true;
      }
      if (isAlreadyInWishlist) {
        if (dataFromStorage.length === 1) {
          localStorage.removeItem("wishlisted");

          return;
        }
        let newdataFromStorage = dataFromStorage.filter((el) => el.id !== id);
        localStorage.setItem(
          "wishlisted",
          JSON.stringify([...newdataFromStorage])
        );
      } else {
        localStorage.setItem(
          "wishlisted",
          JSON.stringify([...dataFromStorage, item])
        );
      }
    }
  };

  return (
    <div>
      <Header />
      {/* information about the hotel */}
      <section className="max-w-7xl mx-auto my-9">
        {item ? (
          <>
            <h2 className="text-3xl px-4 my-5">{item.title}</h2>
            <div className="flex justify-between">
              <div className=" basis-1/2 hidden md:flex">
                {item.valueRating && (
                  <h3
                    className="flex items-center mx-3 hover:text-rose-500 cursor-pointer text-xl
              "
                  >
                    <FaStar size={20} className="mx-1 text-rose-500" />
                    {item.valueRating}
                  </h3>
                )}
                <p className="underline mx-4 cursor-pointer text-xl">
                  {item.reviewsCount} reviews
                </p>
                <p className="underline mx-5 cursor-pointer text-xl">
                  {item.location}
                </p>
              </div>
              <div className="flex flex-grow-1 ">
                <p className="flex items-center underline mx-4 cursor-pointer text-xl hover:text-rose-500 hover:scale-105 transition transform duration-200 ease-out">
                  <FiShare className="mx-2" />
                  share
                </p>
                <p
                  onClick={() => addToWishlist(item.title)}
                  className="flex items-center underline mx-4 cursor-pointer text-xl hover:text-rose-500 hover:scale-105 transition transform duration-200 ease-out
                  "
                >
                  {/* <IoMdHeartEmpty className="mx-2 hover:text-rose-500" /> */}
                  {isWishlisted ? (
                    <LikedIcon className="h-7 cursor-pointer text-red-500 " />
                  ) : (
                    <HeartIcon className="h-7 cursor-pointer " />
                  )}
                  save
                </p>
              </div>
            </div>
            <div className="mx-auto my-12 md:w-full max-h-full box-border lg:h-screen">
              <ImageGallery
                lazyLoad={true}
                showBullets={false}
                autoPlay={true}
                items={images}
                showThumbnails={false}
                slideDuration={700}
              />
            </div>
            <div className="flex flex-col justify-between mx-auto my-16 md:flex-row md:justify-between">
              <aside className="flex flex-col">
                <h1 className="text-2xl font-bold m-5"> Property highlights</h1>
                <div className="flex-grow-1/2 grid grid-cols-2 m-3 gap-5 gap-x-5 content-end md:gap-x-32 md:gap-9">
                  <p className="flex items-center text-xl ">
                    <FaWifi className="mx-3" />
                    Free WiFi
                  </p>
                  <p className="flex items-center text-xl ">
                    <MdLocalLaundryService className="mx-3" />
                    Laundry facilities
                  </p>
                  <p className="flex items-center text-xl ">
                    <IoMdSnow className="mx-3" />
                    Air conditioning
                  </p>
                  <p className="flex items-center text-xl ">
                    <MdPets className="mx-3" />
                    Pet friendly
                  </p>
                  <p className="flex items-center text-xl ">
                    <MdOutlineSmokeFree className="mx-3" />
                    Non-smoking
                  </p>
                  <p className="flex items-center text-xl ">
                    <MdOutlineLocalConvenienceStore className="mx-3" />
                    24/7 front desk
                  </p>
                  <p className="flex items-center text-xl ">
                    <FaParking className="mx-3" />
                    Free parking
                  </p>
                  <p className="flex items-center text-xl ">
                    <CgGym className="mx-3" />
                    GYM
                  </p>
                  <p className="flex items-center text-xl">
                    <FaConciergeBell className="mx-3" />
                    Concierge services
                  </p>
                  <p className="flex items-center text-xl">
                    <GiDesk className="mx-3 text-2xl" />
                    Dedicated workspace
                  </p>
                </div>
              </aside>
              <aside className="shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] p-7 rounded-xl w-96 mt-5 mx-auto md:mx-0">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">
                    {item.price?.price.total.amountFormatted}
                    <span className="text-md font-light"> night</span>
                  </h1>
                  <div className="flex justify-end">
                    <h3
                      className="flex items-center mx-3 cursor-pointer text-xl
                  "
                    >
                      {item.valueRating && (
                        <FaStar size={20} className="mx-1  text-rose-500" />
                      )}
                      {item.valueRating}
                      <span className="underline mx-4 cursor-pointer text-xl">
                        {item.reviewsCount} reviews
                      </span>
                    </h3>
                  </div>
                </div>
                <div className="mt-5">
                  <ResponsiveDatePickers />
                </div>
                <div className="flex items-center my-4">
                  <h2 className="text-xl flex-grow pl-2">Guests</h2>
                  <UsersIcon className="h-7" />
                  <input
                    value={nofGuests}
                    onChange={(e) => {
                      dispatch({
                        type: "change_guests",
                        guests: e.target.value,
                      });
                      setNofGuests(e.target.value);
                    }}
                    type="number"
                    min={1}
                    className="w-12 pl-2 text-lg font-semibold outline-none text-rose-500"
                  />
                </div>
                <div className="my-5">
                  <button
                    onClick={createCheckoutSession}
                    className="bg-rose-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded w-full"
                  >
                    Reserve
                  </button>
                </div>
                <div className="flex justify-between">
                  <p className="underline">
                    {item.price?.price.total.amountFormatted} x {days} nights
                  </p>
                  <p>${item.price?.price.total.amount * days}</p>
                </div>
                <div className="flex justify-between">
                  <p className="underline">Cleaning fee</p>
                  <p>$30</p>
                </div>
                <div className="flex justify-between">
                  <p className="underline">Service fee</p>
                  <p>$12</p>
                </div>
              </aside>
            </div>
          </>
        ) : (
          <></>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Details;
