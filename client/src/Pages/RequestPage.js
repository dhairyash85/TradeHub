import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../Component/NavBar";
import axiosInstance from "../Utils/Axios";
const RequestPage = () => {
  const location = useLocation();
  console.log(location);
  const { item } = location.state || {}; // Access the passed state
  const [itemTwo, setItemTwo] = useState(null);
  const [useCash, setUseCash] = useState(false);
  const [cashAmount, setCashAmount] = useState(0);
  // Check if the item exists
  const [isOpen, setIsOpen] = useState(false);

  if (!item) {
    return <div>No item data available</div>;
  }
  const sendRequest = async () => {
    try {
      console.log(itemTwo)
      console.log(cashAmount)
      if(!itemTwo){
        return alert("Please Select atleast on item")
      }
      const options={ itemOne: item }
      // if(itemTwo){
        options.itemTwo=itemTwo
      // }
      if(cashAmount){
        options.cash=cashAmount
      }
      const res=await axiosInstance.post(
        "/request/addRequest",
        options,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log("Error in sending request: ", err);
    }
  };
  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center pt-24">
        <div className="max-w-[720px] mx-auto">
          <div className="relative flex flex-col text-gray-700 bg-white shadow-md shadow-purple-200 bg-clip-border rounded-xl w-96">
            <div className="relative mx-4 mt-4 text-gray-700 bg-white bg-clip-border rounded-xl ">
              <img
                src={item.image}
                alt="card-image"
                className="object-cover w-fit  h-fit"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  {item.title}
                </p>
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  ₹{item.originalCost}
                </p>
              </div>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                <span className="font-bold">Category:</span>{" "}
                {item.category[0].toUpperCase() + item.category.slice(1)}
              </p>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                {item.description}
              </p>
            </div>
            <div className="p-6 pt-0">
              <button
                className="align-middle bg-purple-700 text-white hover:bg-purple-400 select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                type="button"
                onClick={() => setIsOpen(true)}
              >
                Exchange
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <Popup
          setIsOpen={setIsOpen}
          setItemTwo={setItemTwo}
          sendRequest={sendRequest}
          useCash={useCash}
          setUseCash={setUseCash}
          cashAmount={cashAmount}
          setCashAmount={setCashAmount}
        />
      )}
    </div>
  );
};

const Popup = ({
  setIsOpen,
  setItemTwo,
  sendRequest,
  useCash,
  setUseCash,
  cashAmount,
  setCashAmount,
}) => {
  const [selected, setSelected] = useState();
  const [listing, setListing] = useState([]);
  useEffect(() => {
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
    fetchListings();
  }, []);
  const handleOnClick = async () => {
    console.log("clicked");
    if (!setItemTwo) {
      return alert("Please select an item to exchange");
    }
    const res = await sendRequest();
    console.log(res);
  };
  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0  outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      id="modal-id"
    >
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />
      {listing.length != 0 ? (
        <>
          <div className="absolute bg-black opacity-80 inset-0 -z-10"></div>
          <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
            <div className="">
              <div className="text-center p-5 flex-auto justify-center">
                <h2 className="text-xl font-bold py-4 ">
                  Which item do you wanna exchange with?
                </h2>
                <p className="text-sm text-gray-500 px-8">
                  Please select the item you want to send in exchange
                </p>
              </div>
              {listing?.map((item, key) => {
                return (
                  <div
                    onClick={() => {
                      setSelected(key);
                      setItemTwo(item);
                    }}
                    key={key}
                    className={`flex flex-col items-start justify-center rounded-2xl ${
                      selected == key ? "bg-purple-400" : "bg-gray-200"
                    } m-4 cursor-pointer bg-clip-border border-gray-400 px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none`}
                  >
                    <p className="text-sm text-gray-600 px-3">Product</p>
                    <div className="flex justify-between min-w-full px-3">
                      <p className="text-base font-medium text-navy-700 dark:text-gray">
                        {item.title}
                      </p>
                      <p className="text-base font-medium text-navy-700 dark:text-gray">
                        ₹{item.originalCost}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="inline-flex items-center ">
                <label
                  className="relative flex cursor-pointer items-center rounded-full p-3"
                  htmlFor="checkbox"
                  data-ripple-dark="true"
                >
                  <input
                    type="checkbox"
                    value={useCash}
                    onClick={() => {
                      setUseCash(!useCash);
                    }}
                    className={`before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity ${
                      useCash ? "border-purple-700 bg-purple-700" : ""
                    }  hover:before:opacity-10`}
                    id="checkbox"
                    checked
                  />
                  <div
                    className={`pointer-events-none ${
                      useCash ? "" : "hidden"
                    } absolute translate-x-0.5   text-white opacity-0 transition-opacity peer-checked:opacity-100`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="ml-1">
                    <h1> Use Cash?</h1>
                  </span>
                </label>
              </div>
              {useCash && (<div>
                <label htmlFor="cash">Cash</label>
                <input type="number" value={cashAmount} onChange={(e)=>{setCashAmount(e.target.value)}} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
              </div>)}
              <div className="p-3  mt-2 text-center space-x-4 md:block">
                <button
                  onClick={() => setIsOpen(false)}
                  placeholder="Cash"
                  id="cash"
                  name="cash"
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleOnClick()}
                  className="mb-2 md:mb-0 bg-purple-700 border border-purple-700 hover:bg-purple-400 transition-colors  px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg"
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
            <div className="">
              <div className="text-center p-5 flex-auto justify-center">
                <h2 className="text-xl font-bold py-4 ">No Items Available</h2>
              </div>
            </div>
            <div className="p-3  mt-2 text-center space-x-4 md:block">
              <button
                onClick={() => setIsOpen(false)}
                className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RequestPage;
