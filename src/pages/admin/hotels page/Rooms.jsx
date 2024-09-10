import React, { useState, useEffect } from "react";
import {
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
} from "@mui/material";
import {
  addDocument,
  fetchDocuments,
  deleteDocument,
  updateDocument,
} from "../../../services/FirebaseService";

import Amenities from "./Amenities";
import ModalDelete from "./ModalDelete";

function Rooms(props) {
  const [listRooms, setListRooms] = useState([]);
  const [listTypeRoom, setListTypeRoom] = useState(["1", "2", "3"]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [room, setRoom] = useState([]);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setSelectedRoomType(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const amenitiesData = await fetchDocuments("amenities");
      setAmenities(amenitiesData);
    };
    fetchData();
  }, [update]);
  useEffect(() => {
    const fetchData = async () => {
      const roomsData = await fetchDocuments("listRooms");
      setListRooms(roomsData);
    };
    fetchData();
  }, [update]);

  const handleSubmit = async () => {
    if (room.id) {
      await updateDocument("listRooms", room.id, room);
    } else {
      await addDocument("listRooms", room);
    }
    setUpdate(!update);
    handleClose();
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteDocument("listRooms", deleteId);
      setUpdate(!update);
      setDeleteModal(false);
    }
  };
  const clearRoom = () => {
    handleOpen();
    setRoom({});
 }
  return (
    <div>
      <header className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-3 flex items-center">List Rooms</div>
        <div className="col-span-6 flex">
          <input
            className="flex-1 p-2 border border-gray-300 rounded-l-md"
            type="text"
            placeholder="Search rooms..."
          />
          <button className="p-2 bg-emerald-600 text-white rounded-r-md">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="col-span-3 flex justify-end">
          <Button variant="contained" onClick={clearRoom} color="success">
            Add Room
          </Button>
        </div>
      </header>
      {/* Table */}
      <TableContainer sx={{ padding: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Room Type</TableCell>
              <TableCell align="center">Price Per Night</TableCell>
              <TableCell align="center">Available</TableCell>
              <TableCell align="center">Amenity</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listRooms.map((room, index) => (
              <TableRow key={index}>
                <TableCell align="center">{room.type}</TableCell>
                <TableCell align="center">{room.price_per_night}</TableCell>
                <TableCell align="center">{room.available}</TableCell>
                <TableCell align="center">{room.amenity}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      setOpen(true); setRoom(room)
                    }}
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
                    onClick={() => {setDeleteModal(true) ; setDeleteId(room.id)} }
                  >
                    <i class="fa-solid fa-trash"></i>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="mb-4">{room.id ? "EDIT ROOM" : "ADD NEW ROOM"}</h2>
          <FormControl fullWidth>
            <InputLabel id="room-type-label">Room Type</InputLabel>
            <Select
              labelId="room-type-label"
              id="room-type-select"
              value={selectedRoomType}
              label="Room Type"
              onChange={(e) => setRoom({ ...room, type: e.target.value })}
            >
              {listTypeRoom.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Price per night"
            variant="outlined"
            value={room.price_per_night}
            onChange={(e) =>
              setRoom({ ...room, price_per_night: e.target.value })
            }
            style={{ marginBottom: "10px", marginTop: "10px" }}
          />
          <FormControl fullWidth>
            <InputLabel id="room-availability-label">
              Room Availability
            </InputLabel>
            <Select
              labelId="room-availability-label"
              id="room-availability-select"
              value={room.available}
              label="Room Availability"
              onChange={(e) => setRoom({ ...room, available: e.target.value })}
              style={{ marginBottom: "10px" }}
            >
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="not_available">Not Available</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="room-type-amenity">Room Amenity</InputLabel>
            <Select
              labelId="room-type-amenity"
              id="room-amenity-select"
              value={room.amenity}
              label="Room Amenity"
              onChange={(e) => setRoom({ ...room, amenity: e.target.value })}
            >
              {amenities.map((amenity) => (
                <MenuItem key={amenity.id} value={amenity.name}>
                  {amenity.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box className="flex justify-end mt-4">
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
      <ModalDelete setDeleteModal={setDeleteModal} deleteModal={deleteModal} handleDelete={handleDelete} />

    </div>
  );
}

export default Rooms;
