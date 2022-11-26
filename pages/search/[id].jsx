import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { DataContext } from "../../lib/DataContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaConciergeBell, FaParking, FaStar, FaWifi } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { GiDesk } from "react-icons/gi";
import { IoMdHeartEmpty, IoMdSnow } from "react-icons/io";
import { CgGym } from "react-icons/cg";
import { UsersIcon } from "@heroicons/react/solid";
import ImageGallery from "react-image-gallery";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import {
  MdLocalLaundryService,
  MdOutlineLocalConvenienceStore,
  MdOutlineSmokeFree,
  MdPets,
} from "react-icons/md";
import ResponsiveDatePickers from "../../components/ResponsiveDatePickers";

const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const [state, dispatch] = useContext(DataContext);
  const [nofGuests, setNofGuests] = useState(1);
  const { data } = state;
  const [loading, setLoading] = useState(false);
  console.log(data);
  const filtered = data.filter((el) => el.id === id);
  const item = filtered[0];
  const images = [];
  for (let image of item.images) {
    images.push({ original: image, thumbnail: image });
  }

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);
  const createCheckoutSession = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/create-stripe-session", {
      item: item,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
    setLoading(false);
  };
  return (
    <div>
      <Header />
      {/* information about the hotel */}
      <section className="max-w-7xl mx-auto my-9">
        <h2 className="text-3xl px-4 my-5">{item.listingName}</h2>
        <div className="flex justify-between">
          <div className="flex basis-1/2">
            {item.avgRating && (
              <h3
                className="flex items-center mx-3 cursor-pointer text-xl
              "
              >
                <FaStar size={20} className="mx-1 text-rose-500" />
                {item.avgRating}
              </h3>
            )}
            <p className="underline mx-4 cursor-pointer text-xl">
              {item.reviewsCount} reviews
            </p>
            <p className="underline mx-5 cursor-pointer text-xl">
              {item.publicAddress}
            </p>
          </div>
          <div className="flex flex-grow-1 ">
            <p className="flex items-center underline mx-4 cursor-pointer text-xl">
              <FiShare className="mx-2" />
              share
            </p>
            <p className="flex items-center underline mx-4 cursor-pointer text-xl">
              <IoMdHeartEmpty className="mx-2" />
              save
            </p>
          </div>
        </div>
        {/* image gallery */}
        <div className="mx-auto my-12">
          <ImageGallery items={images} />
        </div>
        <div className="flex justify-between mx-auto">
          <aside className="flex flex-col">
            <h1 className="text-2xl font-bold m-5"> Property highlights</h1>
            <div className="flex-grow-1/2 grid grid-cols-2 m-3 gap-7 gap-x-32 content-end">
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
          <aside className="shadow-[0px_20px_50px_-12px_rgba(0,0,0,0.27)] p-7 rounded-xl w-96">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">
                {item.price}
                <span className="text-md font-light"> night</span>
              </h1>
              <div>
                <h3
                  className="flex items-center mx-3 cursor-pointer text-xl
              "
                >
                  {item.avgRating && (
                    <FaStar size={20} className="mx-1  text-rose-500" />
                  )}
                  {item.avgRating}
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
                onChange={(e) => setNofGuests(e.target.value)}
                type="number"
                min={1}
                className="w-12 pl-2 text-lg font-semibold outline-none text-rose-500"
              />
            </div>
            <div className="my-5">
              <button
                onClick={createCheckoutSession}
                class="bg-rose-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded w-full"
              >
                Reserve
              </button>
            </div>
            {/* prices */}
            <div className="flex justify-between">
              <p className="underline"> {item.price} x nights</p>
              <p>$</p>
            </div>
            <div className="flex justify-between">
              <p className="underline">Cleaning fee</p>
              <p>$30</p>
            </div>
            <div className="flex justify-between">
              <p className="underline">Service fee</p>
              <p>$121</p>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Details;
