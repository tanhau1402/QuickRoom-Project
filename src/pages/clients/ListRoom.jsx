import React, { useState, useEffect, useContext } from "react";
import { listAvailable } from "../../utils/Constants";
import { ContextLocation } from "../../context/LocationContext";
import { ContextHotel } from "../../context/HotelContext";
import { ContextRooms } from "../../context/RoomContext";
import { DatePicker } from "@mui/lab";
import {
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  TablePagination,
  Modal,
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import {
  addDocument,
  fetchDocuments,
  deleteDocument,
  updateDocument,
} from "../../services/FirebaseService";
import ModalDelete from "../admin/hotels page/ModalDelete";
import { ContextAmenities } from "../../context/AmenitiesContext";
import ModalImgs from "../admin/hotels page/ModalImgs";
import { ContextTypeBusiness } from "../../context/TypeContext";
import { ContextLogin } from "../../context/LoginContext";
import { CustomerLoginContext } from "../../context/CustomerLoginContext";

function ListRoom(props) {
  const [listRooms, setListRooms] = useState([]);
  const [preViewImg, setPreviewImg] = useState([]);
  const [imgUpload, setImgUpload] = useState([]);
  const [page, setPage] = useState(0); // Trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5); // Số lượng dòng mỗi trang
  const [searchInput, setSearchInput] = useState("");
  const [room, setRoom] = useState([]);
  const [listAmenities, setListAmenities] = useState([]);
  const [open, setOpen] = useState(false);
  const [imgList, setImgList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [imgsModal, setImgsModal] = useState(false);
  const [hotelByLocal, setHotelByLocal] = useState([]);

  const amenities = useContext(ContextAmenities);
  const listCustomer = useContext(ContextLogin);
  const listLocation = useContext(ContextLocation);
  const listHotel = useContext(ContextHotel);
  const listType = useContext(ContextTypeBusiness);
  const { isLogin, setIsLogin } = useContext(CustomerLoginContext);
  const listRoomContext = useContext(ContextRooms);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (room && room.location) {
      const filteredAddress = listHotel.filter(
        (hot) => hot.city == room.location
      );
      setHotelByLocal(filteredAddress);
    }
  }, [room]);

  useEffect(() => {
    const listRoomUser = listRoomContext.filter(
      (a) => a.idCustomer === isLogin.id
    );
    setListRooms(listRoomUser);
  }, [listRoomContext, isLogin]);

  const handleAmenities = (id) => {
    setListAmenities((prev) => {
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
      setRoom({ ...room, listAmenities: updatedAmenities });

      return updatedAmenities; // Update listAmenities state
    });
  };
  const calculateRemainingDays = (roomDays) => {
    const now = new Date();
    const targetDate = new Date(now);
    targetDate.setDate(targetDate.getDate() + roomDays);
    const remainingTime = targetDate - now;

    // Tính số ngày còn lại
    const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    return remainingDays;
  };
  // Hàm cập nhật trạng thái cho mỗi phòng theo thời gian thực
  const updateRoomStatus = () => {
    setListRooms((prevRooms) =>
      prevRooms.map((room) => {
        const remainingDays = calculateRemainingDays(room.days);
        return {
          ...room,
          status: remainingDays > 0 ? "Active" : "Not Active",
          remainingDays: remainingDays > 0 ? remainingDays : 0,
        };
      })
    );
  };
  useEffect(() => {
    // Thiết lập interval để cập nhật trạng thái theo thời gian thực
    const interval = setInterval(updateRoomStatus, 1000);

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);

  const handleSubmit = async () => {
    try {
      // Kiểm tra xem room đã tồn tại hay chưa
      if (room.id) {
        // Nếu room đã có id, cập nhật thông tin và hình ảnh mới
        await updateDocument("listRooms", room.id, {
          ...room,
          imgUrls: preViewImg,
        });
      } else {
        // Nếu room chưa có id, thêm room mới với hình ảnh mới
        await addDocument("listRooms", room, imgUpload);
      }

      // Sau khi xử lý xong, cập nhật lại danh sách và đóng modal
      setUpdate(!update);
      handleClose();
    } catch (error) {
      console.error("Error submitting room:", error);
    }
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

  // Lọc danh sách phòng theo giá trị tìm kiếm
  const filteredRooms = listRooms.filter(
    (room) =>
      room.persons
        ?.toString()
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      room.price?.toString().includes(searchInput) ||
      room.available?.toLowerCase().includes(searchInput.toLowerCase()) ||
      room.idCustomer?.toLowerCase().includes(searchInput.toLowerCase())
  );

  const isAmenitySelected = (id) => {
    return listAmenities.includes(id);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteDocument("listRooms", deleteId.id, deleteId.imgUrls);
      setUpdate(!update);
      setDeleteModal(false);
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

  const clearRoom = () => {
    handleOpen();
    setRoom({});
    setPreviewImg([]);
    setListAmenities([]);
    setImgUpload([]);
  };

  const handleOpenEdit = (room) => {
    setOpen(true);
    setRoom(room);
    setListAmenities(room.listAmenities || []); // Load selected amenities
    setPreviewImg(room.imgUrls || []); // Load preview images
    setImgUpload([]);
  };
  return (
    <div>
      <header className="flex justify-between p-5">
        <div className="p-2 text-2xl font-thin">Nhà/phòng cho thuê của bạn</div>
        <div>
          <input
            className=" p-2 border  border-gray-300 rounded-md"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search rooms..."
          />
        </div>
      </header>

      {/* Table */}
      <TableContainer sx={{ padding: 2, padding: "30px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Room ID</TableCell>
              <TableCell align="center">Room Persons</TableCell>
              <TableCell align="center">Price Per Night</TableCell>
              <TableCell align="center">Amenity</TableCell>
              <TableCell align="center">Animals</TableCell>
              <TableCell align="center">Days</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRooms
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((room, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell align="center">
                    {room.persons} <i class="fa-solid fa-person"></i>
                  </TableCell>
                  <TableCell align="center">{room.price}</TableCell>
                  <TableCell align="center">
                    {room.listAmenities && room.listAmenities.length > 0
                      ? room.listAmenities.map((amenityId, i) => {
                          const amenity = amenities.find(
                            (a) => a.id === amenityId
                          );
                          return amenity ? (
                            <i
                              key={i}
                              className={amenity.icon}
                              style={{ marginRight: "10px" }}
                            ></i>
                          ) : null;
                        })
                      : "No amenities"}
                  </TableCell>
                  <TableCell align="center">{room.animal}</TableCell>
                  <TableCell align="center">
                    {room.remainingDays ? (
                      <span>
                        {calculateRemainingDays(room.remainingDays) > 0 ? (
                          <span className="text-green-700">Active</span>
                        ) : (
                          <span className="text-red-700">Not Active</span>
                        )}
                      </span>
                    ) : (
                      <span className="text-red-700">Not Active</span>
                    )}
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        setImgsModal(true);
                        setImgList(room.imgUrls);
                      }}
                      sx={{ padding: "10px", mr: 1 }}
                      variant="contained"
                      color="primary"
                    >
                      <i class="fa-solid fa-images"></i>
                    </Button>
                    <Button
                      onClick={() => handleOpenEdit(room)}
                      sx={{ padding: "10px", mr: 1 }}
                      variant="contained"
                      color="primary"
                    >
                      <i class="fa-regular fa-pen-to-square"></i>
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ padding: "10px", mr: 1 }}
                      onClick={() => {
                        setDeleteModal(true);
                        setDeleteId(room);
                      }}
                    >
                      <i class="fa-solid fa-trash"></i>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={listRooms.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box className="absolute text-center  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg ">
          <h2 className="mb-4">{room.id ? "EDIT ROOM" : "ADD NEW ROOM"}</h2>
          <Box className=" grid grid-cols-2  md:grid-cols-2 lg:grid-cols-2 gap-5 ">
            <div className="box-1">
              <TextField
                fullWidth
                label="Persons"
                variant="outlined"
                value={room.persons}
                onChange={(e) => setRoom({ ...room, persons: e.target.value })}
                style={{ marginBottom: "10px", marginTop: "10px" }}
              />
              <TextField
                fullWidth
                label="Price per night"
                variant="outlined"
                value={room.price}
                onChange={(e) => setRoom({ ...room, price: e.target.value })}
                style={{ marginBottom: "10px", marginTop: "10px" }}
              />
              <FormControl fullWidth>
                <InputLabel id="room-available-label">
                  Room Available
                </InputLabel>
                <Select
                  labelId="room-available-label"
                  id="room-available-select"
                  style={{ marginBottom: "10px" }}
                  label="Room Available"
                  value={room.available}
                  onChange={(e) =>
                    setRoom({ ...room, available: e.target.value })
                  }
                >
                  {listAvailable.map((type, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Animals Service</FormLabel>
                <RadioGroup
                  aria-label="animal"
                  name="animal"
                  value={room.animal}
                  onChange={(e) => setRoom({ ...room, animal: e.target.value })}
                >
                  <Box display="flex" alignItems="center">
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </Box>
                </RadioGroup>
              </FormControl>

              <FormControl
                fullWidth
                style={{ textAlign: "center", marginBottom: "10px" }}
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
                  {amenities.map((amenity) => (
                    <Button
                      key={amenity.id}
                      value={room.amenity}
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

              <FormControl fullWidth>
                <FormLabel>Room Days</FormLabel>
                <Box
                  style={{
                    marginTop: "15px",
                  }}
                >
                  <TextField
                    disabled
                    label="Days"
                    type="number"
                    value={room.days}
                    onChange={(e) => setRoom({ ...room, days: e.target.value })}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
              </FormControl>
            </div>

            <div className="box-2">
              <FormControl fullWidth>
                <InputLabel id="room-available-label">Room Type</InputLabel>
                <Select
                  labelId="room-available-label"
                  id="room-available-select"
                  style={{ marginBottom: "10px", marginTop: "10px" }}
                  label="Room Type"
                  value={room.type}
                  onChange={(e) => setRoom({ ...room, type: e.target.value })}
                >
                  {listType.map((type, index) => (
                    <MenuItem key={index} value={type.id}>
                      <i class={type.icon}></i> {type.des}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="room-available-label"> Customer</InputLabel>
                <Select
                  disabled
                  labelId="room-available-label"
                  id="room-available-select"
                  style={{ marginBottom: "10px", marginTop: "10px" }}
                  label="Room Customer"
                  value={room.idCustomer}
                  onChange={(e) =>
                    setRoom({ ...room, idCustomer: e.target.value })
                  }
                >
                  {listCustomer.map((customer, index) => (
                    <MenuItem key={index} value={customer.id}>
                      {customer.nameCustomer}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="room-available-label">Room Location</InputLabel>
                <Select
                  labelId="room-available-label"
                  id="room-available-select"
                  style={{ marginBottom: "10px" }}
                  label="Room Available"
                  value={room.location}
                  onChange={(e) =>
                    setRoom({ ...room, location: e.target.value })
                  }
                >
                  {listLocation.map((location, index) => (
                    <MenuItem key={index} value={location.id}>
                      {location.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="room-available-label">
                  Hotel Location
                </InputLabel>
                <Select
                  labelId="room-available-label"
                  id="room-available-select"
                  style={{ marginBottom: "10px" }}
                  label="Room Available"
                  value={room.roomLocation}
                  onChange={(e) =>
                    setRoom({ ...room, roomLocation: e.target.value })
                  }
                >
                  {hotelByLocal.map((location, index) => (
                    <MenuItem key={index} value={location.address}>
                      {location.address}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Image URL Input */}
              <InputLabel
                style={{
                  color: "#333",
                  textAlign: "center",
                }}
              >
                Images Amenity
              </InputLabel>

              {/* File Upload Input */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
                style={{ marginBottom: "10px", marginTop: "10px" }}
              />

              {/* Image Preview */}
              <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-5">
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
                  <p>No images available</p>
                )}
              </div>
            </div>
          </Box>
          <Box className=" flex justify-end mt-4">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {room.id ? "UPDATE" : "Save"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <ModalDelete
        setDeleteModal={setDeleteModal}
        deleteModal={deleteModal}
        handleDelete={handleDelete}
      />
      <ModalImgs
        setImgsModal={setImgsModal}
        imgsModal={imgsModal}
        imgList={imgList}
      />
    </div>
  );
}

export default ListRoom;
