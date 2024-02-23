import { Button, FileInput} from "flowbite-react";
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
import ButtonForm from "../Button/Button";

function ManageHotelForm() {
  const navigate=useNavigate()
  const methods = useForm();
  const {handleSubmit} = methods;

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
      const response = await fetch("/api/v1/my-hotels/register", {
        method: "POST",
        body: formData
      });
      const result = await response.json();

      if (result.success === false) {
        console.log(result.error);
        toast.error("Invalid credentials");
        return
      }
      
      if (response.ok) {
        toast.success("Hotel created successfully");
        console.log(result);
        navigate("/");
      }
    } 
    catch (error) {
      toast.error("Hotel creation failure");
    }
   
  });
  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-4 my-4 items-center justify-center">
        <h1 className="text-3xl text-gray-700   font-bold mb-3">Add Hotel</h1>
        <form
          onSubmit={onSubmit}
          className="flex flex-col w-2/3 md:w-1/3  gap-4"
        >
          <HotelName />
          <HotelLocation />
          <HotelDescription />
          <PricePerNight />
          <HotelStarRatings />
          <HotelType />
          <HotelFacilities />
          <HotelGuest />
          <ImagesSection />
          <ButtonForm message="Add Hotel" key={Date.now()}/>
         
        </form>
      </div>
    </FormProvider>
  );
}

export default ManageHotelForm;
