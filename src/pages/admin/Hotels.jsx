import React, { useState, useEffect, useContext } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  Paper,
} from "@mui/material";

import {
  addDocument,
  fetchDocuments,
  deleteDocument,
  updateDocument,
} from "../../services/FirebaseService";

import ModalDelete from "../admin/hotels page/ModalDelete";

import { ContextLocation } from "../../context/LocationContext";

function Hotels(props) {
  const [listLocation, setListLocation] = useState([]);
  const locations = useContext(ContextLocation);

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({ name: "", des: "" });

  const [hotel, setHotel] = useState({});
  const [listHotel, setListHotel] = useState([]);

  const [page, setPage] = useState(0); // Trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [update, setUpdate] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const listHotelData = await fetchDocuments("listHotels");
      setListHotel(listHotelData);
    };
    fetchData();
  }, [update]);

  const handleSubmit = async () => {
    if (validate()) {
      if (hotel.id) {
        await updateDocument("listHotels", hotel.id, hotel);
      } else {
        await addDocument("listHotels", hotel);
      }
      setUpdate(!update);
      handleClose();
    }
  };
  const validate = () => {
    const newErrors = { name: "", address: "", city: "", description: "" };

    newErrors.name = hotel.name ? "" : "Name is required";
    newErrors.address = hotel.address ? "" : "Address is required";
    newErrors.city = hotel.city ? "" : "City is required";
    newErrors.description = hotel.description ? "" : "Name is required";

    setErrors(newErrors);
    return !newErrors.name && !newErrors.des;
  };
  const filteredHotels = listHotel.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      hotel.city.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  const clearHotel = () => {
    handleOpen();
    setHotel({});
  };
  const handleDelete = async () => {
    if (deleteId) {
      await deleteDocument("listHotels", deleteId);
      setUpdate(!update);
      setDeleteModal(false);
    }
  };
const getNameLocal = (id) => {
  const local = locations.find(a => a.id == id);
  return local ? local.name : "";
}
  return (
    <div>
      <header className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-3 flex items-center text-2xl">List Hotels</div>
        <div className="col-span-6 flex">
          <input
            className="flex-1 p-2 border border-gray-300 rounded-l-md"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search hotel..."
          />
          <button className="p-2 bg-emerald-600 text-white rounded-r-md">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="col-span-3 flex justify-end">
          <Button variant="contained" color="success" onClick={clearHotel}>
            Add Hotel
          </Button>
        </div>
      </header>
      {/* Table */}
      <TableContainer sx={{ padding: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Hotel ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">City</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHotels
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((hotel, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell align="center">{hotel.name}</TableCell>
                  <TableCell align="center">{hotel.address}</TableCell>
                  <TableCell align="center">{getNameLocal(hotel.city)}</TableCell>
                  <TableCell align="center">{hotel.description}</TableCell>

                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        setOpen(true);
                        setHotel(hotel);
                        setEditId(hotel.deleteId);
                      }}
                      sx={{ padding: "10px", mr: 1 }}
                      variant="contained"
                      color="primary"
                    >
                      <i class="fa-regular fa-pen-to-square"></i>
                    </Button>
                    <Button
                      onClick={() => {
                        setDeleteModal(true);
                        setDeleteId(hotel.id);
                      }}
                      sx={{ padding: "10px" }}
                      variant="contained"
                      color="error"
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
          count={listHotel.length}
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
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="mb-4">{hotel.id ? "EDIT Hotel" : "ADD NEW HOTEL"}</h2>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={hotel.name}
            onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
            style={{ marginBottom: "10px" }}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            value={hotel.address}
            onChange={(e) => setHotel({ ...hotel, address: e.target.value })}
            style={{ marginBottom: "10px" }}
            error={!!errors.des}
            helperText={errors.des}
          />
          <FormControl fullWidth>
            <InputLabel id="room-available-label">City</InputLabel>
            <Select
              labelId="room-city-label"
              id="room-city-select"
              style={{ marginBottom: "10px" }}
              label="City"
              value={hotel.city}
              onChange={(e) => setHotel({ ...hotel, city: e.target.value })}
            >
              {locations.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={hotel.description}
            onChange={(e) =>
              setHotel({ ...hotel, description: e.target.value })
            }
            style={{ marginBottom: "10px" }}
            error={!!errors.description}
            helperText={errors.description}
          />
          <Box className="flex justify-end mt-4">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {hotel.id ? "UPDATE" : "Save"}
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

export default Hotels;
