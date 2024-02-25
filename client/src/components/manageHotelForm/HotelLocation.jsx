import { Label, TextInput } from 'flowbite-react'

import { useFormContext } from 'react-hook-form';

function HotelLocation() {
  

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
            <div className="flex flex-row gap-4">
          <Label className="text-gray-700 text-2xl font-bold">
            City
            <TextInput
              id="city"
              type="text"
            
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("city", { required: "This field is required" })}
            />
            {errors.city && (
              <span className="text-red-500">{errors.city.message}</span>
            )}
          </Label>
          <div>
            <Label className="text-gray-700 text-2xl font-bold">
              Country
              <TextInput
                type="text"
                id="country"
                
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("country", {
                  required: "This field is required",
                })}
              />
              {errors.country && (
                <span className="text-red-500">{errors.country.message}</span>
              )}
            </Label>
          </div>
        </div>
  )
}

export default HotelLocation
