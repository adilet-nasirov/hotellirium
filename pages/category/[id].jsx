import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import InfoCard from "../../components/InfoCard";
import { DataContext } from "../../lib/DataContext";
import Footer from "../../components/Footer";
const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const [data, setData] = useState([]);
  const [state, dispatch] = useContext(DataContext);
  const { days, guests } = state;
  useEffect(() => {
    if (!router.isReady) return;
    const axios = require("axios");
    const options = {
      method: "GET",
      url: "https://airbnb19.p.rapidapi.com/api/v1/searchProperty",
      params: {
        category: id,
        totalRecords: "36",
        currency: "USD",
        adults: "1",
      },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_HOST,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setData(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [router.isReady, id]);
  return (
    <div>
      <Header />
      <main className={!data ? "h-screen " : ""}>
        <div className="max-w-7xl mx-auto">
          {data ? (
            data &&
            data?.map((item) => {
              return <InfoCard item={item} days={days} key={item.id} />;
            })
          ) : (
            <></>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
