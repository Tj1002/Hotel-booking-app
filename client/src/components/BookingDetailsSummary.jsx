import { useSelector } from "react-redux";
import { hotelTypes } from "./manageHotelForm/hotelTypesAndFacilities";

const BookingDetailsSummary = ({ hotel, numberOfNights }) => {
  const search = useSelector((state) => state.search);
  console.log(search);

  // Add conditional checks to ensure search.checkIn and search.checkOut are Date objects
  const checkInDate =
    search.checkIn instanceof Date ? search.checkIn : new Date();
  const checkOutDate =
    search.checkOut instanceof Date ? search.checkOut : new Date();

  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold">Your Booking Details</h2>
      <div className="border-b py-2">
        Location:
        <div className="font-bold">{`${hotel?.name}, ${hotel?.city}, ${hotel?.country}`}</div>
      </div>
      <div className="flex justify-between">
        <div>
          Check-in
          <div className="font-bold"> {checkInDate.toDateString()}</div>
        </div>
        <div>
          Check-out
          <div className="font-bold"> {checkOutDate.toDateString()}</div>
        </div>
      </div>
      <div className="border-t border-b py-2">
        Total length of stay:
        <div className="font-bold">{numberOfNights} nights</div>
      </div>
      <div>
        Guests{" "}
        <div className="font-bold">
          {hotel?.adultCount} adults & {hotel?.childCount} children
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
