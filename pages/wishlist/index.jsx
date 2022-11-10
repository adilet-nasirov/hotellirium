import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import InfoCard from "../../components/InfoCard";
const Wishlist = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("wishlisted"));
    setData(localData);
  }, []);

  return (
    <div className="h-screen flex flex-col max-w-screen-2xl mx-auto">
      <Header />
      <div>{data && data.map((el) => <InfoCard item={el} />)}</div>

      <Footer />
    </div>
  );
};

export default Wishlist;
