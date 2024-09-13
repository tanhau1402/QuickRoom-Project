import { grey } from "@mui/material/colors";
import React, { useState } from "react";
function Client(props) {
  const [show, setShow] = useState(false);
  function showData(dataId) {
    // Hide all data sections first
    document.querySelectorAll(".data-section").forEach((section) => {
      section.classList.add("hidden");
    });
    // Show the selected data section
    document.getElementById(dataId).classList.remove("hidden");
  }
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
      <div className="list-amenities flex text-center justify-center  border-t mt-5 p-2">
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
      <div className="main p-5">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          <div class=" bg-white">
            {/* <!-- Image Section --> */}
            <img
              className=" aspect-square rounded-xl"
              src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/4f7a276e-9995-4b32-bda6-300de0619b25.png?im_w=1440&im_q=highq"
              alt="Room Image"
            />

            {/* <!-- Content Section --> */}
            <div class="pt-3">
              <p>Ở trong ngôi nhà Purple Rain của Prince</p>
              <p class="text-sm text-gray-600">
                Chủ nhà/Người tổ chức: Wendy và Lisa
              </p>
              <p class="text-sm">Nhận đặt phòng từ tháng 9</p>
            </div>
          </div>
          <div class=" bg-white">
            {/* <!-- Image Section --> */}
            <img
              className=" aspect-square rounded-xl"
              src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/4f7a276e-9995-4b32-bda6-300de0619b25.png?im_w=1440&im_q=highq"
              alt="Room Image"
            />

            {/* <!-- Content Section --> */}
            <div class="pt-3">
              <p>Ở trong ngôi nhà Purple Rain của Prince</p>
              <p class="text-sm text-gray-600">
                Chủ nhà/Người tổ chức: Wendy và Lisa
              </p>
              <p class="text-sm">Nhận đặt phòng từ tháng 9</p>
            </div>
          </div>
          <div class=" bg-white">
            {/* <!-- Image Section --> */}
            <img
              className=" aspect-square rounded-xl"
              src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/4f7a276e-9995-4b32-bda6-300de0619b25.png?im_w=1440&im_q=highq"
              alt="Room Image"
            />

            {/* <!-- Content Section --> */}
            <div class="pt-3">
              <p>Ở trong ngôi nhà Purple Rain của Prince</p>
              <p class="text-sm text-gray-600">
                Chủ nhà/Người tổ chức: Wendy và Lisa
              </p>
              <p class="text-sm">Nhận đặt phòng từ tháng 9</p>
            </div>
          </div>
          <div class=" bg-white">
            {/* <!-- Image Section --> */}
            <img
              className=" aspect-square rounded-xl"
              src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/4f7a276e-9995-4b32-bda6-300de0619b25.png?im_w=1440&im_q=highq"
              alt="Room Image"
            />

            {/* <!-- Content Section --> */}
            <div class="pt-3">
              <p>Ở trong ngôi nhà Purple Rain của Prince</p>
              <p class="text-sm text-gray-600">
                Chủ nhà/Người tổ chức: Wendy và Lisa
              </p>
              <p class="text-sm">Nhận đặt phòng từ tháng 9</p>
            </div>
          </div>
          <div class=" bg-white">
            {/* <!-- Image Section --> */}
            <img
              className=" aspect-square rounded-xl"
              src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/4f7a276e-9995-4b32-bda6-300de0619b25.png?im_w=1440&im_q=highq"
              alt="Room Image"
            />

            {/* <!-- Content Section --> */}
            <div class="pt-3">
              <p>Ở trong ngôi nhà Purple Rain của Prince</p>
              <p class="text-sm text-gray-600">
                Chủ nhà/Người tổ chức: Wendy và Lisa
              </p>
              <p class="text-sm">Nhận đặt phòng từ tháng 9</p>
            </div>
          </div>
          <div class=" bg-white">
            {/* <!-- Image Section --> */}
            <img
              className=" aspect-square rounded-xl"
              src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/4f7a276e-9995-4b32-bda6-300de0619b25.png?im_w=1440&im_q=highq"
              alt="Room Image"
            />

            {/* <!-- Content Section --> */}
            <div class="pt-3">
              <p>Ở trong ngôi nhà Purple Rain của Prince</p>
              <p class="text-sm text-gray-600">
                Chủ nhà/Người tổ chức: Wendy và Lisa
              </p>
              <p class="text-sm">Nhận đặt phòng từ tháng 9</p>
            </div>
          </div>
          <div class=" bg-white">
            {/* <!-- Image Section --> */}
            <img
              className=" aspect-square rounded-xl"
              src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/4f7a276e-9995-4b32-bda6-300de0619b25.png?im_w=1440&im_q=highq"
              alt="Room Image"
            />

            {/* <!-- Content Section --> */}
            <div class="pt-3">
              <p>Ở trong ngôi nhà Purple Rain của Prince</p>
              <p class="text-sm text-gray-600">
                Chủ nhà/Người tổ chức: Wendy và Lisa
              </p>
              <p class="text-sm">Nhận đặt phòng từ tháng 9</p>
            </div>
          </div>
          <div class=" bg-white">
            {/* <!-- Image Section --> */}
            <img
              className=" aspect-square rounded-xl"
              src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/4f7a276e-9995-4b32-bda6-300de0619b25.png?im_w=1440&im_q=highq"
              alt="Room Image"
            />

            {/* <!-- Content Section --> */}
            <div class="pt-3">
              <p>Ở trong ngôi nhà Purple Rain của Prince</p>
              <p class="text-sm text-gray-600">
                Chủ nhà/Người tổ chức: Wendy và Lisa
              </p>
              <p class="text-sm">Nhận đặt phòng từ tháng 9</p>
            </div>
          </div>
        </div>
      </div>
      <div className="main-bottom p-5 ">
        <p className="text-xl font-medium p-3">
          Nguồn cảm hứng cho những kì nghỉ sau này
        </p>
        <div className="list_item flex p-3 border-b   ">
          <button onClick={() => showData('data1')}  className="me-4 font-medium text-sm text-gray-500 p-2">
            Phổ biến
          </button>
          <button onClick={() => showData('data2')} className="me-4 font-medium text-sm text-gray-500 p-2">
            Văn hóa và nghệ thuật
          </button>
          <button className="me-4 font-medium text-sm text-gray-500 p-2">
            Ngoài trời
          </button>
          <button className="me-4 font-medium text-sm text-gray-500 p-2">
            Dãy núi
          </button>
          <button className="me-4 font-medium text-sm text-gray-500 p-2">
            Bãi biển
          </button>
          <button className="me-4 font-medium text-sm text-gray-500 p-2">
            Danh mục
          </button>
          <button className="me-4 font-medium text-sm text-gray-500 p-2">
            Những điều nên trải nghiệm
          </button>
        </div>
        <div className="showList">
          <div
            id="data1"
            class="data-section  grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4 border-b"
          >
            <div className="select-1">
            <span className="font-bold">Canmore</span>
            <p className="font-extralight">Nhà cho thuê</p>
            </div>
            <div className="select-1">
            <span className="font-bold">Benalmádena</span>
            <p className="font-extralight">Căn hộ cao cấp</p>
            </div>
            <div className="select-1">
            <span className="font-bold">Đà Nẵng</span>
            <p className="font-extralight">Căn hộ cao cấp</p>
            </div>
            <div className="select-1">
            <span className="font-bold">Hội An</span>
            <p className="font-extralight">Khách sạn view biển</p>
            </div>
            <div className="select-1">
            <span className="font-bold">Nha Trang</span>
            <p className="font-extralight">Khách sạn view biển</p>
            </div>
            <div className="select-1">
            <span className="font-bold">Quy Nhơn</span>
            <p className="font-extralight">Căn hộ view biển</p>
            </div>
            <div className="select-1">
            <span className="font-bold">Hà Nội</span>
            <p className="font-extralight">Khách sạn cao cấp</p>
            </div>
            <div className="select-1">
            <span className="font-bold">Đà Lạt</span>
            <p className="font-extralight">Căn hộ cao cấp</p>
            </div>
            <div className="select-1">
            <span className="font-bold">Vũng Tàu</span>
            <p className="font-extralight">Cabin cho thuê</p>
            </div>
            <div className="select-1">
            <span className="font-bold">Huế</span>
            <p className="font-extralight">Khách sạn</p>
            </div>
            <div className="select-1">
            <span className="font-bold">Bình Định</span>
            <p className="font-extralight">Căn hộ cho thuê</p>
            </div>
            <div className="select-1">
            <span className="font-bold">Sapa</span>
            <p className="font-extralight">Nhà cho thuê</p>
            </div>
            
            
          </div>

          {/* <!-- Data Section 2 --> */}
          <div
            id="data2"
            class="data-section p-4 hidden grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 border-b"
          >
           <div className="select-1">
            <span className="font-bold">Phoenix</span>
            <p className="font-extralight">Căn hộ cao cấp</p>
            </div>
            <div className="select-1">
            <span className="font-bold">Hot Springs</span>
            <p className="font-extralight">Nhà cho thuê</p>
            </div>
            <div className="select-1">
            <span className="font-bold">Los Angeles</span>
            <p className="font-extralight">Khách sạn view biển</p>
            </div>
            <div className="select-1">
            <span className="font-bold">San Diego</span>
            <p className="font-extralight">Căn hộ cao cấp</p>
            </div>
            <div className="select-1">
            <span className="font-bold">San Francisco</span>
            <p className="font-extralight">Căn hộ view biển</p>
            </div>
            <div className="select-1">
            <span className="font-bold">Barcelona</span>
            <p className="font-extralight">Khách sạn view biển</p>
            </div>
            <div className="select-1">
            <span className="font-bold">Paris</span>
            <p className="font-extralight">Căn hộ cao cấp</p>
            </div>
            <div className="select-1">
            <span className="font-bold">London</span>
            <p className="font-extralight">Khách sạn cao cấp</p>
            </div>
            <div className="select-1">
            <span className="font-bold">Scarborough</span>
            <p className="font-extralight">Khách sạn</p>
            </div>
            <div className="select-1">
            <span className="font-bold">Rhodes</span>
            <p className="font-extralight">Cabin cho thuê</p>
            </div>
            <div className="select-1">
            <span className="font-bold">Sherwood Forest</span>
            <p className="font-extralight">Cabin cho thuê</p>
            </div>
            <div className="select-1">
            <span className="font-bold">Washington</span>
            <p className="font-extralight">Cabin cho thuê</p>
            </div>   
          </div>
        </div>
      </div>
      <footer className="flex justify-around p-5 border-b">
        <div className="footer-left ">
          <p className="mb-1 text-sm font-bold">Hỗ trợ</p>
          <p className="mb-1 text-sm font-extralight">Trung tâm trợ giúp</p>
          <p className="mb-1 text-sm font-extralight">AirCover</p>
          <p className="mb-1 text-sm font-extralight">Chống phân biệt đối xử</p>
          <p className="mb-1 text-sm font-extralight">Hỗ trợ người khuyết tật</p>
          <p className="mb-1 text-sm font-extralight">Các tùy chọn hủy</p>
          <p className="mb-1 text-sm font-extralight">Báo cáo lo ngại của khu dân cư</p>
        </div>
        <div className="footer-center ">
          <p className="mb-1 text-sm font-bold">Đón tiếp khách</p>
          <p className="mb-1 text-sm font-extralight">Cho thuê nhà trên Airbnb</p>
          <p className="mb-1 text-sm font-extralight">AirCover cho Chủ nhà</p>
          <p className="mb-1 text-sm font-extralight">Tài nguyên về đón tiếp khách</p>
          <p className="mb-1 text-sm font-extralight">Diễn đàn cộng đồng</p>
          <p className="mb-1 text-sm font-extralight">Đón tiếp khách có trách nhiệm</p>
          <p className="mb-1 text-sm font-extralight">Tham gia khóa học</p>
        </div>
        <div className="footer-right ">
          <p className="mb-1 text-sm font-bold">Airbnb</p>
          <p className="mb-1 text-sm font-extralight">Trang tin tức</p>
          <p className="mb-1 text-sm font-extralight">Tính năng mới</p>
          <p className="mb-1 text-sm font-extralight">Cơ hội nghề nghiệp</p>
          <p className="mb-1 text-sm font-extralight">Nhà đầu tư</p>
          <p className="mb-1 text-sm font-extralight">Chỗ ở khẩn cấp Airbnb.org</p>
        </div>
      </footer>
      <div className="final-footer  grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6 p-5">
        <div className="left">
          <p className="font-thin">© 2024 Inc.·Quyền riêng tư·Điều khoản·Sơ đồ trang web</p>
        </div>
        <div className="a"></div>
        <div className="right text-end">
        <span className="me-2 font-thin">Tiếng Việt (VN)-VND</span>
        <i class="fa-brands fa-square-facebook text-xl me-1"></i>
        <i class="fa-brands fa-square-instagram text-xl me-1"></i>
        <i class="fa-brands fa-square-twitter text-xl"></i>


        </div>
      </div>
    </div>
  );
}

export default Client;
