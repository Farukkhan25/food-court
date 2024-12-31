import React from "react";
import {  
  FaCalendar,
  FaCalendarCheck,
  FaCartArrowDown,
  FaHome,
  FaList,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import {
  MdRateReview,
  MdRestaurantMenu,
  MdFoodBank,
} from "react-icons/md";
import { RiHomeHeartFill } from "react-icons/ri";
import { LuNotebookPen } from "react-icons/lu";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart();
    
    //get isAdmin value from the database
    const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      {/* Dashboard side bar */}

      <div className="w-78 min-h-screen bg-orange-400">
        <div>
          <NavLink
            to="/"
            className="btn btn-ghost text-3xl font-extrabold font-Cinzel p-8 w-full h-full"
          >
            Food Court
          </NavLink>
        </div>
        <ul className="menu p-4 uppercase font-bold text-xl">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <RiHomeHeartFill></RiHomeHeartFill>
                  Admin home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems">
                  <FaUtensils />
                  Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                  <MdFoodBank></MdFoodBank>
                  Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings">
                  <LuNotebookPen></LuNotebookPen>
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers></FaUsers>
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <RiHomeHeartFill></RiHomeHeartFill>
                  user home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservation">
                  <FaCalendar></FaCalendar>
                  reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <IoWallet></IoWallet>
                  Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cart">
                  <FaCartArrowDown></FaCartArrowDown>
                  My Cart ({cart.length})
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/review">
                  <MdRateReview></MdRateReview>
                  add review
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/booking">
                  <FaCalendarCheck></FaCalendarCheck>
                  my booking
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <MdRestaurantMenu></MdRestaurantMenu>
              menu
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
