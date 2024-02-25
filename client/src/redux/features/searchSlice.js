import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: "",
  checkIn: new Date(),
  checkOut: new Date(),
  adultCount: 1,
  childCount: 1,
  hotelId: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateDestination: (state, action) => {
      state.destination = action.payload;
    },
    updateCheckIn: (state, action) => {
      state.checkIn = action.payload;
    },
    updateCheckOut: (state, action) => {
      state.checkOut = action.payload;
    },
    updateAdultCount: (state, action) => {
      state.adultCount = action.payload;
    },
    updateChildCount: (state, action) => {
      state.childCount = action.payload;
    },
    updateHotelId: (state, action) => {
      state.hotelId = action.payload;
    },
  },
});

export const {
  updateDestination,
  updateCheckIn,
  updateCheckOut,
  updateAdultCount,
  updateChildCount,
  updateHotelId,
} = searchSlice.actions;

export default searchSlice.reducer;
