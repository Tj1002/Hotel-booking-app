import { useParams } from "react-router-dom";

import ManageHotelForm from "../components/manageHotelForm/ManageHotelForm";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [hotelDetails, setHotelDetails] = useState([]);

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

  return <ManageHotelForm hotel={hotelDetails} />;
};

export default EditHotel;
