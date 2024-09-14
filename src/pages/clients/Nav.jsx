import React from "react";

function Nav(props) {
  return (
    <div>
      <div class="bg-white shadow-md">
        {/* <!-- Top Navbar --> */}
        <div class="flex items-center justify-between px-6 py-4">
          {/* <!-- Logo --> */}
          <div class="flex items-center">
            <img
              src="https://e7.pngegg.com/pngimages/998/205/png-clipart-airbnb-logo-business-braintree-management-business-text-service.png"
              alt="airbnb logo"
              class="h-8 mr-4"
            />
          </div>
          {/* <!-- Right Menu --> */}
          <div class="flex items-center border rounded-full p-1">
            <button class="p-1 rounded-full flex justify-center  hover:bg-gray-100 me-1">
              <div>
                <i class="fa-solid fa-bars me-3 p-2 "></i>
              </div>
              <div class="h-8 w-8 rounded-full bg-gray-300"></div>
            </button>
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
    </div>
  );
}

export default Nav;
