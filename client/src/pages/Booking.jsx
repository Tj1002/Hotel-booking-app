import BookingForm from "../components/BookingForm/BookingForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Booking = () => {
  const search = useSelector((state) => state.search);
  const { currentUser } = useSelector((state) => state.user);
  const [hotelDetails, setHotelDetails] = useState(null);
  console.log(search);

  const { hotelId } = useParams();
  const [paymentIntentData, setPaymentIntentData] = useState(null);

  const [numberOfNights, setNumberOfNights] = useState(0);

  const stripePromise = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);
      return stripe;
    } catch (error) {
      console.error("Error loading Stripe:", error);

      throw error;
    }
  };
  console.log(stripePromise());

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const checkInDate = new Date(search.checkIn);
      const checkOutDate = new Date(search.checkOut);

      const nights =
        Math.abs(checkOutDate.getTime() - checkInDate.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  //payment intent
  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const checkInDate = new Date(search.checkIn);
      const checkOutDate = new Date(search.checkOut);

      const nights =
        Math.abs(checkOutDate.getTime() - checkInDate.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  useEffect(() => {
    // Validate numberOfNights
    if (numberOfNights >= 1) {
      const fetchPaymentIntent = async () => {
        try {
          const response = await fetch(
            `/api/v1/bookings/${hotelId}/bookings/create-payment-intent`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ numberOfNights }),
            }
          );
          const result = await response.json();
          console.log(result.data);
          setPaymentIntentData(result.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchPaymentIntent();
    } else {
      console.log("numberOfNights must be greater than or equal to 1");
    }
  }, [hotelId, numberOfNights]);

  console.log(hotelDetails);

  //
  useEffect(() => {
    const getSingleHotel = async () => {
      try {
        const response = await fetch(`/api/v1/hotels/${hotelId}`);
        const result = await response.json();
        const hotel = result.data;

        setHotelDetails(hotel.hotel);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleHotel();
  }, [hotelId]);
  console.log(hotelDetails);

  // current user fetch
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("/api/v1/users/me");
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.log("error", error);
      }
    };
    if (currentUser) {
      fetchCurrentUser();
    }
  }, [currentUser]);
  if (!hotelDetails || !paymentIntentData) {
    return <></>;
  }
  console.log(paymentIntentData?.totalCost);
  console.log(paymentIntentData?.clientSecret);
  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotelDetails} // Adjusted from hotel to hotelDetails
      />
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise()}
          options={{
            clientSecret: paymentIntentData?.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
