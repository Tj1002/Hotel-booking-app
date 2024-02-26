import { Button, FileInput } from "flowbite-react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import HotelName from "./HotelName";
import HotelLocation from "./HotelLocation";
import HotelDescription from "./HotelDescription";
import PricePerNight from "./PricePerNight";
import HotelStarRatings from "./HotelStarRatings";
import HotelType from "./HotelTypes";
import HotelFacilities from "./HotelFacilities";
import HotelGuest from "./HotelGuest";
import ImagesSection from "./HotelImages";

import { useEffect } from "react";

function ManageHotelForm({ hotel }) {
  const navigate = useNavigate();
  const methods = useForm();
  const {
    handleSubmit,
    reset,
    register,
    formState: { isLoading, errors },
  } = methods;
  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);
  console.log(hotel?._id);
  const onSubmit = handleSubmit(async (data) => {
    const FileList = Array.from(data.imageFiles);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("starRating", data.starRating.toString());
    formData.append("type", data.type);
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childCount", data.childCount.toString());
    data.facilities.forEach((facility) => {
      formData.append("facilities", facility);
    });
    FileList.forEach((file) => {
      formData.append("imageFiles", file);
    });

    try {
      let url = "/api/v1/my-hotels/register";
      let method = "POST";

      if (hotel) {
        url = `/api/v1/my-hotels/updateHotel/${hotel._id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (response.ok) {
        const message = hotel
          ? "Hotel updated successfully"
          : "Hotel created successfully";
        toast.success(message);
        navigate("/");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error);
      }
    } catch (error) {
      toast.error("Error updating hotel");
    }
  });
  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-4 my-4 mx-6 lg:mx-28 items-center justify-center ">
        <h1 className="text-3xl text-gray-700   font-bold mb-3">
          {hotel ? "Update Hotel" : "Add Hotel"}
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col  gap-10">
          <HotelName />
          <HotelLocation />
          <HotelDescription />
          <PricePerNight />
          <HotelStarRatings />
          <HotelType />
          <HotelFacilities />
          <HotelGuest />
          <ImagesSection />
          <span className="flex justify-end">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </span>
        </form>
      </div>
    </FormProvider>
  );
}

export default ManageHotelForm;
