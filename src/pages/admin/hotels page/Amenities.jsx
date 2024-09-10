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
  Paper,
} from "@mui/material";
import { addDocument,fetchDocuments,deleteDocument,updateDocument } from "../../../services/FirebaseService";
import ModalDelete from "./ModalDelete";

function Amenities() {
  const [open, setOpen] = useState(false);
  const [amenity,setAmenity] = useState({});
   const [amenities, setAmenities] = useState([]);
  const [errors, setErrors] = useState({ name: '', icon: '' });
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId,setDeleteId] = useState(null);
  const [editId,setEditId] = useState(null);
  const [update,setUpdate] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
        const amenitiesData = await fetchDocuments('amenities');
       setAmenities(amenitiesData);
    };
    fetchData();
}, [update]);

  const validate = () => {
    const newErrors = { name: '', icon: '' };

    newErrors.name = amenity.name ? "" : 'Name is required';
  
    newErrors.icon = amenity.icon ? "" : 'Icon is required';
    
    setErrors(newErrors);
    return !newErrors.name && !newErrors.icon;
  };
  const handleSubmit = async () => {
    if (validate()) {
      if(amenity.id) {
        await updateDocument("amenities",amenity.id,amenity);
      }else {
        await  addDocument("amenities",amenity);
      }  
      setUpdate(!update); 
      handleClose();
    }
  };
  const handleDelete = async () => {
    if(deleteId) {
      await deleteDocument("amenities",deleteId);
      setUpdate(!update);
       setDeleteModal(false);
    }
  };

const clearAmenity = () => {
   handleOpen();
   setAmenity({});
}
  return (
    <div>
      <header className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-3 flex items-center">List Amenities</div>
        <div className="col-span-6 flex">
          <input
            className="flex-1 p-2 border border-gray-300 rounded-l-md"
            type="text"
            placeholder="Search amenities..."
          />
          <button className="p-2 bg-emerald-600 text-white rounded-r-md">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="col-span-3 flex justify-end">
          <Button variant="contained" color="success" onClick={clearAmenity}>
            Add Amenity
          </Button>
        </div>
      </header>

      {/* Table */}
      <TableContainer  sx={{ padding: 2 }}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell align = "center" >Name</TableCell>
              <TableCell align = "center">Icon</TableCell>
              <TableCell align = "center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {amenities.map((amenity, index) => (
              <TableRow key={index}>
                <TableCell align = "center">{amenity.name}</TableCell>
                <TableCell align = "center">{amenity.icon}</TableCell>
                <TableCell align = "center">
                  <Button onClick={() => {setOpen(true) ; setAmenity(amenity); setEditId(amenity.deleteId)} }   sx={{ padding: '10px',mr:1 }} variant="contained" color="primary">
                  <i class="fa-regular fa-pen-to-square"></i>
                  </Button>
                  <Button onClick={() => {setDeleteModal(true) ; setDeleteId(amenity.id)} } sx={{ padding: '10px' }} variant="contained" color="error">
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
        <h2 className="mb-4">
           {amenity.id ? "EDIT AMENITY" : "ADD NEW AMENITY"}
        </h2>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={amenity.name}
          onChange={(e) => setAmenity({ ...amenity, name: e.target.value })}
          style={{ marginBottom: "10px" }}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          label="Icon"
          variant="outlined"
          value={amenity.icon}
          onChange={(e) => setAmenity({ ...amenity, icon: e.target.value })}
          style={{ marginBottom: "10px" }}
          error={!!errors.icon}
          helperText={errors.icon}
        />
        <Box className="flex justify-end mt-4">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
           { amenity.id ? "UPDATE" : "Save"}
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

export default Amenities;

