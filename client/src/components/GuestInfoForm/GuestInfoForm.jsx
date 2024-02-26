import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Label, TextInput } from "flowbite-react";
import {
  updateAdultCount,
  updateCheckIn,
  updateCheckOut,
  updateChildCount,
  updateDestination,
} from "../../redux/features/searchSlice";

const GuestInfoForm = ({ pricePerNight, hotelId }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const search = useSelector((state) => state.search);
  console.log(search);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      checkIn: search.checkIn || new Date(),
      checkOut: search.checkOut || new Date(),
      adultCount: search.adultCount || 1,
      childCount: search.childCount || 0,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data) => {
    dispatch(updateDestination(""));
    dispatch(updateCheckIn(data.checkIn));
    dispatch(updateCheckOut(data.checkOut));
    dispatch(updateChildCount(data.childCount));
    dispatch(updateAdultCount(data.adultCount));

    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data) => {
    dispatch(updateDestination(""));
    dispatch(updateCheckIn(data.checkIn));
    dispatch(updateCheckOut(data.checkOut));
    dispatch(updateChildCount(data.childCount));
    dispatch(updateAdultCount(data.adultCount));

    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">${pricePerNight}</h3>
      <form
        onSubmit={
          currentUser ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="flex bg-white px-2 py-1 gap-2">
            <Label className="items-center flex">
              Adults:
              <TextInput
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </Label>
            <Label className="items-center flex">
              Children:
              <TextInput
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </Label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {currentUser ? (
            <button
              type="submit"
              className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl"
            >
              Book Now
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl"
            >
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
