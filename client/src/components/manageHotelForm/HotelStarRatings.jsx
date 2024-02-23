import { Label, Select } from 'flowbite-react'
import React from 'react'
import { useFormContext } from 'react-hook-form';

function HotelStarRatings() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
           <div>
          <Label className="text-gray-700 font-bold text-2xl max-w-[50%]">
            Star Rating
            <Select
              {...register("starRating", {
                required: "This field is required",
              })}
              className="border rounded w-full p-2 text-gray-700 font-normal"
            >
              <option value="" className="text-sm font-bold">
                Select as Rating
              </option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Select>
            {errors.starRating && (
              <span className="text-red-500">{errors.starRating.message}</span>
            )}
          </Label>
        </div>
  )
}

export default HotelStarRatings
