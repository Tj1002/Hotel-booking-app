import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

function HotelDetails() {
  const { currentUser } = useSelector((state) => state.user);
  const [hotelDetails, setHotelDetails] = useState([]);
  const { hotelId } = useParams();
  useEffect(() => {
    const getSingleHotel = async () => {
      try {
        const response = await fetch(
          `/api/v1/my-hotels/getSingleHotel/${hotelId}`
        );
        const result = await response.json();
        const hotel = result.data;
        console.log(hotel);
        setHotelDetails(hotel);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser) {
      getSingleHotel();
    }
  }, [currentUser]);
  hotelDetails && console.log(hotelDetails);
  return (
    <div className="mx-8 my-4">
      <div className="container mx-auto mb-2">
        <span className="flex gap-2">
          {Array.from({ length: hotelDetails.starRating }).map((_,index) => (
            <AiFillStar className="fill-yellow-400" key={index} />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotelDetails.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {console.log(hotelDetails.imageUrls)}
        {hotelDetails &&
          hotelDetails.imageUrls &&
          hotelDetails.imageUrls.map((image) => (
            <div className="h-[300px]" key={image}>
              <img
                src={image}
                alt={hotelDetails.name}
                className="rounded-md w-full h-full object-cover object-center"
              />
            </div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mt-2">
        {hotelDetails &&
          hotelDetails.facilities &&
          hotelDetails.facilities.map((facility) => (
            <div
              className="border border-slate-300 rounded-sm p-3"
              key={facility}
            >
              {facility}
            </div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotelDetails.description}</div>
        {/* <div className="h-fit">
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div> */}
      </div>
    </div>
  );
}

export default HotelDetails;
