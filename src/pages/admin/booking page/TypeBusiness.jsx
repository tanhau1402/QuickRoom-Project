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

import ModalDelete from "../hotels page/ModalDelete";

function TypeBusiness(props) {
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({ name: "", des: "" });

    const [type, setType] = useState({});
    const [listType, setListType] = useState([]);

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
            const listTypeData = await fetchDocuments("listTypeBusiness");
            setListType(listTypeData);
        };
        fetchData();
    }, [update]);

    const clearType = () => {
        handleOpen();
        setType({});
    };

    const handleSubmit = async () => {
        if (validate()) {
            if (type.id) {
                await updateDocument("listTypeBusiness", type.id, type);
            } else {
                await addDocument("listTypeBusiness", type);
            }
            setUpdate(!update);
            handleClose();
        }
    };

    const handleDelete = async () => {
        if (deleteId) {
            await deleteDocument("listTypeBusiness", deleteId);
            setUpdate(!update);
            setDeleteModal(false);
        }
    };

    const filteredType = listType.filter(
        (type) =>
            type.id.toLowerCase().includes(searchInput.toLowerCase()) ||
            type.des.toLowerCase().includes(searchInput.toLowerCase())
    );

    const validate = () => {
        const newErrors = { icon: "", des: "" };

        newErrors.icon = type.icon ? "" : "Name is required";

        newErrors.des = type.des ? "" : "Des is required";

        setErrors(newErrors);
        return !newErrors.icon && !newErrors.des;
    };
    return (
        <div>
            <header className="grid grid-cols-12 gap-4 p-4">
                <div className="col-span-3 flex items-center text-2xl">
                    List Type Business
                </div>
                <div className="col-span-6 flex">
                    <input
                        className="flex-1 p-2 border border-gray-300 rounded-l-md"
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search type..."
                    />
                    <button className="p-2 bg-emerald-600 text-white rounded-r-md">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                <div className="col-span-3 flex justify-end">
                    <Button variant="contained" color="success" onClick={clearType}>
                        Add Type Business
                    </Button>
                </div>
            </header>
            {/* Table */}
            <TableContainer sx={{ padding: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Type Business ID</TableCell>
                            <TableCell align="center">Icon</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredType
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((type, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">
                                        {page * rowsPerPage + index + 1}
                                    </TableCell>
                                    <TableCell align="center">
                                    {" "}
                                        <i className={type.icon}></i></TableCell>

                                    <TableCell align="center">{type.des}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            onClick={() => {
                                                setOpen(true);
                                                setType(type);
                                                setEditId(type.deleteId);
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
                                                setDeleteId(type.id);
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
                    count={listType.length}
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
                        {type.id ? "EDIT TYPE" : "ADD NEW TYPE"}
                    </h2>
                    <TextField
                        fullWidth
                        label="Icon"
                        variant="outlined"
                        value={type.icon}
                        onChange={(e) => setType({ ...type, icon: e.target.value })}
                        style={{ marginBottom: "10px" }}
                        error={!!errors.icon}
                        helperText={errors.icon}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        value={type.des}
                        onChange={(e) => setType({ ...type, des: e.target.value })}
                        style={{ marginBottom: "10px" }}
                        error={!!errors.des}
                        helperText={errors.des}
                    />
                    <Box className="flex justify-end mt-4">
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            {type.id ? "UPDATE" : "Save"}
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

export default TypeBusiness;