import React, { useEffect } from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as LikedIcon } from "@heroicons/react/solid";
import { StarIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRouter } from "next/router";


const InfoCard = ({ item, days }) => {
  const router = useRouter();
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
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("wishlisted"));
    setData(localData);
  }, []);
  function checkIfInLocal(id) {
    let localData = [];
    if (typeof window !== "undefined") {
      localData = JSON.parse(localStorage.getItem("wishlisted"));
      // 👉️ can use localStorage here
    }
    if (!localData || localData.length === 0) return false;
    for (let item of localData) {
      if (item.id === id) return true;
    }
    return false;
  }
  function addToLiked(itemData) {
    const dataFromStorage = JSON.parse(localStorage.getItem("wishlisted"));
    const { id } = itemData;
    if (!dataFromStorage) {
      localStorage.setItem("wishlisted", JSON.stringify([itemData]));
      setData([itemData]);
    } else {
      let isAlreadyInWishlist = checkIfInLocal(id);
      if (isAlreadyInWishlist) {
        let newdataFromStorage = dataFromStorage.filter((el) => el.id !== id);
        localStorage.setItem(
          "wishlisted",
          JSON.stringify([...newdataFromStorage])
        );
        setData(newdataFromStorage);
      } else {
        localStorage.setItem(
          "wishlisted",
          JSON.stringify([...dataFromStorage, itemData])
        );
        setData([...dataFromStorage, itemData]);
      }
    }
  }
  let isWishlisted = checkIfInLocal(id);
  return (
    <div
      className="flex py-7 px-10 border-b hover:opacity-80 hover:shadow-lg shadow-indigo-500/50  transition duration-200 ease-out first:border-t"
      key={item.id + 11234}
    >
      <div
        className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0"
        key={images[0]}
      >
        <Image
          src={images[0]}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      <div className="flex flex-col flex-grow pl-5" key={bedrooms}>
        <div className="flex justify-between box-border">
          <p>{title}</p>
          {isWishlisted ? (
            <LikedIcon
              onClick={() => addToLiked(item)}
              className="h-7 cursor-pointer text-red-500 hover:scale-150 transition transform duration-200 ease-out"
            />
          ) : (
            <HeartIcon
              onClick={() => addToLiked(item)}
              className="h-7 cursor-pointer hover:scale-125 transition transform duration-200 ease-out"
            />
          )}
        </div>
        <h4
          onClick={() => router.push(`search/${id}`)}
          className="text-xl cursor-pointer"
        >
          {listingName}
        </h4>
        <div className="border-b w-10 pt-2" />
        <p className="pt-2 text-sm text-gray-500 flex-grow">{`${listingGuestLabel}• ${bedrooms} bedroom • ${listingBedLabel} • ${listingBathroomLabel} • ${listingPreviewAmenityNames.join(
          "•"
        )} `}</p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-500" />
            {avgRating ? avgRating : "4.3"}
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
            {days ? (
              <div>
                <p className="text-end">
                  $
                  {price
                    ? Number(price.replace(/[^0-9.-]+/g, ""))
                    : days *
                      Number(discountedPrice.replace(/[^0-9.-]+/g, ""))}{" "}
                  total
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
