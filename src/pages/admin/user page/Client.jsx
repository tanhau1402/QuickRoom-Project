import React from "react";
function Client(props) {
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
                <div><i class="fa-solid fa-bars me-3 p-2 "></i></div>
                <div class="h-8 w-8 rounded-full bg-gray-300"></div>
              </button>
             
            
          </div>
        </div>
      </div>
      <div className="search-box flex justify-center mt-3">
        {/* <!-- Search Bar --> */}
        <div class="flex items-center border shadow-xl   rounded-full p-3 ">
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
      <div className="list-amenities flex text-center justify-center mt-5 p-5">
        <div className="item-1 me-2 hover:text-white w-32 p-3 rounded-bl-2xl rounded-tl-2xl hover:bg-gray-600">
          <i class="fa-solid text-2xl fa-dumbbell"></i>
          <p className="text-gray-500 font-extralight">Gym</p>
        </div>
        <div className="item-2 me-2  hover:text-white w-32 p-3 hover:bg-gray-600">
          <i class="fa-solid text-2xl fa-bicycle"></i>
          <p className="text-gray-500 font-extralight">Đạp xe</p>
        </div>
        <div className="item-3  me-2 hover:text-white w-32 p-3  hover:bg-gray-600">
          <i class="fa-solid text-2xl fa-person-snowboarding"></i>
          <p className="text-gray-500  font-extralight">Trượt tuyết</p>
        </div>
        <div className="item-4 me-2 hover:text-white w-32 p-3 hover:bg-gray-600">
          <i class="fa-solid text-2xl fa-volleyball"></i>
          <p className="text-gray-500  font-extralight">Bóng chuyền</p>
        </div>
        <div className="item-5 me-2  hover:text-white p-3 w-32   hover:bg-gray-600">
          <i class="fa-solid text-2xl fa-golf-ball-tee"></i>
          <p className="text-gray-500 font-extralight">Chơi golf</p>
        </div>
        <div className="item-6   hover:text-white p-3  w-32 rounded-br-2xl rounded-tr-2xl hover:bg-gray-600">
          <i class="fa-solid text-2xl fa-table-tennis-paddle-ball"></i>
          <p className="text-gray-500 font-extralight">Bóng bàn</p>
        </div>
      </div>
    </div>
  );
}

export default Client;
