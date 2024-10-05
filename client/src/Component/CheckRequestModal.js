import React from "react";
import { FaRightLeft } from "react-icons/fa6";
import axiosInstance from "../Utils/Axios";
const CheckRequestModal = ({ setIsOpen, itemOne, itemTwo, request }) => {
    if(!itemOne && !itemTwo){
        setIsOpen(false)
    }
    const approveRequest=async()=>{
        try{
            console.log('click')
            const res=await axiosInstance.post('/request/approve', {reqId: request._id})
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }
  return (
<>
      {(itemOne && itemTwo) && (
          <div
          class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
          id="modal-id"
          >
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
        />
      <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div class="w-max  mx-12 p-5 relative  my-auto rounded-xl shadow-lg  bg-white ">
        <div class="">
          <div class="text-center p-5 flex-auto justify-center">
            <h2 class="text-xl font-bold py-4 ">
              Do you want to exchange {itemOne.title} with {itemTwo.title}?
            </h2>
          </div>
          <div className="min-w-max  mx-10 flex justify-center items-center">
            <div class="flex justify-between min-w-fit gap-10  items-center mb-10">
              {/* <div class="max-w-[720px] mx-auto"> */}
                <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                  <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl ">
                    <img
                      src={`${itemOne.image[0]}`}
                      alt="card-image"
                      class="object-cover w-fit h-fit"
                      />
                  </div>
                  <div class="p-6">
                    <div class="flex items-center justify-between mb-2">
                      <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        {itemOne.title}
                      </p>
                      <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        ₹{itemOne.originalCost}
                      </p>
                    </div>
                    <p class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                      {itemOne.description}
                    </p>
                  </div>
                </div>
                <button onClick={()=>approveRequest()} className=" text-purple-700 hover:text-purple-400 transition-colors">

                <FaRightLeft size={40}  />
                </button>
                <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                  <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl ">
                    <img
                      src={`${itemTwo.image[0]}`}
                      alt="card-image"
                      class="object-cover w-fit h-fit"
                      />
                  </div>
                  <div class="p-6">
                    <div class="flex items-center justify-between mb-2">
                      <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        {itemTwo.title}
                      </p>
                      <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        ₹{itemTwo.originalCost}
                      </p>
                    </div>
                    <p class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                      {itemTwo.description}
                    </p>
                  </div>
                </div>
              {/* </div> */}
            </div>
          </div>
          <div class="p-3  mt-2 text-center space-x-4 md:block">
            <button
              onClick={() => setIsOpen(false)}
              class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
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
