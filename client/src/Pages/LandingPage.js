import React from "react";
import NavBar from "../Component/NavBar";
import { Link } from "react-router-dom";
import Footer from "../Component/Footer";

const LandingPage = () => {
  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;1,100;1,200&display=swap"
        rel="stylesheet"
      />

      <main className="flex flex-col items-center justify-center mt-32 bg-white">
        <NavBar />

        <section className="flex flex-wrap items-center  font-sans px-4 mx-auto w-full lg:max-w-screen-lg sm:max-w-screen-sm md:max-w-screen-md pb-20">
          <div className="px-3 w-full lg:w-2/5">
            <div className="mx-auto mb-8 max-w-lg text-center lg:mx-0 lg:max-w-md lg:text-left">
              <h2 className="mb-4 text-3xl font-bold text-left lg:text-5xl">
                Exclusive Agency For
                <span className="text-5xl text-purple-700 leading-relaxeds">
                  {" "}
                  Barter System
                </span>
                <br></br>
              </h2>

              
            </div>

            <div className="text-center lg:text-left">
              <Link to="/about-us" className="block visible py-4 px-8 mb-4 text-xs font-semibold tracking-wide leading-none text-white bg-purple-700 hover:bg-purple-400 transition-colors rounded cursor-pointer sm:mr-3 sm:mb-0 sm:inline-block">
                Key Features
              </Link>

              
            </div>
          </div>

          <div className="px-3 mb-12 w-full lg:mb-0 lg:w-3/5">
            <div className="flex justify-center items-center">
            <img src="https://static.vecteezy.com/system/resources/previews/024/975/011/non_2x/flat-style-balance-scale-icon-on-purple-background-vector.jpg"  alt="taraju"></img>
            </div>
          </div>
        </section>

        <section
          className="flex flex-col w-full h-[500px] bg-cover bg-fixed bg-center justify-center items-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?auto=format&fit=crop&w=880&q=80)",
          }}
          // "
          // background-image: url(https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?auto=format&fit=crop&w=880&q=80);
          // "
        >
          <h1 className="text-white text-5xl font-semibold mt-20 mb-10">
            All your desires in one place
          </h1>

          <span className="text-center font-bold my-20 text-white/90">
            <a
              href="https://egoistdeveloper.github.io/twcss-to-sass-playground/"
              target="_blank"
              className="text-white/90 hover:text-white"
            >
              Post your product
            </a>

            <hr className="my-4" />

            <a
              href="https://unsplash.com/photos/8Pm_A-OHJGg"
              target="_blank"
              className="text-white/90 hover:text-white"
            >
              Search for the desired item
            </a>

            <hr className="my-4" />

            <p>
              <a
                href="https://github.com/EgoistDeveloper/my-tailwind-components/blob/main/src/templates/parallax-landing-page.html"
                target="_blank"
                className="text-white/90 hover:text-white"
              >
                Exchange with others
              </a>
              
            </p>
          </span>
        </section>

        
      </main>

      <Footer/>
    </div>
  );
};

export default LandingPage;
