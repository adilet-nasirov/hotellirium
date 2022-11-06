import React from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
function handleClick(id) {
  console.log(id);
}
function addToLiked(id) {
  console.log(id, "===> it is wishlisted");
}
const InfoCard = ({ item, days }) => {
  const {
    bedrooms,
    title,
    beds,
    bathrooms,
    id,
    price,
    discountedPrice,
    originalPrice,
    images,
    listingName,
    listingPreviewAmenityNames,
    listingGuestLabel,
    listingBathroomLabel,
    avgRating,
    listingBedLabel,
  } = item;
  return (
    <div className="flex py-7 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg shadow-indigo-500/50  transition duration-200 ease-out first:border-t">
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
        <Image
          src={images[0]}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p>{title}</p>
          <HeartIcon
            onClick={() => addToLiked(id)}
            className="h-7 cursor-pointer"
          />
        </div>
        <h4 onClick={() => handleClick(id)} className="text-xl">
          {listingName}
        </h4>
        <div className="border-b w-10 pt-2" />
        <p className="pt-2 text-sm text-gray-500 flex-grow">{`${listingGuestLabel}• ${bedrooms} bedroom • ${listingBedLabel} • ${listingBathroomLabel} • ${listingPreviewAmenityNames.join(
          "•"
        )} `}</p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-500" />
            {avgRating}
          </p>

          <div>
            <p className="text-lg font-semibold pb-2 lg:text-2xl">
              {price ? (
                price
              ) : (
                <span>
                  <del>{originalPrice}</del> {discountedPrice}
                </span>
              )}{" "}
              / night
            </p>
            <p>
              $
              {price
                ? Number(price.slice(1, price.length)) * days
                : days *
                  Number(discountedPrice.slice(1, discountedPrice.length))}{" "}
              total
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
