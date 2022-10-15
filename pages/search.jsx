import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import moment from "moment/moment";
import axios from "axios";
import InfoCard from "../components/InfoCard";
import { DataContext } from "../lib/DataContext";

function search() {
  const [state, dispatch] = useContext(DataContext);
  const {data} = state;
  const router = useRouter();
  const { endDate, startDate,location, id, nofGuests } = router.query;
  const formattedStartDate = moment(startDate).utc().format("DD MMMM YY");
  const formattedEndDate = moment(endDate).utc().format("DD MMMM YY");
  const range = `- ${formattedStartDate} - ${formattedEndDate} - `;
  
  const days = Math.floor((Date.parse(endDate) - Date.parse(startDate)) / 86400000);
  useEffect(() => {
      if(!router.isReady) return;
      dispatch({type:'fetch_start'});
      const options = {
        method: 'GET',
        url: 'https://airbnb19.p.rapidapi.com/api/v1/searchPropertyByPlace',
        params: {
          id: id,
          display_name: location,
          totalRecords: '10',
          currency: 'USD',
          adults:nofGuests
        },
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
          "X-RapidAPI-Host": "airbnb19.p.rapidapi.com",
        },
      };
      setTimeout(() => {
        axios
        .request(options)
        .then(function (response) {
          console.log('API was called buddy')
          dispatch({type:'fetch_success',payload: response.data.data})
          // setData(response.data.data);
        })
        .catch(function (error) {
          console.error(error);
          dispatch({type:'api_call_error'})
        }); 
      }, 500);
  }, [router.isReady]);

  return (
    <div className="h-screen ">
      <Header placeholder={`${location} | ${range} | ${nofGuests}`} />
      <main className="flex">
        <section className="flex-grow pt-12 px-6">
          <p className="text-xs mt-3">
            300+ stays {range}for {nofGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mb-6 mt-2">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800  whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and beds</p>
            <p className="button">More filters...</p>
          </div>
          <div className="mx-auto">
            {data
              ? data.map(
                  (item) => (
                    <InfoCard
                      item={item}
                      days={days}
                    />
                  )
                )
              : ""}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default search;
