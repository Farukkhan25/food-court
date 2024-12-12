import React from "react";
import {
  FaCalendar,
  FaCalendarCheck,
  FaCartArrowDown,
  FaHome,
} from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { MdRateReview, MdRestaurantMenu } from "react-icons/md";
import { RiHomeHeartFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";

const Dashboard = () => {
  const [cart] = useCart();

  return (
    <div className="flex">
      {/* Dashboard side bar */}

      <div className="w-72 min-h-screen bg-orange-400">
        <div>
          <NavLink
            to="/"
            className="btn btn-ghost text-3xl font-extrabold font-Cinzel p-8 w-full h-full"
          >
            Food Court
          </NavLink>
        </div>
        <ul className="menu p-4 uppercase font-bold text-xl">
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
            <NavLink to="/dashboard/payment">
              <IoWallet></IoWallet>
              payment history
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
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/menu">
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
