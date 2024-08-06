import React, { useState } from "react";
import NavBar from "../Component/NavBar";
import Card from "../Component/Card";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  if(!localStorage.getItem("token")){
    Navigate("/")
  }
  return (
    <div className="bg-white">
      <header>
        <div className="container mx-auto px-6 py-3">
          
         <NavBar/>
          <div className=" mt-16 sticky  max-w-lg mx-auto">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <input
              className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
      </header>
      <div
        className={`translate-x-full ease-in fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300`}
      >
        <hr className="my-3" />
        <div className="flex justify-between mt-6">
          <div className="flex">
            <img
              className="h-20 w-20 object-cover rounded"
              src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"
              alt=""
            />
            <div className="mx-3">
              <h3 className="text-sm text-gray-600">Mac Book Pro</h3>
              <div className="flex items-center mt-2">
                <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M15 12H9m6 0a6 6 0 0 0-12 0 6 6 0 0 0 12 0z"></path>
                  </svg>
                </button>
                <span className="text-gray-700 mx-2">2</span>
                <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M15 12H9m0 0a6 6 0 0 0 12 0 6 6 0 0 0-12 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <span className="text-gray-600">20$</span>
        </div>
        <div className="mt-4">
          <label className="text-gray-700" htmlFor="count">
            Quantity
          </label>
          <div className="flex items-center mt-1">
            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 12H9m6 0a6 6 0 0 0-12 0 6 6 0 0 0 12 0z"></path>
              </svg>
            </button>
            <span className="text-gray-700 mx-2">2</span>
            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 12H9m0 0a6 6 0 0 0-12 0 6 6 0 0 0 12 0z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-6">
          <label className="text-sm text-gray-700" htmlFor="promo">
            Promo Code
          </label>
          <input
            className="mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded focus:border-blue-500 focus:outline-none focus:shadow-outline"
            type="text"
          />
        </div>
        <a
          className="flex items-center justify-center mt-6 px-3 py-2 text-sm text-white bg-gray-800 rounded hover:bg-gray-700 focus:outline-none"
          href="#"
        >
          <span>Checkout</span>
          <svg
            className="h-5 w-5 mx-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17 9l-5 5-5-5"></path>
          </svg>
        </a>
      </div>
      {/* url('https://images.unsplash.com/photo-1577655197620-704858b270ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=144')" */}
      <main className="my-8">
        <div className="container mx-auto px-6">
          <div className="relative h-64 rounded-md overflow-hidden group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1577655197620-704858b270ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=144')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="px-10 max-w-xl relative z-10">
                <h2 className="text-2xl text-white font-semibold">
                  Sport Shoes
                </h2>
                <p className="mt-2 text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Tempore facere provident molestias ipsam sint voluptatum
                  pariatur.
                </p>
                <a
                  href="#"
                  className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none"
                >
                  <span>Trade Now</span>
                  <svg
                    className="h-5 w-5 ml-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17 9l-5 5-5-5"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div class="md:flex mt-8 md:-mx-4">
            <div class="relative w-full h-64 md:mx-4 rounded-md overflow-hidden group md:w-1/2">
              <div
                class="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80')",
                }}
              ></div>
              <div class="relative bg-gray-900 bg-opacity-50 flex items-center h-full">
                <div class="px-10 max-w-xl">
                  <h2 class="text-2xl text-white font-semibold">Back Pack</h2>
                  <p class="mt-2 text-gray-400">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Tempore facere provident molestias ipsam sint voluptatum
                    pariatur.
                  </p>
                  <button class="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                    <span>Trade Now</span>
                    <svg
                      class="h-5 w-5 mx-2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="relative w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden group md:mt-0 md:w-1/2">
              <div
                class="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80')",
                }}
              ></div>
              <div class="relative bg-gray-900 bg-opacity-50 flex items-center h-full">
                <div class="px-10 max-w-xl">
                  <h2 class="text-2xl text-white font-semibold">Gaming Consoles</h2>
                  <p class="mt-2 text-gray-400">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Tempore facere provident molestias ipsam sint voluptatum
                    pariatur.
                  </p>
                  <button class="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                    <span>Trade Now</span>
                    <svg
                      class="h-5 w-5 mx-2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
            </div>
          </div>
          <div className="mt-16">
            <h3 className="text-gray-600 text-2xl font-medium">Products</h3>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card/>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
