import React from 'react'
import Image from 'next/image'
import { HeartIcon } from '@heroicons/react/outline'
const InfoCard = ({bedrooms, title,beds, bathrooms,id,price,images,listingName,listingPreviewAmenityNames, listingGuestLabel,listingBathroomLabel,avgRating,listingBedLabel}) => {
  return (
    <div className='flex'>
        <div className='relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0'>
            <Image src={images[0]} layout='fill' objectFit='cover'/>
        </div>
        <div className='flex flex-col flex-grow pl-5'>
            <div className='flex justify-between'>
                <p>{title}</p>
                <HeartIcon  className='h-7 cursor-pointer' />
            </div>
            <h4 className='text-xl'>{listingName}</h4>
            <div className='border-b w-10 pt-2'/>
            <p>{`${listingGuestLabel}• ${bedrooms} bedroom • ${listingBedLabel} • ${listingBathroomLabel} • ${listingPreviewAmenityNames.join('•')} `}</p>
        </div>
    </div>
  )
}

export default InfoCard