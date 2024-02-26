import { useEffect, useState } from "react";

import LatestDestinationCard from "../components/DestinationCard/LatestDestinationCard";

function HotelDetails() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const getAllHotel = async () => {
      try {
        const response = await fetch(`/api/v1/hotels`);
        const result = await response.json();
        console.log(result);
        setHotels(result);
      } catch (error) {
        console.log(error);
      }
    };
    getAllHotel();
  }, []);
  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <div className="mx-8 space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent desinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} key={hotel._id} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} key={hotel._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
