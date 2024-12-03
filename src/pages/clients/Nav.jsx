import { React, useState } from "react";
import ModalLogin from "../admin/hotels page/ModalLogin";
import ModalSignUp from "../admin/hotels page/ModalSignUp";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CustomerLoginContext } from "../../context/CustomerLoginContext";
import { ContextSearchValue } from "../../context/SearchValueContext";
function Nav() {
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const { isLogin, setIsLogin } = useContext(CustomerLoginContext);
  const [hidden, setHidden] = useState(true);
  const {inputValue,setInputValue} = useContext(ContextSearchValue);

  const handleInput = (event) => {
    const { name, value } = event.target;
    const updatedValue = { ...inputValue, [name]: value };
    setInputValue(updatedValue);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
      <div
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2016/07/30/19/47/banner-1557841_1280.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="bg-gray-100 flex flex-col justify-center  rounded-bl-3xl rounded-br-3xl"
      >
        {/* Top Navbar */}
        <div className="flex   items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="sm:flex  items-center">
            <Link to="/">
              <img
                src="https://i.pinimg.com/originals/ce/c0/5a/cec05a890ea942b3cd3f946f2e2c6433.png"
                alt="airbnb logo"
                className="h-24 mr-4 w-[125px] md:w-[125px] lg:w-[125px]"
              />
            </Link>
          </div>
          {/* Right Menu */}
          <div className="sm:flex  items-center">
            <Link to="/bookingpage" className="  sm:block ">
              <button className="rounded-full  hover:border-purple-700 hover:bg-purple-100 p-2 px-4 font-semibold text-sm mr-3 transition-colors duration-300 ease-in-out hover:text-purple-700">
                Cho thuê chỗ ở qua Airbnb
              </button>

            </Link>
            <div className="sm:flex items-center w-20 relative border rounded-full p-1">
              <button
                onClick={() => setHidden(!hidden)}
                className="p-1 rounded-full flex justify-center hover:bg-gray-100"
              >
                <div className="flex">
                  <i className="fa-solid fa-bars p-2"></i>
                  <img
                    className="w-8 h-8 rounded-full mx-auto"
                    src={
                      isLogin
                        ? isLogin.imgUrl
                        : "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                    }
                    alt="user icon"
                  />
                </div>
              </button>
              <div
                className={`text-center absolute top-14 p-5 rounded-xl z-10 bg-gray-100 right-0 shadow-lg ${hidden ? "hidden" : ""
                  }`}
              >
                <div>
                  <img
                    className="w-10 h-10 rounded-full m-auto"
                    src={
                      isLogin
                        ? isLogin.imgUrl
                        : "https://lpbm.gov.my/www/assets/img/user.png"
                    }
                  />
                </div>
                <h3 className="px-2">
                  <div className="block">{isLogin ? isLogin.nameCustomer : "QuickRoomAccount"}</div>
                </h3>
                <p className="px-2">
                  {isLogin ? isLogin.id : "QuickRoom@gmail.com"}
                </p>

                <div>
                  {!isLogin ? (
                    <>
                      <div
                        onClick={() => setLoginModal(true)}
                        className="flex items-center p-2 hover:bg-gray-500 hover:text-white"
                      >
                        <i className="fa-solid fa-user mr-2"></i>
                        <p>Login</p>
                      </div>
                      <div
                        onClick={() => setSignUpModal(true)}
                        className="flex items-center p-2 hover:bg-gray-500 hover:text-white"
                      >
                        <i className="fa-solid fa-right-from-bracket mr-2"></i>
                        <p>Sign Up</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/listroom"
                        className="flex items-center p-2 hover:bg-gray-500 hover:text-white"
                      >
                        <i className="fa-solid fa-user mr-2"></i>
                        <p>List room</p>
                      </Link>
                      <Link to='/account' className="flex items-center p-2 hover:bg-gray-500 hover:text-white">
                      <i class="fa-regular fa-user mr-2"></i>
                        <p>Account</p>
                      </Link>
                      <div
                        onClick={() => {
                          setIsLogin(false);
                          localStorage.setItem("customerLogin", false);
                        }}
                        className="flex items-center p-2 hover:bg-gray-500 hover:text-white"
                      >
                        <i className="fa-solid fa-sign-out mr-2"></i>
                        <p>Log out</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="search-box flex p-4 justify-center mt-3">
          {/* Search Bar */}
          <div className="sm:flex flex flex-col sm:rounded-full rounded-xl    sm:flex-row sm:items-center border border-pink-800 bg-white shadow-xl mb-4  p-3 sm:w-full   md:w-auto">
            <div className="px-4">
              <span className="text-sm font-semibold">Location</span>
              <input
                type="text"
                placeholder="find location"
                className="bg-transparent focus:outline-none w-full text-sm"
                onChange={handleInput}
                name="location"
              />
            </div>
            <div className="sm:border-l border-gray-300 px-4 mt-3 sm:mt-0">
              <span className="text-sm font-semibold">Check in</span>
              <input
                type="date"
                className="bg-transparent focus:outline-none w-full text-sm"
                onChange={handleInput}
                name="checkin"
              />
            </div>
            <div className="sm:border-l border-gray-300 px-4 mt-3 sm:mt-0">
              <span className="text-sm font-semibold">Check out</span>
              <input
                type="date"
                className="bg-transparent focus:outline-none w-full text-sm"
                onChange={handleInput}
                name="checkout"
              />
            </div>
            <div className="sm:border-l border-gray-300 px-4 mt-3 sm:mt-0">
              <span className="text-sm font-semibold">Guests</span>
              <input
                type="number"
                className="bg-transparent focus:outline-none w-full text-sm"
                placeholder="number of guest"
                onChange={handleInput}
                name="guests"
              />
            </div>
            <button className="bg-pink-500  hover:bg-black text-white rounded-full p-3 mt-3 sm:mt-0">
              <i className="fa-solid fa-magnifying-glass" style={{ width: "25px" }}></i>
            </button>
          </div>
        </div>
      </div>
      <hr className="mt-2" />
      <ModalLogin
        setLoginModal={setLoginModal}
        loginModal={loginModal}
        setHidden={setHidden}
      />
      <ModalSignUp setSignUpModal={setSignUpModal} signUpModal={signUpModal} />
    </div>
  );
}

export default Nav;
