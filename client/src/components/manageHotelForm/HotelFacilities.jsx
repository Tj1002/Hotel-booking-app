import { Label, TextInput } from 'flowbite-react';

import { hotelFacilities } from './hotelTypesAndFacilities';
import { useFormContext } from 'react-hook-form';

function HotelFacilities() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
           <div>
          <span className="text-gray-700 text-2xl font-bold mb-3">
            Facilities
          </span>
          <div className="grid grid-cols-3 gap-3">
            {hotelFacilities.map((facility) => (
              <Label
                key={facility}
                className="text-sm flex gap-1 text-gray-700"
              >
                <TextInput
                  type="checkbox"
                  value={facility}
                  {...register("facilities", {
                    validate: (facilities) => {
                      if (facilities && facilities.length > 0) {
                        return true;
                      } else {
                        return "At least one facility is required";
                      }
                    },
                  })}
                />
                {facility}
              </Label>
            ))}
          </div>
          {errors.facilities && (
            <span className="text-red-500 text-sm font-bold">
              {errors.facilities.message}
            </span>
          )}
        </div>
  )
}

export default HotelFacilities
