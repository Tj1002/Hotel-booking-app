import { Label, TextInput } from 'flowbite-react';
import React from 'react'
import { useForm, useFormContext } from 'react-hook-form'

function HotelName() {
  const {register,formState:{errors}}=useFormContext()
  return (
  <div>
         <Label className="text-gray-700  mb-3 font-bold flex-1">
             <span className=" text-2xl ">Name</span>
         </Label>
          <TextInput
            type="text"
            id="name"
            
            className="border rounded w-full py-1 px-2 font-normal"
            placeholder="Enter Hotel Name"
            {...register("name", {
              required: "This field is required",
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
    </div>
  );
}

export default HotelName
