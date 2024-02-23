import {BrowserRouter,Route,Routes} from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import {Toaster} from "react-hot-toast"

import Layout from "./layout/Layout"
import Home from "./pages/Home"
import { useSelector } from "react-redux"
import MyBookings from "./pages/MyBookings"
import ManageHotelForm from "./components/manageHotelForm/ManageHotelForm"

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
            <Route path="/my-hotels" element={currentUser?<ManageHotelForm/>:<Login/>} />
            <Route path="/my-bookings" element={<MyBookings />} />
            {/* <Route path="*" element={<Register />} /> */}
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App
