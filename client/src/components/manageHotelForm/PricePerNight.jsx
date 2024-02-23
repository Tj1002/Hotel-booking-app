import { Label, TextInput } from 'flowbite-react'

import { useFormContext } from 'react-hook-form';

function PricePerNight() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
   <div>
          <Label className="text-gray-700 text-2xl mb-3">
            <span className="text-2xl font-bold label-text">
              Price per night
            </span>
          </Label>
          <TextInput
            type="number"
            id="pricePerNight"
            className="border rounded w-full py-1 px-2 font-normal"
            placeholder="Enter Description"
            {...register("pricePerNight", {
              required: "This field is required",
            })}
          />
          {errors.pricePerNight && (
            <span className="text-red-500">{errors.pricePerNight.message}</span>
          )}
        </div>
  )
}

export default PricePerNight
