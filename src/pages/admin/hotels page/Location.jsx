import React, { useState, useEffect, useContext } from "react";

import {
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
} from "../../../services/FirebaseService";

import ModalDelete from "./ModalDelete";

function Location(props) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({ name: "", des: "" });

  const [location, setLocation] = useState({});
  const [listLocation, setListLocation] = useState([]);

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
      const listLocationData = await fetchDocuments("listLocations");
      setListLocation(listLocationData);
    };
    fetchData();
  }, [update]);
  const clearLocation = () => {
    handleOpen();
    setLocation({});
  };
  const validate = () => {
    const newErrors = { name: "", icon: "" };

    newErrors.name = location.name ? "" : "Name is required";

    newErrors.des = location.des ? "" : "Des is required";

    setErrors(newErrors);
    return !newErrors.name && !newErrors.des;
  };
  const handleSubmit = async () => {
    if (validate()) {
      if (location.id) {
        await updateDocument("listLocations", location.id, location);
      } else {
        await addDocument("listLocations", location);
      }
      setUpdate(!update);
      handleClose();
    }
  };
  const handleDelete = async () => {
    if (deleteId) {
      await deleteDocument("listLocations", deleteId);
      setUpdate(!update);
      setDeleteModal(false);
    }
  };
  const filteredLocations = listLocation.filter(
    (location) =>
      location.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      location.des.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <header className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-3 flex items-center text-2xl">
          List Location
        </div>
        <div className="col-span-6 flex">
          <input
            className="flex-1 p-2 border border-gray-300 rounded-l-md"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search location..."
          />
          <button className="p-2 bg-emerald-600 text-white rounded-r-md">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="col-span-3 flex justify-end">
          <Button variant="contained" color="success" onClick={clearLocation}>
            Add Location
          </Button>
        </div>
      </header>
      {/* Table */}
      <TableContainer sx={{ padding: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Location ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLocations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((location, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell align="center">{location.name}</TableCell>
                  <TableCell align="center">{location.des}</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        setOpen(true);
                        setLocation(location);
                        setEditId(location.deleteId);
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
                        setDeleteId(location.id);
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
          count={listLocation.length}
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
          <h2 className="mb-4">
            {location.id ? "EDIT LOCATION" : "ADD NEW LOCATION"}
          </h2>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={location.name}
            onChange={(e) => setLocation({ ...location, name: e.target.value })}
            style={{ marginBottom: "10px" }}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={location.des}
            onChange={(e) => setLocation({ ...location, des: e.target.value })}
            style={{ marginBottom: "10px" }}
            error={!!errors.des}
            helperText={errors.des}
          />
          <Box className="flex justify-end mt-4">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {location.id ? "UPDATE" : "Save"}
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

export default Location;
