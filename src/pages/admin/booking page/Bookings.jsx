import React, { useState, useEffect, useContext } from "react";
import { ContextLogin } from "../../../context/LoginContext";
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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import {
    addDocument,
    fetchDocuments,
    deleteDocument,
    updateDocument,
} from "../../../services/FirebaseService";
import ModalDelete from "../hotels page/ModalDelete";


function Bookings(props) {
    const [listBooking, setListBooking] = useState([]);
    const [booking, setBooking] = useState([]);
    const [update, setUpdate] = useState(false);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0); // Trang hiện tại
    const [rowsPerPage, setRowsPerPage] = useState(5); // Số lượng dòng mỗi trang
    const [searchInput, setSearchInput] = useState("");
    const listCustomer = useContext(ContextLogin);
    const [errors, setErrors] = useState({ name: "", icon: "" });


    const [deleteId, setDeleteId] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        const fetchData = async () => {
            const bookingData = await fetchDocuments("listBooking");
            setListBooking(bookingData);
        };
        fetchData();
    }, [update]);

    const validate = () => {
        const newErrors = { idCustomer: "", roomId: "", persons: "", startDay: "", endDay: "", totalPrice: "" };

        newErrors.idCustomer = booking.idCustomer ? "" : "idCustomer is required";

        newErrors.roomId = booking.roomId ? "" : "roomId is required";
        newErrors.persons = booking.persons ? "" : "persons is required";
        newErrors.startDay = booking.startDay ? "" : "startDay is required";
        newErrors.endDay = booking.endDay ? "" : "endDay is required";
        newErrors.totalPrice = booking.totalPrice ? "" : "totalPrice is required";
        setErrors(newErrors);
        return !newErrors.idCustomer && !newErrors.roomId;
    };

    const handleSubmit = async () => {
        try {

            if (validate()) {
                // Kiểm tra xem room đã tồn tại hay chưa
                if (booking.id) {
                    // Nếu room đã có id, cập nhật thông tin và hình ảnh mới
                    await updateDocument("listBooking", booking.id, booking);
                } else {
                    // Nếu room chưa có id, thêm room mới với hình ảnh mới
                    await addDocument("listBooking", booking);
                }
            }

            // Sau khi xử lý xong, cập nhật lại danh sách và đóng modal
            setUpdate(!update);
            handleClose();
        } catch (error) {
            console.error("Error submitting room:", error);
        }
    };

    const filteredBooking = listBooking.filter(
        (booking) =>

            booking.persons.toString().includes(searchInput) ||
            booking.idCustomer.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleDelete = async () => {
        if (deleteId) {
            await deleteDocument("listBooking", deleteId.id);
            setUpdate(!update);
            setDeleteModal(false);
        }
    };

    const clearBooking = () => {
        handleOpen();
        setBooking({});
    };

    const handleOpenEdit = (booking) => {
        setOpen(true);
        setBooking(booking);
    };

    return (
        <div>
            <header className="grid grid-cols-12 gap-4 p-4">
                <div className="col-span-3 flex items-center">List Booking</div>
                <div className="col-span-6 flex">
                    <input
                        className="flex-1 p-2 border border-gray-300 rounded-l-md"
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search booking..."
                    />
                </div>
                <div className="col-span-3 flex justify-end">
                    <Button variant="contained" onClick={clearBooking} color="success">
                        Add Booking
                    </Button>
                </div>
            </header>
            {/* Table */}
            <TableContainer sx={{ padding: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Booking ID</TableCell>
                            <TableCell align="center">Customer</TableCell>
                            <TableCell align="center">Guests</TableCell>
                            <TableCell align="center">Check in</TableCell>
                            <TableCell align="center">Check out</TableCell>
                            <TableCell align="center">Room ID</TableCell>
                            <TableCell align="center">Total price</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredBooking
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((booking, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">
                                        {page * rowsPerPage + index + 1}
                                    </TableCell>
                                    <TableCell align="center">
                                        {booking.idCustomer}
                                    </TableCell>
                                    <TableCell align="center">{booking.persons} <i class="fa-solid fa-person"></i></TableCell>
                                    <TableCell align="center">{booking.startDay}</TableCell>
                                    <TableCell align="center">
                                        {booking.endDay}
                                    </TableCell>
                                    <TableCell align="center">{booking.roomId}</TableCell>
                                    <TableCell align="center">{booking.totalPrice}</TableCell>


                                    <TableCell align="center" className="text-nowrap">

                                        <Button
                                            onClick={() => handleOpenEdit(booking)}
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
                                                setDeleteId(booking);
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
                    count={listBooking.length}
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
                    <h2 className="mb-4">{booking.id ? "EDIT BOOKING" : "ADD NEW BOOKING"}</h2>
                    <Box className=" grid grid-cols-1  md:grid-cols-1 lg:grid-cols-1 gap-5 ">
                        <div className="box-1">
                            <FormControl fullWidth>
                                <InputLabel id="room-available-label">Booking Customer</InputLabel>
                                <Select
                                    labelId="room-available-label"
                                    id="room-available-select"
                                    style={{ marginBottom: "10px", marginTop: "10px" }}
                                    label="Booking customer"
                                    value={booking.idCustomer}
                                    error={!!errors.idCustomer}
                                    helperText={errors.idCustomer}
                                    onChange={(e) =>
                                        setBooking({ ...booking, idCustomer: e.target.value })
                                    }
                                >
                                    {listCustomer.map((customer, index) => (
                                        <MenuItem key={index} value={customer.id}>
                                            {customer.nameCustomer}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                label="Room ID"
                                variant="outlined"
                                value={booking.roomId}
                                onChange={(e) =>
                                    setBooking({ ...booking, roomId: e.target.value })
                                }
                                style={{ marginBottom: "10px", marginTop: "10px" }}
                                error={!!errors.roomId}
                                helperText={errors.roomId}
                            />
                            <TextField
                                fullWidth
                                type="number"
                                label="Guests"
                                variant="outlined"
                                value={booking.persons}
                                onChange={(e) =>
                                    setBooking({ ...booking, persons: e.target.value })
                                }
                                style={{ marginBottom: "10px", marginTop: "10px" }}
                                error={!!errors.persons}
                                helperText={errors.persons}
                            />
                            <TextField
                                fullWidth
                                type="date"
                                label="Check in"
                                variant="outlined"
                                value={booking.startDay}
                                onChange={(e) =>
                                    setBooking({ ...booking, startDay: e.target.value })
                                }
                                style={{ marginBottom: "10px", marginTop: "10px" }}
                                error={!!errors.startDay}
                                helperText={errors.startDay}
                            />
                            <TextField
                                fullWidth
                                type="date"
                                label="Check out"
                                variant="outlined"
                                value={booking.endDay}
                                onChange={(e) =>
                                    setBooking({ ...booking, endDay: e.target.value })
                                }
                                style={{ marginBottom: "10px", marginTop: "10px" }}
                                error={!!errors.endDay}
                                helperText={errors.endDay}
                            />
                            <TextField
                                fullWidth

                                label="Total price"
                                variant="outlined"
                                value={booking.totalPrice}
                                onChange={(e) =>
                                    setBooking({ ...booking, totalPrice: e.target.value })
                                }
                                style={{ marginBottom: "10px", marginTop: "10px" }}
                                error={!!errors.totalPrice}
                                helperText={errors.totalPrice}
                            />







                        </div>
                    </Box>
                    <Box className=" flex justify-end mt-4">
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            {booking.id ? "UPDATE" : "Save"}
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

export default Bookings;
