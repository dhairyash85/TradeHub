import React from "react";
import { Link } from "react-router-dom";

const Card = (item) => {
  return (
    <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                <div
                  className="flex items-end justify-end h-56 w-full bg-cover"
                  style={{
                    backgroundImage:
                      `url("${item.item.image}")`,
                  }}
                >
                  <Link to="/request" state={{item:item.item}}  className="p-2 rounded-full bg-purple-600 text-white mx-5 -mb-4 hover:bg-purple-500 focus:outline-none focus:bg-purple-500">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </Link>
                </div>
                <div className="px-5 py-3">
                  <h3 className="text-gray-700 uppercase">{item.item.title}</h3>
                  <h3 className="text-gray-500 mt-2">{item.item.category[0].toUpperCase()+item.item.category.slice(1)}</h3>
                  <span className="text-gray-500 mt-2">Original Cost- ₹{item.item.originalCost}</span>
                </div>
              </div>
  );
};

export default Card;
