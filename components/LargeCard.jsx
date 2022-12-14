import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
const LargeCard = ({ img, title, description, buttonText }) => {
  const router = useRouter();
  return (
    <section className="w-full relative py-16 cursor-pointer" key={img}>
      <div className="w-full relative h-96 min-w-[300px]">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      <div className="absolute top-32 left-12">
        <h3 className="text-4xl mb-3 w-64">{title}</h3>
        <p>{description}</p>
        <button
          onClick={() => router.push("/wishlisted_by_ordo")}
          className="text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-5"
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default LargeCard;
