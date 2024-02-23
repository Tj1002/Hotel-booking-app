import { Label, Textarea } from 'flowbite-react'
import React from 'react'
import { useFormContext } from 'react-hook-form';

function HotelDescription() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
            <div>
          <Label className="text-gray-700 text-2xl font-bold">
            <span className="text-2xl font-bold">Description</span>
          </Label>
          <Textarea
            type="text"
            id="description"
            className="border rounded w-full py-1 px-2 font-normal"
            placeholder="Enter Description"
            {...register("description", {
              required: "This field is required",
            })}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
  )
}

export default HotelDescription
