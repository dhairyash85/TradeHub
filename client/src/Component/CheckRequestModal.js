import React, { useState } from "react";
import { FaRightLeft } from "react-icons/fa6";
import axiosInstance from "../Utils/Axios";
const CheckRequestModal = ({ isOpen, setIsOpen, itemOne, itemTwo, cash, request }) => {
  console.log("clicked")
    const [isExchanged, setIsExchanged]=useState(false)
    // if(!itemOne){
    //     setIsOpen(false)
    // }
    const approveRequest=async()=>{
        try{
            console.log('click')
            const res=await axiosInstance.post('/request/approve', {reqId: request._id})

            console.log(res)
            if(res.data.success){
              setIsExchanged(true)
            }
        }catch(err){
            console.log(err)
        }
    }
  return (
<>
      {(itemOne) && (
          <div
          className={`min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover transform transition-all 
            duration-1000 ease-out  ${isOpen?"opacity-100 translate-y-0 ":"opacity-0 translate-y-4 hidden"}`}
          id="modal-id"
          >
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
        />
      <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div className="w-max  mx-12 p-5 relative  my-auto rounded-xl shadow-lg  bg-white ">
        <div className="">
          <div className="text-center p-5 flex-auto justify-center">
            <h2 className="text-xl font-bold py-4 ">
              Do you want to exchange {itemOne.title}?
            </h2>
          </div>
          <div classNameName="min-w-max  mx-10 flex justify-center items-center">
            <div className="flex justify-between min-w-fit gap-10  items-center mb-10">
              {/* <div className="max-w-[720px] mx-auto"> */}
                <div className={`relative  flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 transition-all ease-in ${isExchanged? "translate-x-[500px]":""}`}>
                  <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl flex-justify-center ">
                    <img
                      src={`${itemOne.image[0]}`}
                      alt="card-image"
                      className="object-cover w-fit h-fit"
                      />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        {itemOne.title}
                      </p>
                      <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        ₹{itemOne.originalCost}
                      </p>
                    </div>
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                      <span className="font-bold">Category:</span> {itemOne.category[0].toUpperCase()+itemOne.category.slice(1)}
                    </p>
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                      {itemOne.description}
                    </p>
                  </div>
                </div>
                <button onClick={()=>approveRequest()} className="text-purple-700  hover:text-purple-400 transition-colors">

                <FaRightLeft size={40} cl />
                </button>
                <div className={`relative  flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 transition-all ease-in ${isExchanged? "-translate-x-[500px] ":""}`}>
                {itemTwo && <>
                  <div className=" mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl flex justify-center ">
                    <img
                      src={`${itemTwo.image[0]}`}
                      alt="card-image"
                      className="object-cover w-fit h-fit"
                      />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        {itemTwo.title}
                      </p>
                      <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        ₹{itemTwo.originalCost}
                      </p>
                    </div>
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                      <span className="font-bold">Category:</span> {itemTwo.category[0].toUpperCase()+itemTwo.category.slice(1)}
                    </p>
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                      {itemTwo.description}
                    </p>
                  </div>
                      </>
                }
                {cash && 
                <h1 className={`${itemTwo?"translate-y-8":""}`}><span className={`font-bold `}>Cash:</span> ₹{cash}</h1>
              }
              </div>
              {/* </div> */}
            </div>
          </div>
          <div className="p-3  mt-2 text-center space-x-4 md:block">
            <button
              onClick={() => setIsOpen(false)}
              className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-[500px] hover:shadow-lg hover:bg-gray-100"
              >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
      )}
    
      </>
  );
};

export default CheckRequestModal;
