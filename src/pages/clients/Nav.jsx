import { React, useState } from "react";
import ModalLogin from "../admin/hotels page/ModalLogin";
import ModalSignUp from "../admin/hotels page/ModalSignUp"
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { ContextLogin } from '../../context/LoginContext';

import { CustomerLoginContext } from "../../context/CustomerLoginContext";
function Nav(props) {
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const { isLogin, setIsLogin } = useContext(CustomerLoginContext);
  const loginData = useContext(ContextLogin);
  const [hidden, setHidden] = useState(true);
  return (
    <div>

      <div class="bg-white shadow-md">
        {/* <!-- Top Navbar --> */}
        <div class="flex items-center justify-between px-6 py-4">
          {/* <!-- Logo --> */}
          <div class="flex items-center">
            <Link to="/">
              <img
                src="https://e7.pngegg.com/pngimages/998/205/png-clipart-airbnb-logo-business-braintree-management-business-text-service.png"
                alt="airbnb logo"
                class="h-8 mr-4"
              />
            </Link>
          </div>
          {/* <!-- Right Menu --> */}
          <div className="flex">
            <div class="flex items-center hover:border rounded-full me-3 p-2">
              <Link to="/bookingpage">
                <button class=" rounded-full  font-semibold  text-sm    me-1">

                  Cho thuê chỗ ở qua Airbnb

                </button></Link>
            </div>
            <div class="flex items-center relative border rounded-full p-1">
              <button onClick={() => setHidden(!hidden)} class="p-1 rounded-full flex justify-center  hover:bg-gray-100 me-1">
                <div className="flex ">
                  <i class="fa-solid fa-bars  p-2 "></i>
                  <div>
                  <img
                    className="w-8 h-8   rounded-full mx-auto"
                    src={isLogin ? isLogin.imgUrl : 'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png'}                   
                  />
                  </div>
                </div>




              </button>
              <div
                className={`text-center absolute top-14 p-5  rounded-xl z-10 bg-gray-100 right-0 shadow-lg ${hidden  ? "hidden" : ""
                  }`}
              >
                <div>
                  <img
                    className="w-10 h-10 rounded-full m-auto"
                    src={isLogin ? isLogin.imgUrl : "https://lpbm.gov.my/www/assets/img/user.png"}
                  
                  />
                </div>
                <h3 className="px-2">{isLogin ? isLogin.nameCustomer : "QuickRoomAccount"}</h3>
                <p className="px-2">{isLogin ? isLogin.id : "QuickRoom@gmail.com"}</p>
                <div onClick={() => setLoginModal(true)} className="flex items-center p-2 hover:bg-gray-500 hover:text-white">
                  <i class="fa-solid fa-user mr-2"></i>
                  <p>{isLogin ? "Account" : "Login"}</p>
                </div>
                <div  onClick={() => { setIsLogin(false); localStorage.setItem("customerLogin", false) }} className="flex items-center p-2 hover:bg-gray-500 hover:text-white">
                  
                  {isLogin ? <i class="fa-solid fa-right-from-bracket mr-2"></i> : <i class="fa-solid fa-message mr-2"></i>}
                  <p>{isLogin ? "Log out" : "Sign Up"}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="search-box flex justify-center mt-3">
          {/* <!-- Search Bar --> */}
          <div class="flex items-center border shadow-xl  mb-4 rounded-full p-3 ">
            <div class="px-4">
              <span className="text-sm  font-semibold">Địa điểm</span>
              <input
                type="text"
                placeholder="Tìm điểm đến"
                class="bg-transparent focus:outline-none w-full text-sm"
              />
            </div>
            <div class="border-l border-gray-300 px-4">
              <span class="text-sm font-semibold">Nhận phòng</span>
              <input
                type="text"
                placeholder="Thêm ngày"
                class="bg-transparent focus:outline-none w-full text-sm"
              />
            </div>
            <div class="border-l border-gray-300 px-4">
              <span class="text-sm font-semibold">Trả phòng</span>
              <input
                type="text"
                placeholder="Thêm ngày"
                class="bg-transparent focus:outline-none w-full text-sm"
              />
            </div>
            <div class="border-l border-gray-300 px-4">
              <span class="text-sm font-semibold">Khách</span>
              <input
                type="text"
                placeholder="Thêm khách"
                class="bg-transparent focus:outline-none w-full text-sm"
              />
            </div>
            <button class="bg-pink-500  hover:bg-black text-white rounded-full p-3">
              <i
                style={{ width: "25px" }}
                className="fa-solid fa-magnifying-glass"
              ></i>
            </button>
          </div>
        </div>
      </div>
      <ModalLogin
        setLoginModal={setLoginModal}
        loginModal={loginModal}
        setHidden={setHidden}
      />
      <ModalSignUp
        setSignUpModal={setSignUpModal}
        signUpModal={signUpModal}
      />
    </div>
  );
}

export default Nav;
