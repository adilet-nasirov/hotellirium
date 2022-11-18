import React, { useContext } from "react";
import { useRouter } from "next/router";
import { DataContext } from "../../lib/DataContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaConciergeBell, FaParking, FaStar, FaWifi } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { IoMdHeartEmpty, IoMdSnow } from "react-icons/io";
import { CgGym } from "react-icons/cg";
import ImageGallery from "react-image-gallery";
import {
  MdLocalLaundryService,
  MdOutlineLocalConvenienceStore,
  MdOutlineSmokeFree,
  MdPets,
} from "react-icons/md";

const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const [state, dispatch] = useContext(DataContext);
  const { data } = state;
  console.log(data);
  const filtered = data.filter((el) => el.id === id);
  const item = filtered[0];
  const images = [];
  for (let image of item.images) {
    images.push({ original: image, thumbnail: image });
  }
  return (
    <div>
      <Header />
      {/* information about the hotel */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-3xl m-5">{item.listingName}</h2>
        <div className="flex justify-between">
          <div className="flex basis-1/2">
            {item.starRating && (
              <h3
                className="flex items-top mx-3 cursor-pointer text-xl
              "
              >
                <FaStar size={20} className="mx-1" />
                {item.starRating}
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
        <div className="my-12">
          <ImageGallery items={images} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold m-5"> Property highlights</h1>
          <div className=" flex-grow-1/2 grid grid-cols-3 m-3">
            <p className="flex items-center text-xl m-3">
              <FaWifi className="mx-3" />
              Free WiFi
            </p>
            <p className="flex items-center text-xl m-3">
              <MdLocalLaundryService className="mx-3" />
              Laundry facilities
            </p>
            <p className="flex items-center text-xl m-3">
              <IoMdSnow className="mx-3" />
              Air conditioning
            </p>
            <p className="flex items-center text-xl m-3">
              <MdPets className="mx-3" />
              Pet friendly
            </p>
            <p className="flex items-center text-xl m-3">
              <MdOutlineSmokeFree className="mx-3" />
              Non-smoking
            </p>
            <p className="flex items-center text-xl m-3">
              <MdOutlineLocalConvenienceStore className="mx-3" />
              24/7 front desk
            </p>
            <p className="flex items-center text-xl m-3">
              <FaParking className="mx-3" />
              Free parking
            </p>
            <p className="flex items-center text-xl m-3">
              <CgGym className="mx-3" />
              GYM
            </p>
            <p className="flex items-center text-xl m-3">
              <FaConciergeBell className="mx-3" />
              Concierge services
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Details;
