import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const BookingForm = ({ currentUser, paymentIntent }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { hotelId } = useParams();
  const search = useSelector((state) => state.search);

  const {
    handleSubmit,
    register,
    formState: { isLoading },
  } = useForm({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    },
  });

  const onSubmit = async (formData) => {
    try {
      if (!stripe || !elements) {
        throw new Error("Stripe.js has not loaded yet.");
      }

      const result = await stripe.confirmCardPayment(
        paymentIntent.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (result.error) {
        toast.error(result.error.message);

        throw new Error(result.error.message);
      }

      if (result.paymentIntent.status === "succeeded") {
        await createRoomBooking(formData, result.paymentIntent.id);
      } else {
        throw new Error("Payment was not successful.");
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
      // Handle error, display error message to user, etc.
    }
  };

  const createRoomBooking = async (formData, paymentIntentId) => {
    const response = await fetch(`/api/v1/bookings/${hotelId}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...formData, paymentIntentId }),
    });

    if (!response.ok) {
      throw new Error("Error booking room");
    }

    // Handle successful booking
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          {...register("firstName")}
          readOnly
          disabled
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          {...register("lastName")}
          readOnly
          disabled
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          {...register("email")}
          readOnly
          disabled
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>

        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: ${paymentIntent?.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold"> Payment Details</h3>
        {stripe && elements ? (
          <CardElement
            id="payment-element"
            className="border rounded-md p-2 text-sm"
          />
        ) : (
          <p>Stripe.js is still loading...</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500"
        >
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
