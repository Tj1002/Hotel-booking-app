import React from 'react'
import { useFormContext } from 'react-hook-form';
import { hotelTypes } from './hotelTypesAndFacilities';
import { Label, TextInput } from 'flowbite-react';

function HotelType() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
    const typeWatch = watch("type");
  return (
    <div>
      <span className="text-2xl font-bold mb-3 text-gray-700">Type</span>
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 text-center align-middle">
        {hotelTypes.map((type) => (
          <Label

            key={type}
            className={
              typeWatch === type
                ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <TextInput
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span className="whitespace-normal">{type}</span>
          </Label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
}

export default HotelType
