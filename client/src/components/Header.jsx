import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signoutSuccess } from "../redux/features/userSlice";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  console.log(currentUser);
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/v1/users/logout", {
        method: "POST",
      });

      if (res.ok) {
        toast.success("logout successful")

        console.log("successfully logged out");
        dispatch(signoutSuccess());
        navigate('/')
        
      } else {
        toast.error("logout failure")
        console.log("sign out failure");
        return;
      }
    } catch (error) {
        toast.error("something went wrong");

      console.log(error);
    }
  };
  return (
    <div className="bg-[#0c3b2e] w-full flex-wrap">
      <div className="flex flex-row items-center justify-between">
        <div className="mx-2 py-6 flex-shrink-1">
          <Link to="/">
            <span className="text-white text-xl font-bold md:text-4xl">
              WonderVista
            </span>
          </Link>
        </div>
        <div className="flex flex-nowrap mr-2 flex-shrink-1">
          {currentUser ? (
            <div className="flex flex-row gap-2 ">
              <div className=" flex flex-nowrap mx-auto py-6">
                <Link to="/sign-in">
                  <span className="text-[#0c3b2e] px-2 rounded bg-white text-sm font-bold md:text-xl hover:bg-[#0c3b2e] hover:text-white">
                    My bookings
                  </span>
                </Link>
              </div>
              <div className=" mx-auto py-6">
                <Link to="/sign-in">
                  <span className="text-[#0c3b2e] px-2 rounded bg-white text-sm font-bold md:text-xl hover:bg-[#0c3b2e] hover:text-white">
                    My hotels
                  </span>
                </Link>
              </div>
              <div className=" mx-auto py-6">
                <span
                  onClick={handleSignout}
                  className="text-[#0c3b2e] px-2 rounded bg-white text-sm font-bold md:text-xl hover:bg-[#0c3b2e] hover:text-white"
                >
                  Logout
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-row">
              <div className=" mx-2 py-6">
                <Link to="/register">
                  <span className="text-[#0c3b2e] px-2 rounded bg-white text-sm font-bold md:text-xl hover:bg-[#0c3b2e] hover:text-white">
                    Register
                  </span>
                </Link>
              </div>
              <div className=" mx-2 py-6">
                <Link to="/sign-in">
                  <span className="text-[#0c3b2e] px-2 rounded bg-white text-sm font-bold md:text-xl hover:bg-[#0c3b2e] hover:text-white">
                    Login
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
