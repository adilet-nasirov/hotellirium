import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import InfoCard from "../../components/InfoCard";
import { DataContext } from "../../lib/DataContext";
import Footer from "../../components/Footer";
import { InfinitySpin } from "react-loader-spinner";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [router.isReady, id]);
  return (
    <div>
      <Header />
      <main>
        <div className="max-w-7xl mx-auto">
          <div>
            {loading ? (
              <div className="h-screen flex justify-center items-center">
                <InfinitySpin width="300" color="#FF385C" />
              </div>
            ) : (
              data &&
              data?.map((item) => {
                return <InfoCard item={item} days={days} key={item.id} />;
              })
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
