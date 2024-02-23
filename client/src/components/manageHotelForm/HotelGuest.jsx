import { Label, TextInput } from 'flowbite-react'

import { useFormContext } from 'react-hook-form';

function HotelGuest() {
   const {
     register,
     formState: { errors },
   } = useFormContext();

  return (
            <div>
          <span className="text-2xl text-gray-700 font-bold mb-3">Guests</span>
          <div className="grid grid-cols-2 p-6 gap-5  bg-gray-300">
            <Label className="text-gray-700 text-sm font-semibold">
              Adults
              <TextInput
                className="border rounded w-full py-2 px-3 font-normal"
                type="number"
                min={1}
                {...register("adultCount", {
                  required: "This field is required",
                })}
              />
              {errors.adultCount?.message && (
                <span className="text-red-500 text-sm fold-bold">
                  {errors.adultCount?.message}
                </span>
              )}
            </Label>
            <Label className="text-gray-700 text-sm font-semibold">
              Children
              <TextInput
                className="border rounded w-full py-2 px-3 font-normal"
                type="number"
                min={0}
                {...register("childCount", {
                  required: "This field is required",
                })}
              />
              {errors.childCount?.message && (
                <span className="text-red-500 text-sm fold-bold">
                  {errors.childCount?.message}
                </span>
              )}
            </Label>
          </div>
        </div>
  )
}

export default HotelGuest
