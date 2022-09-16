import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function search() {
  return (
    <div className="h-screen">
      <Header />
      <main className="flex">
        <section className="flex-grow pt-12 px-6">
          <p className="text-xs mt-3">300+ stays for 5 number of guests</p>
          <h1 className="text-3xl font-semibold mb-6 mt-2">
            Stays in New-York
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
