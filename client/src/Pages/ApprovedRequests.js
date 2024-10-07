import React, { useEffect, useState } from "react";
import NavBar from "../Component/NavBar";
import axiosInstance from "../Utils/Axios";

const ApprovedRequests = () => {
  const [user, setUser]=useState(null)
  const [approvedRequests, setApprovedRequests] = useState([]);
  useEffect(() => {
    const verifyToken=async()=>{
        const res=await axiosInstance.post('/auth/verify',{},{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
        setUser(res.data.user)
    }
    const fetchApprovedRequests = async () => {
      const res = await axiosInstance.post(
        "/request/fetchApproved",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    //   console.log(res)
    //   if(!res.success){
    //     return setApprovedRequests([])
    //   }
      setApprovedRequests(res.data.requests);
      console.log(res.data);
    };
    verifyToken()
    fetchApprovedRequests();
  }, []);
  if (approvedRequests.length == 0) {
    return (
      <div>
        <NavBar />
        <h1>No reuests have been approved yet</h1>
      </div>
    );
  }
  const receivedItem=async(reqId)=>{
    try{
        const res=await axiosInstance.post('/request/complete', {reqId}, {headers:{Authorization:`Beared ${localStorage.getItem('token')}`}})
        console.log(res)
    }catch(err){
        console.log(err)
    }
  }
  return (
    <div>
      <NavBar />

      <body>
        <div className=" bg-gray-100 min-h-screen pt-20">
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto  justify-center px-6 md:flex md:space-x-6 ">
            <div className="rounded-lg md:w-2/3">
              {approvedRequests.map((request, index) => (
                <div
                key={index}
                className="flex flex-wrap justify-between mb-6 gap-x-6 gap-y-6 rounded-lg bg-white p-6 shadow-md sm:flex-nowrap min-w-full"
              >
                <div className="flex flex-col items-center sm:w-1/3">
                  <img
                    src={request.itemOne.image}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="text-center sm:mt-4">
                    <h2 className="text-lg font-bold text-gray-900">
                      {request.itemOne.title}
                    </h2>
                    <p className="mt-1 text-xs text-gray-700">
                      {request.itemOne.description}
                    </p>
                    <p className="text-lg mt-2">
                      ₹{request.itemOne.originalCost}
                    </p>
                  </div>
                </div>
              
                <div className="flex flex-col items-center min-h-max justify-center sm:w-1/3">
                  <p className="text-lg">
                    <span className="font-bold">Status: </span> 
                    {request.completedByOne ? (request.completedByTwo ? "Exchange Completed" : "Confirmed by one") : "Not completed"}
                  </p>
                  <button
                    disabled={request.completedByOne === user?.email}
                    onClick={() => receivedItem(request._id)}
                    className="mt-6 w-full px-4 py-1.5 rounded-md bg-purple-700 font-medium text-blue-50 hover:bg-purple-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Received Item
                  </button>
                </div>
              
                
                <div className="flex flex-col items-center sm:w-1/3">
                {request.itemTwo&&(
                    <div>
                  <img
                    src={request.itemTwo.image}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="text-center sm:mt-4">
                    <h2 className="text-lg font-bold text-gray-900">
                      {request.itemTwo.title}
                    </h2>
                    <p className="mt-1 text-xs text-gray-700">
                      {request.itemTwo.description}
                    </p>
                    <p className="text-lg mt-2">
                      ₹{request.itemTwo.originalCost}
                    </p>
                  </div>
                  </div>
            )}
            {request.cash && (<div className="">
                <p className={`${request.itemTwo?"text-lg":"text-3xl"}`}><span className="font-bold">Cash: </span>₹{request.cash}</p>
            </div>)}
            </div>
              </div>
              
              ))}
            </div>
            {/* <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">$129.99</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">$4.99</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                Check out
              </button>
            </div> */}
          </div>
        </div>
      </body>
    </div>
  );
};

export default ApprovedRequests;
