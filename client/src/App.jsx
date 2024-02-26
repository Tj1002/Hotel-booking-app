import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import MyBookings from "./pages/MyBookings";

import MyHotels from "./pages/MyHotels";
import AddHotels from "./pages/AddHotels";

import EditHotel from "./pages/EditHotel";
import HotelDetails from "./pages/HotelDetails";
import Search from "./pages/Search";
import Booking from "./pages/Booking";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-hotels" element={<MyHotels />} />
            {currentUser && (
              <>
                <Route path="/add-hotels" element={<AddHotels />} />
                <Route path="/hotel/:hotelId/booking" element={<Booking />} />
                <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
              </>
            )}
            <Route path="/detail/:hotelId" element={<HotelDetails />} />
            <Route path="/search" element={<Search />} />

            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
