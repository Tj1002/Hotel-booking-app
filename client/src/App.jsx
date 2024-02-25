import {BrowserRouter,Route,Routes} from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import {Toaster} from "react-hot-toast"

import Layout from "./layout/Layout"
import Home from "./pages/Home"
import { useSelector } from "react-redux"
import MyBookings from "./pages/MyBookings"

import MyHotels from "./pages/MyHotels"
import AddHotels from "./pages/AddHotels"

import EditHotel from "./pages/EditHotel"
import HotelDetails from "./pages/HotelDetails"

function App() {
  const {currentUser}=useSelector(state=>state.user)
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/my-hotels" element={currentUser?<ManageHotelForm/>:<Login/>} /> */}
            <Route path="/my-hotels" element={currentUser && <MyHotels />} />
            {currentUser && (
              <Route
                path="/add-hotels"
                element={currentUser && <AddHotels />}
              />
            )}
            {currentUser && (
              <Route path="/view-hotel/:hotelId" element={<HotelDetails/>} />
            )}{currentUser && (
              <Route path="/edit-hotel/:hotelId" element={<EditHotel/>} />
            )}
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App
