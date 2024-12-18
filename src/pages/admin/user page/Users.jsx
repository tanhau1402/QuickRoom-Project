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
    InputLabel,
    Select,
    MenuItem,
    FormControl,
} from "@mui/material";

import {
    addDocument,
    fetchDocuments,
    deleteDocument,
    updateDocument,
    addDocumentById,
} from "../../../services/FirebaseService";

import ModalDelete from "../hotels page/ModalDelete";
import { ROLES } from "../../../utils/Constants";
import { auth, googleProvider } from "../../../services/firebase";
const inter = { name: "", des: "" };
function Users(props) {
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState(inter);

    const [user, setUser] = useState(inter);
    const [listUser, setListUser] = useState([]);

    const [page, setPage] = useState(0); // Trang hiện tại
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [deleteModal, setDeleteModal] = useState(false);
    const [update, setUpdate] = useState(false);

    const [deleteId, setDeleteId] = useState(null);
    const [editId, setEditId] = useState(null);

    const [searchInput, setSearchInput] = useState("");

    const [imgUpload, setImgUpload] = useState([]);
    const [preViewImg, setPreviewImg] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const listUserData = await fetchDocuments("Customers");
            setListUser(listUserData);
        };
        fetchData();
    }, [update]);

    const clearUser = () => {
        handleOpen();
        setUser(inter);
        setImgUpload({});
        setPreviewImg({});
    };

    const validate = () => {
        const newErrors = inter;

        newErrors.id = user.id ? "" : "ID is required";

        newErrors.nameCustomer = user.nameCustomer ? "" : "Name is required";

        setErrors(newErrors);
        return !newErrors.id && !newErrors.nameCustomer;
    };

    const handleSubmit = async () => {
        if (validate()) {
            if (user.id) {
                await updateDocument("Customers", user.id, user, imgUpload);
            } else {
                await addDocumentById("Customers", user.id, user, imgUpload);
            }
            setUpdate(!update);
            handleClose();
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImgUpload(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPreviewImg(reader.result);
            };
            setImgUpload(file);
            return false;
        }
    };

    const handleDelete = async () => {
        if (deleteId) {
            await deleteDocument("Customers", deleteId);
            setUpdate(!update);
            setDeleteModal(false);
        }
    };

    const filteredUser = listUser.filter(
        (user) =>
            user.nameCustomer.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.id.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.role.toLowerCase().includes(searchInput.toLowerCase())
    );
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const handleEdit = (user) => {
        setOpen(true);
        setUser(user);
        setEditId(user.deleteId);
        setPreviewImg(user.imgUrl);
    }

    return (
        <div>
            <header className="grid grid-cols-12 gap-4 p-4">
                <div className="col-span-3 flex items-center text-2xl">List User</div>
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
                    <Button variant="contained" disabled color="success" onClick={clearUser}>
                        Add User
                    </Button>
                </div>
            </header>
            {/* Table */}
            <TableContainer  sx={{ padding: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">User ID</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Role</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUser
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">
                                        {page * rowsPerPage + index + 1}
                                    </TableCell>
                                    <TableCell align="center">{user.id}</TableCell>
                                    <TableCell align="center">{user.nameCustomer}</TableCell>
                                    <TableCell align="center">{user.role}</TableCell>
                                    <TableCell align="center">
                                        <img
                                            src={user.imgUrl}
                                            alt="userImg"
                                            style={{ width: "50px", height: "50px"}}
                                        />
                                    </TableCell>

                                    <TableCell align="center">
                                        <Button
                                            onClick={() => handleEdit(user)}
                                            sx={{ padding: "10px", mr: 1 }}
                                            variant="contained"
                                            color="primary"
                                        >
                                            <i class="fa-regular fa-pen-to-square"></i>
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setDeleteModal(true);
                                                setDeleteId(user.id);
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
                    count={listUser.length}
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
                <Box component="form" onSubmit={handleSubmit} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="mb-4">{user.id ? "EDIT USER" : "ADD NEW USER"}</h2>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        name="id"
                        value={user.id}
                        onChange={handleInput}
                        style={{ marginBottom: "10px" }}
                        disabled={!!user.id} // Kiểm tra xem `user.id` có tồn tại không, nếu có thì sẽ disabled
                    />
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        value={user.nameCustomer}
                        name="nameCustomer"
                        onChange={handleInput}
                        style={{ marginBottom: "10px" }}
                        error={!!errors.nameCustomer}
                        helperText={errors.nameCustomer}
                    />

                    <FormControl fullWidth style={{ marginBottom: "10px" }}>
                        <InputLabel id="role-select-label">Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            id="role-select"
                            value={user.role}
                            label="Role"
                            onChange={handleInput}
                            name="role"
                        >
                            {Object.values(ROLES).map((role) => (
                                <MenuItem key={role} value={role}>
                                    {role}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <input
                            accept="image/*"
                            type="file"
                            onChange={(e) => handleImageUpload(e)}
                        />

                        <div className=" mx-auto mt-3">
                            <img
                                src={preViewImg}
                                alt={`Uploaded `}
                                style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    marginBottom: "10px",
                                }}
                            />
                        </div>
                    </FormControl>

                    <Box className="flex justify-end mt-4">
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            {user.id ? "UPDATE" : "Save"}
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

export default Users;
