import React, { useEffect, useState } from "react";
import NavBar from "../Component/NavBar";
import axiosInstance from "../Utils/Axios";
import Card from "../Component/Card";
import CheckRequestModal from "../Component/CheckRequestModal";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [listing, setListing] = useState(null);
  const [requests, setRequests] = useState(null);
  const [isOpen, setIsOpen]=useState(false)
  const [itemOne, setItemOne]=useState(null)
  const [itemTwo, setItemTwo]=useState(null)
  const [selectedRequest, setSelectedRequest]=useState(null)
  useEffect(() => {
    const verifyToken = async () => {
      const user = await axiosInstance.post(
        "/auth/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(user.data.user);
      setUser(user.data.user);
    };
    const fetchListings = async () => {
      const res = await axiosInstance.post(
        "/item/user",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      setListing(res.data.item);
    };
    const fetchRequests = async () => {
      const res = await axiosInstance.post(
        "/request",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      setRequests(res.data.requests);
    };
    verifyToken();
    fetchListings();
    fetchRequests();
  }, []);
  return (
    <div>
      <NavBar />
      <head>
        <link
          rel="stylesheet"
          href="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/css/main.ad49aa9b.css"
        />
      </head>
      <body>
        {user ? (
          <div className="flex flex-col justify-center items-center pt-24">
            <div className=" flex flex-col items-center rounded-[20px]    bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
              <div className="mt-2 mb-8 w-full">
                <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                  {user.name}
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-4 px-2 w-full">
                <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-base font-medium text-navy-700 dark:text-white">
                    {user.email}
                  </p>
                </div>

                <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-base font-medium text-navy-700 dark:text-white">
                    {user.phone}
                  </p>
                </div>
              </div>
            </div>
            <div className=" w-full flex flex-col justify-center ">
              <h1 className="font-bold text-xl px-16">Listings:</h1>
              <div className="mt-6 w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listing && listing.map((listing) => <Card item={listing} />)}
              </div>
            </div>
            <div className=" w-full flex flex-col justify-center mt-11">
              <h1 className="font-bold text-xl px-16">Requests:</h1>
              <div className="mt-6 w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests &&
                  requests.map((request) => (
                    <>
                      <div class="flex justify-center items-center mb-10">
                        <div class="max-w-[720px] mx-auto">
                          <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                            <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl ">
                              <img
                                src={`${request.itemOne.image[0]}`}
                                alt="card-image"
                                class="object-cover w-fit h-fit"
                              />
                            </div>
                            <div class="p-6">
                              <div class="flex items-center justify-between mb-2">
                                <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                                  {request.itemOne.title}
                                </p>
                                <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                                ₹{request.itemOne.originalCost}
                                </p>
                              </div>
                              <p class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                                {request.itemOne.description}
                              </p>
                            </div>
                            <div class="p-6 pt-0">
                              <button
                                class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                type="button"
                                onClick={()=>{
                                  setItemOne(request.itemOne)
                                  setItemTwo(request.itemTwo)
                                  setSelectedRequest(request)
                                  setIsOpen(true)}}
                              >
                                Check Request
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>
            {
              isOpen && (<CheckRequestModal setIsOpen={setIsOpen} itemOne={itemOne} itemTwo={itemTwo} request={selectedRequest} />)
            }
          </div>
        ) : (
          <p>Login First!!</p>
        )}
      </body>
    </div>
  );
};

export default Profile;
