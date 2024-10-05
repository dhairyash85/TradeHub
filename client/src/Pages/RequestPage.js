import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../Component/NavBar";
import axiosInstance from "../Utils/Axios";
const RequestPage = () => {
    const location = useLocation();
    console.log(location);
    const { item } = location.state || {};  // Access the passed state
    const [itemTwo, setItemTwo]=useState(null)
    // Check if the item exists
    const [isOpen, setIsOpen]=useState(false)

    if (!item) {
      return <div>No item data available</div>;
    }
    const sendRequest=async()=>{
      try{
        axiosInstance.post('/request/addRequest',{itemOne: item, itemTwo:itemTwo}, {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
      }catch(err){
        console.log("Error in sending request: ", err)
      }
    }
  return (
    <div>
      <NavBar/>
      <div class="flex justify-center items-center pt-24">
        <div class="max-w-[720px] mx-auto">
          <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
            <div class="relative mx-4 mt-4 text-gray-700 bg-white bg-clip-border rounded-xl ">
              <img
                src={item.image}
                alt="card-image"
                class="object-cover w-fit  h-fit"
              />
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  {item.title}
                </p>
                <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                ₹{item.originalCost}
                </p>
              </div>
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                {item.description}
              </p>
            </div>
            <div class="p-6 pt-0">
              <button
                class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                type="button"
                onClick={()=>setIsOpen(true)}
              >
                Exchange
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <Popup setIsOpen={setIsOpen} setItemTwo={setItemTwo} sendRequest={sendRequest}/>}
    </div>
  );
};

const Popup=({setIsOpen, setItemTwo, sendRequest})=>{
  const [selected, setSelected]=useState()
  const[listing, setListing]=useState([])
  useEffect(()=>{
    const fetchListings=async()=>{
        const res=await axiosInstance.post('/item/user',
            {},
            {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            console.log(res)
            setListing(res.data.item)
    }
    fetchListings()
  },[])
  const handleOnClick=async()=>{
    console.log("clicked")
    if(!setItemTwo){
      return alert('Please select an item to exchange')
    }
    const res=await sendRequest()
    console.log(res)
  }
  return(
<div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"   id="modal-id">
<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"/>
   	{listing.length!=0?(
    <>
      <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
    <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
      <div class="">
        <div class="text-center p-5 flex-auto justify-center">
                
                        <h2 class="text-xl font-bold py-4 ">Which item do you wanna exchange with?</h2>
                        <p class="text-sm text-gray-500 px-8">Please select the item you want to send in exchange</p>    
        </div>
        {listing?.map((item, key)=>{
          return (<div onClick={()=>{
            setSelected(key)
            setItemTwo(item)
            }} key={key} className={`flex flex-col items-start justify-center rounded-2xl ${selected==key? 'bg-purple-400':'bg-gray-200'} m-4 cursor-pointer bg-clip-border border-gray-400 px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none`}>
          <p className="text-sm text-gray-600 px-3">Product</p>
          <div className="flex justify-between min-w-full px-3">
          <p className="text-base font-medium text-navy-700 dark:text-gray">
            {item.title}
          </p>
          <p className="text-base font-medium text-navy-700 dark:text-gray">
          ₹{item.originalCost}
          </p>
          </div>
        </div>)
        })}
        <div class="p-3  mt-2 text-center space-x-4 md:block">
            <button onClick={()=>setIsOpen(false)} class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                Cancel
            </button>
            <button onClick={()=>handleOnClick()} class="mb-2 md:mb-0 bg-purple-700 border border-purple-700 hover:bg-purple-400 transition-colors  px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg">Send Request</button>
        </div>
      </div>
    </div>
    </>):
    (<>
    <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
    <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
    <div class="">
        <div class="text-center p-5 flex-auto justify-center">
                
                        <h2 class="text-xl font-bold py-4 ">No Items Available</h2>
        </div>
        </div>
        <div class="p-3  mt-2 text-center space-x-4 md:block">
            <button onClick={()=>setIsOpen(false)} class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                Cancel
            </button>
        </div>
    </div>
    </>)}
  </div>
  )
}

export default RequestPage;
