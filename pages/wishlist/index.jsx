import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import InfoCard from "../../components/InfoCard";
const Wishlist = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let local = JSON.parse(localStorage.getItem("wishlisted"));
    setData(local);
  }, []);

  return (
    <div className="h-screen">
      <Header />
      <div className="max-w-7xl mx-auto">
        {data && data.map((el) => <InfoCard item={el} key={el.id + 9090123} />)}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
