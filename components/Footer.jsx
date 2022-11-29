import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-gray-100 text-gray-600 ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 px-32 py-14 md:gap-16 max-w-8xl mx-auto ">
        <div className="flex justify-center">
          <div className="space-y-4 text-sm text-gray-800 md:text-md">
            <h5 className="font-bold">ABOUT</h5>
            <p>How Airbnb workss</p>
            <p>Newsroom</p>
            <p>Investors</p>
            <p>Airbnb Plus</p>
            <p>Airbnb Luxe</p>
          </div>
        </div>
        <div className=" flex justify-center">
          <div className="space-y-4 text-sm text-gray-800 md:text-md">
            <h5 className="font-bold">COMMUNITY</h5>
            <p>Accessibility</p>
            <p>This is not real site</p>
            <p>It is pretty awesome</p>
            <p>Referrals accepted</p>
            <p>Neighborhood</p>
          </div>
        </div>
        <div className=" flex justify-center">
          <div className="space-y-4 text-sm text-gray-800 md:text-md">
            <h5 className="font-bold">SUPPORT</h5>
            <p>Trust & Safety</p>
            <p>Help Center</p>
            <p>FAQ</p>
            <p>Call US!</p>
            <p>Easter Eggs</p>
          </div>
        </div>
        <div className=" flex justify-center">
          <div className="space-y-4 text-sm text-gray-800 md:text-md">
            <h5 className="font-bold">HOST</h5>
            <p>Next JS</p>
            <p>Presents</p>
            <p>Best React Framework</p>
            <p>Open-source</p>
            <p>By Vercel</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
