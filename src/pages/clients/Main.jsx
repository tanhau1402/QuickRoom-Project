import React, { useState, useContext, removeAccents } from "react";
import { ContextRooms } from "../../context/RoomContext";
import { ContextAmenities } from "../../context/AmenitiesContext";
import { ContextSearchValue } from "../../context/SearchValueContext";
import { ContextBooking } from "../../context/BookingContext";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Rating,
} from "@mui/material";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
function showData(dataId) {
  // Hide all data sections first
  document.querySelectorAll(".data-section").forEach((section) => {
    section.classList.add("hidden");
  });
  // Show the selected data section
  document.getElementById(dataId).classList.remove("hidden");
}
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

function Main() {
  const { inputValue } = useContext(ContextSearchValue);
  const amenities = useContext(ContextAmenities);
  const [amenity, setAmenity] = useState(null);
  const rooms = useContext(ContextRooms);
  const listBooking = useContext(ContextBooking);


  const checkBooking = (start, end, idRoom) => {
    // Chuyển start và end thành đối tượng Date nếu chưa phải là Date
    const checkInDate = new Date(start);
    const checkOutDate = new Date(end);
  
    // Lọc danh sách booking của phòng theo roomId
    const booking = listBooking.filter(a => a.roomId === idRoom);
  
    // Kiểm tra xem phòng đã được đặt trong khoảng thời gian này chưa
    const isRoomAvailable = !booking.some(a => {
      const roomStartDate = new Date(a.startDay);
      const roomEndDate = new Date(a.endDay);

      // Điều kiện phòng không trùng với thời gian mới
      return !(checkInDate >= roomEndDate || checkOutDate <= roomStartDate);
    });
  
    // Trả về kết quả nếu phòng có sẵn (true nếu không trùng lịch, false nếu đã có booking)
    return isRoomAvailable;
  };
  
  const filteredRooms = rooms.filter((room) => {
    const { location, checkin, checkout, guests } = inputValue;

    // Kiểm tra các điều kiện lọc (vị trí, số lượng khách, tiện ích)
    const isLocationMatch = location ? room.roomLocation.toLowerCase().includes(location.toLowerCase()) : true;
    const isGuestsMatch = guests ? parseInt(room.persons) >= parseInt(guests) : true;
    const isAmenityMatch = amenity ? room.listAmenities.some((a) => a === amenity) : true;

    // Kiểm tra xem phòng có khả dụng hay không
    const isRoomAvailable = checkin && checkout ? checkBooking(checkin, checkout, room.id) : true;

    // Kết hợp tất cả các điều kiện
    return isLocationMatch && isGuestsMatch && isAmenityMatch && isRoomAvailable;
});
 console.log(amenity);
  return (
    <div>
      <div className="main  p-5">
        <div className="list-amenities mb-3 border border-purple-800 rounded-xl  grid grid-cols-3 text-center place-items-center  md:grid-cols-4 lg:grid-cols-12  p-4">
          {amenities.map((amenityy) => (
            <div
              onClick={() => setAmenity(amenityy.id)}
              className={`flex-1 hover:scale-110 duration-300 cursor-pointer p-4 rounded-lg ${
                amenity === amenityy.id ? " text-purple-700" : " text-gray-700"
              }`}
            >
              <li
                key={amenityy.id}
                style={{
                  fontSize: "23px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px",
                  
                }}
              >
                <i className={amenityy.icon}></i>
              </li>
              <p className="text-sm">{amenityy.name}</p>
            </div>
          ))}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {filteredRooms.map((room) => (
            <Link to={`detail/${room.id}`}>
            <Card className="hover:scale-105 duration-300" sx={{  borderRadius: 2, boxShadow: 3 }}>
              <Box sx={{ position: "relative" }}>
                <Slider {...settings}>
                  {room.imgUrls.map((img, index) => (
                    <div key={index}>
                      <img
                        src={img}
                        alt={`Property ${index}`}
                        style={{
                          width: "100%",
                          height: "250px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
                </Slider>
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    "&:hover": {
                      color: "red",
                    },
                  }}
                >
                  <i class="fa-regular fa-heart"></i>
                </IconButton>
              </Box>
              <CardContent className="mt-3" >
              
              <Typography style={{ fontWeight: 'bold' }}   variant="body2">
                  {room.roomLocation}
                </Typography>
                <Typography variant="body2">
                  {room.available}
                </Typography>
                <Typography variant="body1" color="textSecondary">Person : {room.persons}</Typography>
                <Typography variant="body1" color="textSecondary">
                  Animals : {room.animal}
                </Typography>
                <Typography
                  color="textPrimary"
                  sx={{ marginTop: 1 }}
                  style={{ fontWeight: 'bold' }}
                >
                  {room.price} <span className="font-thin">USD/night</span>
                </Typography>
              </CardContent>
            </Card>
            </Link>
          ))}
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
      <div>
      </div>
    </div>
  );
}

export default Main;
