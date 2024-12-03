import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import { ContextLocation } from '../../context/LocationContext';
import { ContextHotel } from '../../context/HotelContext';
import { listAvailable } from '../../utils/Constants';
import { ContextAmenities } from '../../context/AmenitiesContext';
import { CustomerLoginContext } from '../../context/CustomerLoginContext';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import {
    FormLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography
} from "@mui/material";
import { addDocument, updateDocument } from '../../services/FirebaseService';

function RoomInfo(props) {
    const { id } = useParams();
    const listLocation = useContext(ContextLocation);
    const { isLogin, setIsLogin } = useContext(CustomerLoginContext);
    const listHotel = useContext(ContextHotel);
    const listAmenities = useContext(ContextAmenities);
    const [amenity, setListAmenity] = useState([]);
    const [preViewImg, setPreviewImg] = useState([]);
    const [hotelByLocal, setHotelByLocal] = useState([]);
    const [imgUpload, setImgUpload] = useState([]);
    const [hotel, setHotel] = useState({});
    const [update, setUpdate] = useState(false);
    const rentPrice = useRef(0);
    const hotelCurrent = useRef({});
    const listImgCurrent = useRef([]);

    useEffect(() => {
        const filteredAddress = listHotel.filter((hot) => hot.city == hotel.location);
        setHotelByLocal(filteredAddress);
        rentPrice.current = hotel?.total;
        hotelCurrent.current = hotel;
    }, [hotel]);

    useEffect(() => {
        setHotel({ ...hotel, listAmenities: amenity });
    }, [amenity]);

    useEffect(() => {
        listImgCurrent.current = imgUpload;
    }, [imgUpload]);



    const isAmenitySelected = (id) => {
        return amenity.includes(id);
    };
    const handleAmenities = (id) => {
        setListAmenity((prev) => {
            let updatedAmenities;
            const idAmenity = prev.find((a) => a === id);

            if (idAmenity) {
                // Remove the amenity if it's already in the list
                updatedAmenities = prev.filter((a) => a !== id);
            } else {
                // Add the amenity if it's not in the list
                updatedAmenities = [...prev, id];
            }

            // Update the room with the new list of amenities


            return updatedAmenities; // Update listAmenities state
        });
    };
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        // Sử dụng FileReader để đọc từng file và lưu các URL xem trước
        const fileReaders = files.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve(reader.result); // Trả về data URL
                };
                reader.readAsDataURL(file); // Đọc file dưới dạng data URL
            });
        });

        // Đợi tất cả các FileReader hoàn thành và lưu các data URL vào previewImg
        Promise.all(fileReaders)
            .then((urls) => {
                setPreviewImg((prev) => [...prev, ...urls]); // Cập nhật danh sách xem trước hình ảnh
                setImgUpload((prevFiles) => [...prevFiles, ...files]); // Cập nhật danh sách tệp hình ảnh để tải lên
            })

            .catch((error) => {
                console.error("Error reading files:", error);
            });
    };


    const handleSubmit = async () => {
        try {
            // Kiểm tra xem room đã tồn tại hay chưa
            const newValue = hotelCurrent.current;
            const imgList1 = listImgCurrent.current;
            console.log(newValue);

            if (hotel.id) {
                // Nếu room đã có id, cập nhật thông tin và hình ảnh mới
                await updateDocument("listRooms", hotel.id, {
                    ...hotel,
                    imgUrls: preViewImg,
                });
            } else {
                // Nếu room chưa có id, thêm room mới với hình ảnh mới
                await addDocument("listRooms", newValue, imgList1);
                

            }

            // Sau khi xử lý xong, cập nhật lại danh sách và đóng modal
            setUpdate(!update);

        } catch (error) {
            console.error("Error submitting room:", error);
        }
    };
    const deleteImg = (index) => {
        // Nếu hình ảnh là ảnh đã có sẵn (không thuộc imgUpload), chỉ xóa khỏi preViewImg
        if (!imgUpload[index]) {
            setPreviewImg((prevImages) => prevImages.filter((_, i) => i !== index));
        } else {
            // Nếu là hình ảnh mới được thêm vào, xóa khỏi cả preViewImg và imgUpload
            setPreviewImg((prevImages) => prevImages.filter((_, i) => i !== index));
            setImgUpload((prevFiles) => prevFiles.filter((_, i) => i !== index));
        }
    };
    const handleDaysChange = (e) => {
        const days = parseInt(e.target.value, 10) ||
            "";
        setHotel((prevHotel) => ({
            ...prevHotel,
            days: days,
            total: days * 10 // mỗi ngày 10 đô
        }));
        setHotel((prevHotel) => ({
            ...prevHotel,
            idCustomer: isLogin.id,
        }));
    };

    return (
        <div>
            <div className="grid grid-cols-1 text-center  mx-auto  md:grid-cols-2 gap-3 lg:grid-cols-2 mt-8 container">
                <div className="main-left p-5">
                    <FormControl fullWidth>
                        <InputLabel id="room-available-label">Room Location</InputLabel>
                        <Select
                            labelId="room-available-label"
                            id="room-available-select"
                            style={{ marginBottom: "10px" }}
                            label="Room Available"
                            value={hotel.location}
                            onChange={(e) => setHotel({ ...hotel, location: e.target.value })}

                        >
                            {listLocation.map((location, index) => (
                                <MenuItem key={index} value={location.id}>
                                    {location.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="room-available-label">Hotel Location</InputLabel>
                        <Select
                            labelId="room-available-label"
                            id="room-available-select"
                            style={{ marginBottom: "10px" }}
                            label="Room Available"
                            value={hotel.roomLocation}
                            onChange={(e) => setHotel({ ...hotel, roomLocation: e.target.value })}
                        >
                            {hotelByLocal.map((location, index) => (
                                <MenuItem key={index} value={location.address}>
                                    {location.address}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Persons"
                        variant="outlined"
                        style={{ marginBottom: "10px" }}
                        value={hotel.persons}
                        onChange={(e) => setHotel({ ...hotel, persons: e.target.value })}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="room-available-label">Room Available</InputLabel>
                        <Select
                            labelId="room-available-label"
                            id="room-available-select"
                            style={{ marginBottom: "10px" }}
                            label="Room Available"
                            value={hotel.available}
                            onChange={(e) => setHotel({ ...hotel, available: e.target.value })}
                        >
                            {listAvailable.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="main-right  p-5">
                    <FormControl>
                        <FormLabel>Animals Service</FormLabel>
                        <RadioGroup
                            aria-label="animal"
                            name="animal"
                            value={hotel.animal}
                            onChange={(e) => setHotel({ ...hotel, animal: e.target.value })}
                        >
                            <Box display="flex" alignItems="center">
                                <FormControlLabel
                                    value="yes"
                                    control={<Radio />}
                                    label="Yes"
                                />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </Box>
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Price per night"
                        variant="outlined"
                        type='number'
                        value={hotel.price}
                        onChange={(e) => setHotel({ ...hotel, price: e.target.value })}
                    />
                    <FormControl

                        fullWidth
                        style={{ textAlign: "center", marginBottom: "10px", marginTop: "10px" }}
                    >
                        <InputLabel
                            id="room-type-amenity"
                            style={{
                                position: "relative",
                                top: "-20px",

                                color: "#333",
                            }}
                        >
                            Room Amenity
                        </InputLabel>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "10px",
                                flexWrap: "wrap",
                            }}
                        >
                            {listAmenities.map((amenity) => (
                                <Button
                                    key={amenity.id}
                                    value={hotel.amenity}
                                    onClick={() => handleAmenities(amenity.id)}
                                    variant={
                                        isAmenitySelected(amenity.id) ? "contained" : "outlined"
                                    }
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "10px",
                                    }}
                                >
                                    <i className={amenity.icon}></i>
                                </Button>
                            ))}
                        </div>
                    </FormControl>
                    <FormControl className='flex'>
                        <FormLabel>Payment Service</FormLabel>
                        <TextField
                            label="Số ngày hiển thị"
                            type="number"
                            value={hotel.days}
                            onChange={handleDaysChange}
                            margin="normal"
                        />


                        <Typography variant="h6" sx={{ marginTop: 2 }}>
                            Tổng số tiền: {hotel.total} USD
                        </Typography>
                    </FormControl>
                </div>
            </div>
            <div className="img-container grid grid-cols-1 text-center  mx-auto  md:grid-cols-2 gap-3 lg:grid-cols-2 container">
                <div className="box-1">
                    {/* Image URL Input */}
                    <InputLabel
                        style={{
                            color: "#333",
                            textAlign: "center",
                        }}
                    >
                        Images Room
                    </InputLabel>

                    {/* File Upload Input */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)}
                        style={{ marginBottom: "10px", marginTop: "10px",textAlign: 'center' }}
                    />

                    {/* Image Preview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 mx-auto  p-3  lg:grid-cols-4 gap-5">
                        {preViewImg.length > 0 ? (
                            preViewImg.map((image, index) => (
                                <div className="relative mt-3" key={index}>
                                    <img
                                        src={image}
                                        alt={`Uploaded ${index}`}
                                        style={{
                                            maxWidth: "100%",
                                            height: "auto",
                                            marginBottom: "10px",
                                        }}
                                    />
                                    <i
                                        onClick={() => deleteImg(index)}
                                        className="fa-solid fa-trash-can top-[-10px] left-[-10px] absolute hover:text-red-700 text-black text-2xl"
                                    ></i>
                                </div>
                            ))
                        ) : (
                            <p className='text-center'>No images available</p>
                        )}
                    </div>
                </div>
                <div className="box-2">
                    <PayPalScriptProvider
                        options={{ "client-id": "AfXPw1SPq4L3iiggjJv1PUVZ2zyXlfk3PnLiygFoogPAuhRjUxsdnvyHbRuN2lgwqVZ75brnlyQJnSaL" }}  // Thay YOUR_CLIENT_ID bằng Client ID của bạn
                    >
                        <div style={{ maxWidth: "750px", margin: "auto", padding: "50px" }}>
                            <PayPalButtons
                                style={{ layout: 'vertical' }}
                                createOrder={(data, actions) => {
                                    // check validation
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: rentPrice.current,  // Số tiền thanh toán
                                                },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        alert(`Transaction completed by ${details.payer.name.given_name}`);
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
            </div>

            <hr className='mt-5 mb-5' />

        </div>
    );
}

export default RoomInfo;