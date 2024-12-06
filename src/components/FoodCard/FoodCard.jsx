import React from 'react';

const FoodCard = ({ item }) => {
    const { name, recipe, image, price } = item;

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
            <button className="btn btn-outline sm:btn-sm md:btn-md lg:btn-lg uppercase border-0 border-b-4 border-t-4 border-rose-700 mt-4 text-purple-900 font-bold bg-slate-100 hover:bg-sky-400">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
};

export default FoodCard;