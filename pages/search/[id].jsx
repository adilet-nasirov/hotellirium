import React, { useContext } from "react";
import { useRouter } from "next/router";
import { DataContext } from "../../lib/DataContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaStar } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import ImageGallery from "react-image-gallery";

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
                className="flex items-top mx-3 cursor-pointer
              "
              >
                <FaStar size={20} className="mx-1" />
                {item.starRating}
              </h3>
            )}
            <p className="underline mx-4 cursor-pointer">
              {item.reviewsCount} reviews
            </p>
            <p className="underline mx-5 cursor-pointer">
              {item.publicAddress}
            </p>
          </div>
          <div className="flex flex-grow-1 ">
            <p className="flex items-center underline mx-4 cursor-pointer">
              <FiShare className="mx-2" />
              share
            </p>
            <p className="flex items-center underline mx-4 cursor-pointer">
              <IoMdHeartEmpty className="mx-2" />
              save
            </p>
          </div>
        </div>
        {/* image gallery */}
        <div className="my-12">
          <ImageGallery items={images} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Details;
