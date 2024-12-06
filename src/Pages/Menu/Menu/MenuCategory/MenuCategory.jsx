import React from "react";
import MenuItem from "../../../Shared/MenuItem/MenuItem";
import Cover from "../../../Shared/Cover/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title, img }) => {
  return (
    <div className="p-12">
      {title && <Cover img={img} title={title}></Cover>}
      <div className="flex flex-col items-center">
        <div className="grid md:grid-cols-2 gap-10 mt-8">
          {items.map((item) => (
            <MenuItem key={item._id} item={item}></MenuItem>
          ))}
        </div>

        <Link to={`/order/${title}`}>
          <button className="btn btn-outline sm:btn-sm md:btn-md lg:btn-lg uppercase border-0 border-b-4 border-rose-700 mt-4 text-white bg-green-950">
            Order Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
