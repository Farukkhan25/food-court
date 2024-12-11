import React from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
  const { name, recipe, image, price, _id } = item;
  const { user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const handleAddToCart = () => {
    if (user && user.email) {
      // Send cart item to the database
      // console.log(food, user.email);
      const cartItem = {
        manuId: _id,
        email: user.email,
        name,
        image,
        price,
      };
      axiosSecure.post("/carts", cartItem).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${name} added to your cart`,
            showConfirmButton: false,
            timer: 1500,
          });
          // refetch cart 
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not Logged in",
        text: "Please Login to Add this item in your cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          // navigate user to the login page
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card bg-base-100 max-w-96 shadow-xl">
      <figure>
        <img src={image} alt="food" />
      </figure>
      <p className="bg-slate-900 text-white absolute right-0 mr-6 mt-4 px-2">
        ${price}
      </p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title font-Cinzel">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button
            onClick={handleAddToCart}
            className="btn btn-outline sm:btn-sm md:btn-md lg:btn-lg uppercase border-0 border-b-4 border-t-4 border-rose-700 mt-4 text-purple-900 font-bold bg-slate-100 hover:bg-sky-400"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
