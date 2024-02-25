
import { Link } from "react-router-dom";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { useEffect, useState } from "react";
import {useSelector} from "react-redux"

const MyHotels = () => {
  const [hotelsData,setHotelsData]=useState([])
  const {currentUser}=useSelector(state=>state.user)
  // console.log(currentUser);

  useEffect(()=>{
    const getAllHotels = async ()=>{
      try {
        const res =await fetch('/api/v1/my-hotels/getAllHotels')
        const results = await res.json()
        const hotelData= results.data
        console.log(hotelData);
        if(res.ok){
          console.log(hotelData[1].imageUrls[0]);
          setHotelsData(hotelData)
        }
      } catch (error) {
        console.log("error occoured");
      }
    }
    if(currentUser){
      getAllHotels()
    }

  },[currentUser])

  return (
    <div className="container mx-auto my-5">
      <span className="flex justify-between my-2">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotels"
          className="flex bg-[#0c3b2e] text-white text-xl font-bold p-2 hover:bg-[#4ba78d] hover:text-[#0c3b2e]"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelsData.map((hotel) => (
          <div
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
            key={hotel._id}
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="flex" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />£{hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <div className="flex justify-end flex-row gap-2">
              <span>
                <Link
                  to={`/view-hotel/${hotel._id}`}
                  className="flex bg-[#0c3b2e] text-white text-xl font-bold p-2 hover:bg-[#4ba78d] hover:text-[#0c3b2e]"
                >
                  View Details
                </Link>
              </span>
              <span >
                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  className="flex bg-[#0c3b2e] text-white text-xl font-bold p-2 hover:bg-[#4ba78d] hover:text-[#0c3b2e]"
                >
                  Edit Hotel
                </Link>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
