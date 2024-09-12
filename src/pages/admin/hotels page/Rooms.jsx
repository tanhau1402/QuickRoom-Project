import React, { useState, useEffect, useContext } from "react";
import { listTypeRoom, listAvailable } from "../../../utils/Constants";
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
import ModalDelete from "./ModalDelete";
import { ContextAmenities } from "../../../context/AmenitiesContext";
function Rooms(props) {
  const [listRooms, setListRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [room, setRoom] = useState([]);
  const [listAmenities, setListAmenities] = useState([]);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const amenities = useContext(ContextAmenities);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
  
  console.log(room);
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

  function amenityopen(id) {
       const open = listAmenities.find(a => a == id);
    
       return open ? open : "";
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
                      setOpen(true);
                      setRoom(room);
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
                    onClick={() => {
                      setDeleteModal(true);
                      setDeleteId(room.id);
                    }}
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
              value={room.type}
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
            <InputLabel id="room-available-label">Room Available</InputLabel>
            <Select
              labelId="room-available-label"
              id="room-available-select"
              style={{ marginBottom: "10px" }}
              label="Room Available"
              onChange={(e) => setRoom({ ...room, available: e.target.value })}
            >
              {listAvailable.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
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
                  onClick={() => handleAmenities(amenity.id)}
                  variant={
                    amenityopen(amenity.id) ? "contained" : "outlined"
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
      <ModalDelete
        setDeleteModal={setDeleteModal}
        deleteModal={deleteModal}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Rooms;
