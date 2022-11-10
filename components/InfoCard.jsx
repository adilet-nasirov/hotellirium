import React from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as LikedIcon } from "@heroicons/react/solid";
import { StarIcon } from "@heroicons/react/solid";
import { useState } from "react";
function handleClick(id) {
  console.log(id);
}
function addToLiked(itemData, localData, setLiked) {
  const { id } = itemData;
  if (!localData) {
    localStorage.setItem("wishlisted", JSON.stringify([itemData]));
    setLiked([itemData]);
  } else {
    let isAlreadyInWishlist = checkIfInLocal(localData, id);
    if (isAlreadyInWishlist) {
      let newLocalData = localData.filter((el) => el.id !== id);
      localStorage.setItem("wishlisted", JSON.stringify([...newLocalData]));
      setLiked(newLocalData);
    } else {
      localStorage.setItem(
        "wishlisted",
        JSON.stringify([...localData, itemData])
      );
      setLiked([...localData, itemData]);
    }
  }
}
function checkIfInLocal(data, id) {
  for (let item of data) {
    if (item.id === id) return true;
  }
  return false;
}
const InfoCard = ({ item, days }) => {
  const {
    bedrooms,
    title,
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
  const localData = JSON.parse(localStorage.getItem("wishlisted"));
  const [liked, setLiked] = useState(localData);
  let isWishlisted = checkIfInLocal(liked, id);
  return (
    <div
      className="flex py-7 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg shadow-indigo-500/50  transition duration-200 ease-out first:border-t"
      key={id}
    >
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
          {isWishlisted ? (
            <LikedIcon
              onClick={() => addToLiked(item, localData, setLiked)}
              className="h-7 cursor-pointer text-red-500"
            />
          ) : (
            <HeartIcon
              onClick={() => addToLiked(item, localData, setLiked)}
              className="h-7 cursor-pointer"
            />
          )}
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
