import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import InfoCard from "./InfoCard";
const Wishlist = () => {
  const localData = JSON.parse(localStorage.getItem("wishlisted"));
  return (
    <div className="h-screen flex flex-col max-w-screen-2xl mx-auto">
      <Header />
      <div>{localData && localData.map((el) => <InfoCard item={item} />)}</div>
      <Footer />
    </div>
  );
};

export default Wishlist;
