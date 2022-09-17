import  format  from "date-fns/format";
import { useRouter } from "next/router";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import moment from "moment/moment";
function search() {
  const router = useRouter();
  const { endDate, location, nofGuests, startDate } = router.query;
  console.log(moment(startDate).utc().format('DD MMMM YY'));
//   console.log(format(new Date(startDate), 'dd mm yy'))
  const formattedStartDate = moment(startDate).utc().format('DD MMMM YY')
  const formattedEndDate = moment(endDate).utc().format('DD MMMM YY')
  const range = `- ${formattedStartDate} - ${formattedEndDate} - `;

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
