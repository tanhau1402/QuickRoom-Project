import React, { useState } from "react";

function showData(dataId) {
  // Hide all data sections first
  document.querySelectorAll(".data-section").forEach((section) => {
    section.classList.add("hidden");
  });
  // Show the selected data section
  document.getElementById(dataId).classList.remove("hidden");
}
function Main(props) {
  return (
    <div>
      <div className="main p-5">
      <div className="list-amenities flex text-center justify-center   p-2">
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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          <div class=" bg-white">
            {/* <!-- Image Section --> */}
            <img
              className=" aspect-square rounded-xl"
              src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzNTA4NjAxNDk3NDg1NTQ2MQ%3D%3D/original/b692ae8e-a118-4906-bf40-16855d715c02.jpeg?im_w=720"
              alt="Room Image"
            />

            {/* <!-- Content Section --> */}
            <div class="pt-2">
              <p className="font-mono">London, Vương quốc Anh</p>
              <p class="text-sm text-gray-600">
                Chủ nhà/Người tổ chức: Wendy và Lisa
              </p>
              <p class="text-sm font-bold">₫87.520.900 / đêm</p>
            </div>
          </div>
          <div class=" bg-white">
            {/* <!-- Image Section --> */}
            <img
              className=" aspect-square rounded-xl"
              src="https://a0.muscache.com/im/pictures/d682f7bf-caa4-4433-9038-c5f81a01845b.jpg?im_w=720"
              alt="Room Image"
            />

            {/* <!-- Content Section --> */}
            <div class="pt-2">
              <p className="font-mono">Nha Trang</p>
              <p class="text-sm text-gray-600">Chủ nhà/Người tổ chức: Wendy</p>
              <p class="text-sm font-bold">₫2.775.005 / đêm</p>
            </div>
          </div>
          <div class=" bg-white">
            {/* <!-- Image Section --> */}
            <img
              className=" aspect-square rounded-xl"
              src="https://a0.muscache.com/im/pictures/19292248-6cca-4b02-9860-94925b29397e.jpg?im_w=720"
              alt="Room Image"
            />

            {/* <!-- Content Section --> */}
            <div class="pt-2">
              <p className="font-mono">Hà Nội</p>
              <p class="text-sm text-gray-600">Chủ nhà/Người tổ chức: Khang</p>
              <p class="text-sm font-bold">₫3.775.005 / đêm</p>
            </div>
          </div>
          <div class=" bg-white">
            {/* <!-- Image Section --> */}
            <img
              className=" aspect-square rounded-xl"
              src="https://a0.muscache.com/im/pictures/miso/Hosting-678798543099234014/original/fc2c05ad-fe0e-4d86-90c1-16a0bf098984.jpeg?im_w=720"
              alt="Room Image"
            />

            {/* <!-- Content Section --> */}
            <div class="pt-2">
              <p className="font-mono">Đà Nẵng</p>
              <p class="text-sm text-gray-600">Chủ nhà/Người tổ chức: Fuong</p>
              <p class="text-sm font-bold">₫10.222.005 / đêm</p>
            </div>
          </div>
          <div class=" bg-white">
            {/* <!-- Image Section --> */}
            <img
              className=" aspect-square rounded-xl"
              src="https://a0.muscache.com/im/pictures/miso/Hosting-931433141813173131/original/2c8f59fc-ec00-4eae-ab5f-684fd1168b4e.jpeg?im_w=720"
              alt="Room Image"
            />

            {/* <!-- Content Section --> */}
            <div class="pt-2">
              <p className="font-mono">Khánh Hòa</p>
              <p class="text-sm text-gray-600">Chủ nhà/Người tổ chức: Lisa</p>
              <p class="text-sm font-bold">₫775.005 / đêm</p>
            </div>
          </div>
          <div class=" bg-white">
            {/* <!-- Image Section --> */}
            <img
              className=" aspect-square rounded-xl"
              src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMjg5NDM4MjI4MTg0MjgwNw%3D%3D/original/710cc1c4-1ad7-49ea-a897-c3308683eea4.jpeg?im_w=720"
              alt="Room Image"
            />

            {/* <!-- Content Section --> */}
            <div class="pt-2">
              <p className="font-mono">Quy Nhơn</p>
              <p class="text-sm text-gray-600">Chủ nhà/Người tổ chức: Wisa</p>
              <p class="text-sm font-bold">₫77.775.005 / đêm</p>
            </div>
          </div>
          <div class=" bg-white">
            {/* <!-- Image Section --> */}
            <img
              className=" aspect-square rounded-xl"
              src="https://a0.muscache.com/im/pictures/miso/Hosting-858313563150392687/original/f47850e4-6896-4f8a-b1ac-0351c55269bd.jpeg?im_w=720"
              alt="Room Image"
            />

            {/* <!-- Content Section --> */}
            <div class="pt-2">
              <p className="font-mono">Huế</p>
              <p class="text-sm text-gray-600">Chủ nhà/Người tổ chức: Wenisa</p>
              <p class="text-sm font-bold">₫111.225.005 / đêm</p>
            </div>
          </div>
          <div class=" bg-white">
            {/* <!-- Image Section --> */}
            <img
              className=" aspect-square rounded-xl"
              src="https://a0.muscache.com/im/pictures/miso/Hosting-644052629444200111/original/b33b8e77-9d1a-4045-8d79-b08243ef71d3.jpeg?im_w=720"
              alt="Room Image"
            />

            {/* <!-- Content Section --> */}
            <div class="pt-2">
              <p className="font-mono">Sapa</p>
              <p class="text-sm text-gray-600">
                Chủ nhà/Người tổ chức: Wendisa
              </p>
              <p class="text-sm font-bold">₫43.331.114 / đêm</p>
            </div>
          </div>
        </div>
      </div>
      <div className="main-bottom p-5 ">
        <p className="text-xl font-medium p-3">
          Nguồn cảm hứng cho những kì nghỉ sau này
        </p>
        <div className="list_item flex p-3 border-b   ">
          <button
            onClick={() => showData("data1")}
            className="me-4 font-medium text-sm text-gray-500 p-2"
          >
            Phổ biến
          </button>
          <button
            onClick={() => showData("data2")}
            className="me-4 font-medium text-sm text-gray-500 p-2"
          >
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
    </div>
  );
}

export default Main;
