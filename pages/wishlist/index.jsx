import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import InfoCard from "../../components/InfoCard";
import { Empty } from "antd";
const Wishlist = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let local = JSON.parse(localStorage.getItem("wishlisted"));
    setData(local);
  }, []);

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto">
        {data?.length ? (
          data.map((el) => <InfoCard item={el} key={el.id + 9090123} />)
        ) : (
          <div className="h-96 my-40">
            <Empty description={false} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
