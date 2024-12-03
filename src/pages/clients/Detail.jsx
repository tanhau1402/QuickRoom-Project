import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { CustomerLoginContext } from "../../context/CustomerLoginContext";
import { ContextAmenities } from "../../context/AmenitiesContext";

import {
  FormLabel,
  Box,
  TextField,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { addDocument, updateDocument } from "../../services/FirebaseService";

const inner = {
  startDay: "",
  endDay: "",
  persons: "",
};
function Detail(props) {
  const { id } = useParams();
  const [room, setRoom] = useState({ imgUrls: [] });
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(inner);
  const { isLogin, setIsLogin } = useContext(CustomerLoginContext);
  const amenities = useContext(ContextAmenities);
  const [cleaningPrice, setCleaningPrice] = useState(50);
  const [error, setError] = useState("");
  const rentPrice = useRef(0);
  const bookingCurrent = useRef({});
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomDoc = doc(db, "listRooms", id);
        const roomSnap = await getDoc(roomDoc);
        if (roomSnap.exists()) {
          setRoom(roomSnap.data()); // Lưu dữ liệu vào state
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching room data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [id]);

  useEffect(() => {
    rentPrice.current = totalPrice() + cleaningPrice + calculateTax();
    bookingCurrent.current = booking;
  }, [booking]);

  const totalPrice = () => {
    const startD = new Date(booking.startDay);
    const endD = new Date(booking.endDay);
    const timeDiff = endD - startD;
    const daysStayed = timeDiff / (1000 * 60 * 60 * 24);
    return daysStayed > 0 ? daysStayed * room.price : 0;
  };
  const handleSubmit = async () => {
    try {
      // Kiểm tra xem room đã tồn tại hay chưa
      const newValue = bookingCurrent.current;
      const rentPriceTotal = rentPrice.current;
      newValue.totalPrice = rentPriceTotal;
      newValue.idCustomer = isLogin.id;
      newValue.roomId = id;
      if (booking.id) {
        // Nếu room đã có id, cập nhật thông tin và hình ảnh mới
        await updateDocument("listBooking", booking.id);
      } else {
        // Nếu room chưa có id, thêm room mới với hình ảnh mới
        await addDocument("listBooking", newValue);
      }

      // Sau khi xử lý xong, cập nhật lại danh sách và đóng modal
      setUpdate(!update);
    } catch (error) {
      console.error("Error submitting room:", error);
    }
  };

  const calculateTax = () => {
    const basePrice = totalPrice();
    const tax = basePrice * 0.1;
    return tax;
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setBooking({ ...booking, [name]: value });
    const today = new Date();
    const inputDate = new Date(value);
    // Đặt giờ, phút, giây và mili giây của ngày hiện tại về 0 để chỉ so sánh ngày
    today.setHours(0, 0, 0, 0);
    if (name == "startDay" && inputDate < today) {
      setError("Ngày đặt phòng phải lớn hơn ngày hiện tại.");
      return;
    }
    if (name == "endDay" && inputDate <= new Date(booking.startDay)) {
      setError("Ngày trả phòng phải sau ngày nhận phòng.");
      return;
    }
    setError("");
  };

  return (
    <div>
      <div className="card-title container mx-auto grid grid-cols-2  md:grid-cols-2 lg:grid-cols-2 p-4 mt-4">
        <div className="left flex justify-start  ">
          <i class="fa-solid fa-house text-xl me-2"></i>
          <p className="font-sans text-2xl">{room.roomLocation}</p>
        </div>
        <div className="group-action flex justify-end me-3">
          <div className="act-1 me-5 text-xl   hover:text-blue-800 cursor-pointer">
            <i class="fa-regular fa-share-from-square hover:scale-150 duration-300  me-1"></i>
            Share
          </div>
          <div className="act-2 text-xl hover:text-red-800 cursor-pointer">
            <i class="fa-regular fa-heart me-1 hover:scale-150 duration-300  "></i>
            <span>Like</span>
          </div>
        </div>
      </div>
      <div className="image-box container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 p-5">
        {/* Hình ảnh lớn bên trái */}
        <div className="box-left">
          <img
            className="w-full hover:scale-105 duration-300   rounded-2xl"
            style={{ height: "415px" }}
            src={room.imgUrls[0]}
            alt=""
          />
        </div>
        {/* Hình ảnh nhỏ bên phải */}
        <div className="box-right grid grid-cols-2 gap-2">
          {/* Hình trên */}
          <div className="top-left flex flex-col gap-2">
            <img
              className="w-full hover:scale-105 duration-300 h-auto rounded-tl-2xl "
              src={room.imgUrls[1]}
              alt=""
            />
            <img
              className="w-full hover:scale-105 duration-300 h-auto rounded-bl-2xl "
              src={room.imgUrls[2]}
              alt=""
            />
          </div>

          {/* Hình dưới */}
          <div className="bottom-left flex flex-col gap-2">
            <img
              className="w-full hover:scale-105 duration-300 h-auto rounded-tr-2xl"
              src={room.imgUrls[3]}
              alt=""
            />
            <img
              className="w-full hover:scale-105 duration-300 h-auto rounded-br-2xl"
              src={room.imgUrls[4]}
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="container  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 mx-auto p-5 gap-5  ">
        <div className="main-left col-span-4">
          <div class="header">
            <p className="text-2xl font-bold me-3">{room.roomLocation}</p>
            <p className="text-2xl text-green-700 font-light me-3">
              {room.available}
            </p>

            <hr className="mt-2 mb-2" />
            <p className="text-xl font-semibold">Room informations :</p>
            <p className="text-lg font-mono text-gray-600">
              <i class="fa-solid fa-person text-2xl me-2"></i>
              {room.persons} guests
            </p>
            <p className="text-lg font-mono text-gray-600">
              <i class="fa-solid fa-dollar-sign text-2xl me-2"></i>
              {room.price} USD/night
            </p>
            <p className="text-lg font-mono text-gray-600">
              <i class="fa-solid fa-paw text-2xl me-2"></i>
              {room.animal ? "Yes" : "No"}
            </p>
            <hr className="mt-2 mb-2" />
          </div>

          <div className=" ">
            <p className="text-xl font-semibold">Amenities</p>

            {room.listAmenities && room.listAmenities.length > 0
              ? room.listAmenities.map((amenityId, i) => {
                const amenity = amenities.find(
                  (a) => a.id === amenityId
                );

                return amenity ? (

                  <i
                    key={i}
                    className={`ml-2 text-lg ${amenity.icon}`}
                  ></i>

                ) : null;
              })
              : "No amenities"}
          </div>

          <div class="host flex items-center space-x-2 mt-3">
            <img
              src={isLogin.imgUrl}
              alt="Avatar"
              class="w-10 h-10 rounded-full"
            />
            <span>Host/Organizer : {isLogin.nameCustomer}</span>
          </div>

          <div class="amenities flex flex-wrap gap-2 mt-3">
            <div class="bg-blue-100 p-2 rounded">
              <span>Visit the Purple Rain house in real life</span>
            </div>
          </div>

          <div class="description text-gray-700 mt-3">
            Purple Rain is the greatest movie of all time. This is not opinion,
            but reality. Now, 40 years since its premiere, We will recreate this
            movie. Don't just choose your childhood home The Kid's unforgettable
            childhood, but we also restored the interior inside, bringing the
            house back to its golden age. All credit The process is a tribute,
            or rather a tribute, even to oneself the movie and the moment that
            brought Prince to the top. Because if we just talk about either of
            these is not enough. Interesting, right? Sure. <br />
            Activities for you Don't dare brag, but we really surpassed myself.
            This place is filled with memorabilia historical nature, will give
            you a rare opportunity to observe the process Prince's creations
            from the Purple Rain era – through the eyes of two people have
            experienced it firsthand (ourselves!). Well then, for examination
            What's a better way to break down what's going on in an artist's
            brain? rather than listening to Prince's personal tape collection,
            admiring the outfits he used to wear, then enjoy the treasure trove
            of smells Selected fragrances, including your favorite perfumes?
            These that, along with the bold 1980s imprint in every breath.
            Please. <br />
            Let's explore together, shall we? <br />
            • It's still The Kid's world, and you're living in it. The
            downstairs space is decorated with dark purple wallpaper and a
            classic, pre-loaded stereo system from the 1980s songs that inspired
            The Kid. There's even one leopard print sofa so you can watch the
            movie Purple Rain in a really cool style. Scan the QR code to see
            legends and information Our own in-depth news. You will love the
            information This. <br />
            • Relax in the spa room decorated in memory of one music videos we
            love the most: "When Doves Cry". Tub Claw foot bath? Have. Stained
            glass windows? Also yes. Put on a suit Luxurious purple bathrobe,
            relaxing face mask, throw in the tub Take a few lavender bath bombs
            and you've become one A true king and queen. <br />
            • Admire the wonder in the house – the wardrobe. Page sets Prince's
            most legendary costumes are displayed behind glass – no cannot be
            touched, but can only be seen. But if you want to try it out
            somewhat, then we have prepared a collection of assorted pages 1980s
            inspired outfit, let the rock superstar inside you get a chance to
            show off (with wigs, accessories and makeup, of course). eye point.{" "}
            <br />
            • Do you want to try? Visit the inspiration room. Even if you like
            to strum plays gently, slapping the soundboard, showing off his
            skillful technique on the guitar or captivate the world with their
            sublime falsetto, they I will also introduce you to an app that will
            teach you how to play (or sing) the song "Purple Rain". <br />
            • The best part of the house is the secret space – if you found.
            Activate the secret door to the room full of items precious items
            (we won't reveal how to open them). In particular, the cover fake
            vinyl album containing 7 clues. If you answer 7 questions correctly
            hey, a world of endless happiness will open up. <br />
            • Sleep like Prince in The Kid's decorated bedroom just like in the
            movie. Or stay up to explore the music tape collection his solo
            record, including one of his original demo recordings by Prince.{" "}
            <br />
          </div>
          <div className="user-info">
            <hr className="mt-7" />
            <p className="text-2xl mt-8 mb-5">Meet the Host</p>
            <div className="wrap hover:scale-110 duration-300 text-center w-96 bg-white-600 h-auto p-4 rounded-2xl shadow-2xl">
              <div className="relative">
                <img
                  src={isLogin.imgUrl}
                  alt="Avatar"
                  class="w-24 h-24 rounded-full mx-auto"
                />
                <i
                  style={{ right: "117px" }}
                  class="fa-solid absolute bottom-2  text-3xl text-pink-600  fa-circle-check"
                ></i>
              </div>
              <p className="font-semibold text-xl">{isLogin.nameCustomer}</p>
              <p className="font-extralight">
                Start welcoming guests from 2024
              </p>
            </div>
            <div className="user-list mt-4">
              <div className="job mb-3 ">
                <i class="fa-solid fa-briefcase me-3 text-2xl text-gray-600"></i>
                <span className="font-extralight text-lg">
                  My job: Music artist/Musician
                </span>
              </div>
              <div className="language mb-3 text-2xl ">
                <i class="fa-solid fa-language me-3 text-gray-600"></i>
                <span className="font-extralight text-lg">Speak English</span>
              </div>
              <div className="living mb-3 text-2xl">
                <i class="fa-solid fa-earth-americas me-3 text-gray-600"></i>
                <span className="font-extralight text-lg">
                  {" "}
                  Lives in Los Angeles, California
                </span>
              </div>
              <div className="user-des font-thin">
                Hello! We are Wendy and Lisa. We are a sonic duo award-winning
                music, childhood friends, and Proud member of legendary rock
                band The Revolution. Back in the 1980s, we cooperated with you
                close friend and leader of Revolution, Prince, to deliver the
                song and the famous movie "Purple Rain" became a reality. We
                extremely excited to go back in time to the witnessing place
                all, and share with you even more magical memories!
              </div>
            </div>
            <hr className="mt-7" />
          </div>
          <div className="bed-room mt-7">
            <span className="text-2xl mt-8 mb-5">Where you will sleep</span>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 mt-5">
              <div className="room-1 ">
                <img
                  className="w-full h-auto mb-3 rounded-2xl"
                  src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/a766e0e9-1e6f-4b88-b8d5-ce12375c6de8.png?im_w=2560&im_q=highq"
                  alt=""
                />
                <p className="font-medium text-lg ">Bedroom 1</p>
                <span className="font-extralight">1 queen bed</span>
              </div>
              <div className="room-2 ">
                <img
                  className="w-full h-auto mb-3 rounded-2xl"
                  src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/a766e0e9-1e6f-4b88-b8d5-ce12375c6de8.png?im_w=2560&im_q=highq"
                  alt=""
                />
                <p className=" font-medium text-lg ">Bedroom 2</p>
                <span className="font-extralight">1 double bed</span>
              </div>
            </div>
          </div>
        </div>
        <div className="main-right col-span-2 ">
          <div class="bg-gray-200 p-4 rounded-lg">
            <p class="text-center text-gray-700 font-bold">
              Receive reservations
            </p>
            <div>
              <div className="flex flex-col items-center mt-5">
                <label className="text-lg font-medium mb-2">Select date</label>
                <div className="days">
                  <FormControl error={!!error}>
                    <FormLabel>Check in</FormLabel>
                    <Box>
                      <TextField
                        onChange={handleInput}
                        name="startDay"
                        type="date"
                      />
                    </Box>
                  </FormControl>

                  <FormControl error={!!error}>
                    <FormLabel className="ml-2">Check out</FormLabel>
                    <Box className="ml-2">
                      <TextField
                        onChange={handleInput}
                        name="endDay"
                        type="date"
                      />
                    </Box>
                  </FormControl>
                  <div>
                    {error && <div className="text-red-600">{error}</div>}
                  </div>
                </div>
                <div className="w-full px-5 mt-3">
                  <FormControl className="w-full">
                    <Box>
                      <TextField
                        onChange={handleInput}
                        name="persons"
                        label="Khách"
                        type="number"
                        fullWidth
                      />
                    </Box>
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="box-2">
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AfXPw1SPq4L3iiggjJv1PUVZ2zyXlfk3PnLiygFoogPAuhRjUxsdnvyHbRuN2lgwqVZ75brnlyQJnSaL",
                }} // Thay YOUR_CLIENT_ID bằng Client ID của bạn
              >
                <div style={{ padding: "20px", paddingBottom: "0px" }}>
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                      // check validation
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: rentPrice.current, // Số tiền thanh toán
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        alert(
                          `Transaction completed by ${details.payer.name.given_name}`
                        );
                        handleSubmit(details.id);
                      });
                    }}
                    onError={(err) => {
                      console.error("PayPal Checkout onError", err);
                      alert("Payment could not be processed");
                    }}
                  />
                </div>
              </PayPalScriptProvider>
            </div>

            <div className=" p-3 font-light">
              <h3 className="flex justify-between">
                <b>Room rental :</b> <span>{totalPrice()} USD</span>
              </h3>
              <h3 className="flex justify-between">
                <b>Cleaning fee :</b> <span>{cleaningPrice} USD</span>
              </h3>
              <h3 className="flex justify-between">
                <b>Tax :</b> <span>{calculateTax()} USD</span>
              </h3>
              <h3 className="flex justify-between">
                <b>Total price :</b>{" "}
                <span>{totalPrice() + calculateTax() + cleaningPrice} USD</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="highlight container  mx-auto p-5 gap-5 ">
        <hr className="mb-4" />
        <p className="font-semibold mb-3">Highlights in the area</p>
        <p className="font-extralight">
          You want to know where you're going?? You will be at the Purple house
          MAIN Rain in The Kid's hometown, Minneapolis, Minnesota! IT IS the
          place there. We have decorated this place as a memorial site the
          immortal estate of our friend, as well as the classic film loved by
          many people. Get ready to feel the magic of The Kid in royal purple at
          his peak.
        </p>
        <hr className="mt-6" />
      </div>
      <div className="booking container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 p-5">
        <div className="box-1">
          <i class="fa-regular fa-envelope text-3xl"></i>
          <p className="font-semibold mt-1 mb-1">Reservation required</p>
          <p className="font-extralight">
            Select the desired date, add guests, then answer questions about
            your reason want to go.
          </p>
        </div>
        <div className="box-2">
          <i class="fa-regular fa-circle-check text-3xl"></i>
          <p className="font-semibold mt-1 mb-1">Selection process</p>
          <p className="font-extralight">
            First, we will randomly select a group of potential guests. Next, we
            will consider the responses of this group of guests draw out their
            own perspectives and feelings about the symbolic dwelling. We will
            then invite selected guests to book a room.
          </p>
        </div>
        <div className="box-3">
          <i class="fa-regular fa-address-card text-3xl"></i>
          <p className="font-semibold mt-1 mb-1">Requirements need to be met</p>
          <p className="font-extralight">
            To participate, you must have an active and loaded Airbnb account
            application; At the same time, you must be a resident of a country
            or region valid area. Submitting a request is completely free.
          </p>
        </div>
      </div>
      <div className="terms container mx-auto p-5">
        <hr className="mb-4" />
        <p className="text-sm font-light text-gray-500">
          If you are selected and decide to make a reservation, you will have 24
          hours to refund all transactions. Does not include travel costs.
          Please refer to <br /> Full rules, including age and geographic
          location eligibility event, how the data will be used, the probability
          of being selected, and the <br />
          other terms.
        </p>
        <hr className="mt-4" />
      </div>
      <div className="clauses container mx-auto   p-5">
        <p className="text-2xl font-semibold">Things to know</p>
        <div className="clauses-item grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
          <div className="clauses-1 mt-5">
            <p className="font-bold mb-2">House rules</p>
            <p className="mb-2">Check-in after 4:00 p.m</p>
            <p className="mb-2">Check-out before 11:00</p>
            <p>Maximum 4 guests</p>
          </div>
          <div className="clauses-2 mt-5">
            <p className="font-bold mb-2">Safety and accommodation</p>
            <p className="mb-2">
              The property has security cameras outside the house
            </p>
            <p className="mb-2">CO gas detector</p>
            <p>Smoke detector</p>
          </div>
        </div>
        <hr className="mt-5 mb-3" />
      </div>
    </div>
  );
}

export default Detail;
