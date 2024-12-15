import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { LuUtensils } from "react-icons/lu";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the menu item data to the server with the image url
      const menuItem = {
        name: data.name,
        recipe: data.recipe,
        image: res.data.data.display_url,
        category: data.category,
        price: parseFloat(data.price),
      };

      const menuRes = await axiosSecure.post("/menu", menuItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the menu.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log("with image url", res.data);
  };

  return (
    <div>
      <SectionTitle
        heading="Add an Item"
        subHeading={"What's New ?"}
      ></SectionTitle>
      <div className="bg-indigo-100 p-10 m-5 rounded-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              placeholder="Recipe Name"
              {...register("name", { required: true })}
              className="input input-bordered input-info w-full "
            />
          </div>

          <div className="flex gap-6">
            {/* Category area */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                defaultChecked="default"
                {...register("category", { required: true })}
                className="select select-info w-full "
              >
                <option disabled value="default">
                  Select a Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
            {/* Price Area */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="text"
                placeholder="Recipe Name"
                {...register("price", { required: true })}
                className="input input-bordered input-info w-full "
              />
            </div>
          </div>
          {/* Recipe Details */}
          <label className="form-control">
            <div className="label">
              <span className="label-text">Recipe Details</span>
            </div>
            <textarea
              className="textarea textarea-bordered textarea-info h-24"
              placeholder="Write Recipe Details Here....."
              {...register("recipe", { required: true })}
            ></textarea>
          </label>

          <div className="form-control w-full my-6">
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-bordered file-input-info hover:file-input-success hover:text-rose-700 font-semibold w-full max-w-xs"
            />
          </div>
          <div className=" flex justify-center py-2">
            <button className="btn btn-outline sm:btn-sm md:btn-md w-1/2 uppercase border-0 border-b-4 border-t-4 border-rose-700 mt-4 text-purple-900 md:text-2xl font-Cinzel font-bold bg-slate-100 hover:bg-sky-400">
              Add Item{" "}
              <LuUtensils className="text-2xl md:text-4xl text-slate-800" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
