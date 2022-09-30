import  format  from "date-fns/format";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import moment from "moment/moment";
import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://airbnb19.p.rapidapi.com/api/v1/searchProperty',
  params: {category: 'TAB_8225', totalRecords: '9', currency: 'USD', adults: '1'},
  headers: {
    'X-RapidAPI-Key': '9bbfb27703msh3a774eb1fd60944p16626fjsn37ae8f0e05c5',
    'X-RapidAPI-Host': 'airbnb19.p.rapidapi.com'
  }
};

function search() {
  const router = useRouter();
  const { endDate, location, nofGuests, startDate } = router.query;
  const formattedStartDate = moment(startDate).utc().format('DD MMMM YY')
  const formattedEndDate = moment(endDate).utc().format('DD MMMM YY')
  const range = `- ${formattedStartDate} - ${formattedEndDate} - `;
  const [data, setData] = useState([]);
  useEffect(()=>{
    axios.request(options).then(function (response) {
      console.log(response.data);
      setData(response.data)
    }).catch(function (error) {
      console.error(error);
    });
  },[])

  return (
    <div className="h-screen">
      <Header placeholder={`${location} | ${range} | ${nofGuests}`}/>
      <main className="flex">
        <section className="flex-grow pt-12 px-6">
          <p className="text-xs mt-3">300+ stays {range}for {nofGuests} guests</p>
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
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default search;
