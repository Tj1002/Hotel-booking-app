import { createSlice } from "@reduxjs/toolkit";
import { loadStripe } from "@stripe/stripe-js";

const initialState = {
  stripePromise: null,
};

const stripeSlice = createSlice({
  name: "stripe",
  initialState,
  reducers: {
    setStripePromise: (state, action) => {
      state.stripePromise = action.payload;
    },
  },
});

export const { setStripePromise } = stripeSlice.actions;
export default stripeSlice.reducer;
