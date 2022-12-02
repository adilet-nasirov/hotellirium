import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 ">
      <div className="max-w-7xl mx-auto py-10">
        <div className="flex justify-between ">
          <div className="flex justify-center">
            <div className="space-y-4 text-sm text-gray-800 md:text-md">
              <h5 className="font-bold">SUPPORT</h5>
              <p className=" hover:underline cursor-pointer">Help center</p>
              <p className=" hover:underline cursor-pointer">HiCover</p>
              <p className=" hover:underline cursor-pointer">
                Supporting people with disabilities
              </p>
              <p className=" hover:underline cursor-pointer">
                Cancellation options
              </p>
              <p className=" hover:underline cursor-pointer">
                Our COVID-19 Response
              </p>
              <p className=" hover:underline cursor-pointer">
                Report a neighborhood concern
              </p>
            </div>
          </div>
          <div className=" flex justify-center">
            <div className="space-y-4 text-sm text-gray-800 md:text-md">
              <h5 className="font-bold">COMMUNITY</h5>
              <p className=" hover:underline cursor-pointer">Accessibility</p>
              <p className=" hover:underline cursor-pointer">
                Combating discrimination
              </p>
              <p className=" hover:underline cursor-pointer">
                Disaster relief housing
              </p>
              <p className=" hover:underline cursor-pointer">
                Referrals accepted
              </p>
              <p className=" hover:underline cursor-pointer">Neighborhood</p>
            </div>
          </div>
          <div className=" flex justify-center">
            <div className="space-y-4 text-sm text-gray-800 md:text-md">
              <h5 className="font-bold">POLICIES</h5>
              <p className=" hover:underline cursor-pointer">
                Terms & Conditions
              </p>
              <p className=" hover:underline cursor-pointer">Privacy</p>
              <p className=" hover:underline cursor-pointer">
                Do not sell my personal information
              </p>
              <p className=" hover:underline cursor-pointer">Cookies</p>
              <p className=" hover:underline cursor-pointer">About our ads</p>
            </div>
          </div>
          <div className=" flex justify-center">
            <div className="space-y-4 text-sm text-gray-800 md:text-md">
              <h5 className="font-bold">HOTELLIRIUM</h5>
              <p className=" hover:underline cursor-pointer">Newsroom</p>
              <p className=" hover:underline cursor-pointer">
                Learn about new features
              </p>
              <p className=" hover:underline cursor-pointer">
                Letter from our founders
              </p>
              <p className=" hover:underline cursor-pointer">Careers</p>
              <p className=" hover:underline cursor-pointer">Investors</p>
              <p className=" hover:underline cursor-pointer">Gift cards</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
