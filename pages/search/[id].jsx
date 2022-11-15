import React, { useContext } from "react";
import { useRouter } from "next/router";
import { DataContext } from "../../lib/DataContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaStar } from "react-icons/fa";
import { FaBeer } from "react-icons/fa";
const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const [state, dispatch] = useContext(DataContext);
  const { data } = state;
  console.log(data);
  const filtered = data.filter((el) => el.id === id);
  const item = filtered[0];
  console.log(filtered);
  return (
    <div>
      <Header />
      {/* information about the hotel */}
      <section className="2xl:container mx-auto">
        <h2 className="text-3xl">{item.listingName}</h2>
        <div className="flex justify-between">
          <div className="flex basis-1/2">
            <p className="">
              <FaStar />
              {item.starRating}
            </p>
            <p className="underline">{item.reviewsCount}reviews</p>
            <p className="underline">{item.publicAddress}</p>
          </div>
          <div className="flex flex-grow-1">
            <p>share</p>
            <p>save</p>
          </div>
        </div>
        <h3>
          {" "}
          Lets go for a <FaBeer />?{" "}
        </h3>
      </section>

      <Footer />
    </div>
  );
};

export default Details;
