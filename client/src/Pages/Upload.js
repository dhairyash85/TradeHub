import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../Utils/Axios"; // Your axios instance
import NavBar from "../Component/NavBar";
import Select from 'react-select'
const Upload = () => {
  const [form, setForm] = useState({
    image: null,
    type: "image",
    title: "",
    description: "",
    cost: "",
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "gaming", label: "Gaming" },
    { value: "fashion", label: "Fashion" },
    { value: "home_appliances", label: "Home Appliances" },
    { value: "beauty_personal_care", label: "Beauty & Personal Care" },
    { value: "furniture", label: "Furniture" },
    { value: "sports_outdoors", label: "Sports & Outdoors" },
    { value: "automotive", label: "Automotive" },
    { value: "books", label: "Books" },
    { value: "toys", label: "Toys & Games" },
    { value: "mobile_phones", label: "Mobile Phones" },
    { value: "laptops_computers", label: "Laptops & Computers" },
    { value: "groceries", label: "Groceries" },
    { value: "health_wellness", label: "Health & Wellness" },
    { value: "jewelry", label: "Jewelry" },
    { value: "baby_products", label: "Baby Products" },
    { value: "musical_instruments", label: "Musical Instruments" },
    { value: "pet_supplies", label: "Pet Supplies" },
    {
      value: "stationery_office_supplies",
      label: "Stationery & Office Supplies",
    },
    { value: "footwear", label: "Footwear" },
  ];
  const handleSelectChange = (option) => {
    setSelectedOption(option);
    console.log("Selected option:", option);
  };

  const handleImageUpload = async (imageFile) => {
    const cloudinaryUrl =
      "https://api.cloudinary.com/v1_1/dke7f8nkt/image/upload";
    const formData = new FormData();

    // Appending the image file and required parameters
    formData.append("file", imageFile);
    formData.append("upload_preset", "TraderHub");

    try {
      const res = await axios.post(cloudinaryUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.secure_url; // Cloudinary URL of the uploaded image
    } catch (err) {
      console.error("Error uploading image:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    // Upload image to Cloudinary first
    const uploadedImageUrl = await handleImageUpload(form.image);

    if (uploadedImageUrl) {
      // Once the image is uploaded, send the image URL to your backend
      try {
        await axiosInstance.post(
          "/item/add",
          {
            title: form.title,
            description: form.description,
            originalCost: form.cost,
            image: uploadedImageUrl, 
            category: selectedOption.value
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (err) {
        console.error("Error submitting form:", err);
      }
    } else {
      console.error("Image upload failed.");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center p-12 mt-4">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form className="py-6 px-9">
            <div className="mb-5">
              <label
                htmlFor="title"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Name of the product
              </label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                value={form.description}
                placeholder="Description"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5"></div>
            <div className="mb-5">
              <label
                htmlFor="cost"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Original Cost of the Product
              </label>
              <input
                type="text"
                name="cost"
                placeholder="Cost"
                value={form.cost}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, cost: e.target.value }))
                }
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="cost"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Category
              </label>
              <Select
                value={selectedOption}
                onChange={handleSelectChange}
                options={categories}
                placeholder="Select Category"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-6 pt-4">
              <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                Upload File
              </label>

              <div className="mb-8">
                <link
                  rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <div className=" flex items-center justify-center bg-white ">
                  <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                    <div className="md:flex">
                      <div className="w-full p-3">
                        <div className="relative  h-48 rounded-lg border-dashed border-2 border-purple-700 bg-gray-100 flex justify-center items-center">
                          <div className="absolute">
                            <div className="flex flex-col items-center">
                              <i className="fa fa-folder-open fa-4x text-purple-700 hover:text-purple-400"></i>
                              <span className="block text-gray-400 font-normal">
                                Attach you files here
                              </span>
                            </div>
                          </div>

                          <input
                            type="file"
                            className="h-full w-full opacity-0"
                            name=""
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                image: e.target.files[0],
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                className="hover:shadow-form w-full rounded-md bg-purple-700 hover:bg-purple-400 transition-colors py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Send File
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
