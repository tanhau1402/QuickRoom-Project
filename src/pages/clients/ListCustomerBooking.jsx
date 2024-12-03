import React, { useState, useEffect, useContext } from "react";
import { ContextLogin } from "../../context/LoginContext";
import { CustomerLoginContext } from "../../context/CustomerLoginContext";
import { getObjectBy } from "../../repository/Repository";
import { ContextRooms } from "../../context/RoomContext";
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
import { fetchDocuments } from "../../services/FirebaseService";


function ListCustomerBooking(props) {
    const [listBooking, setListBooking] = useState([]);
    const { isLogin, setIsLogin } = useContext(CustomerLoginContext);
    const rooms = useContext(ContextRooms);

    const [update, setUpdate] = useState(false);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0); // Trang hiện tại
    const [rowsPerPage, setRowsPerPage] = useState(5); // Số lượng dòng mỗi trang
    const [searchInput, setSearchInput] = useState("");
    const listCustomer = useContext(ContextLogin);
    const [errors, setErrors] = useState({ name: "", icon: "" });
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        const fetchData = async () => {
            const bookingData = await fetchDocuments("listBooking");
            setListBooking(bookingData);
        };
        fetchData();
    }, [update]);

    const filteredBooking = listBooking.filter((booking) => {
        
        const isIdCustomerMatch = booking.idCustomer.toString() === isLogin.id.toString();
      
        
      
        return isIdCustomerMatch;
      });

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
            </header>
            {/* Table */}
            <TableContainer sx={{ padding: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Booking ID</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">Guests</TableCell>
                            <TableCell align="center">Check in</TableCell>
                            <TableCell align="center">Check out</TableCell>
                            
                            <TableCell align="center">Total price</TableCell>
                           
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
                                        { getObjectBy(booking.roomId,rooms)?.roomLocation}
                                    </TableCell>
                                    <TableCell align="center">{booking.persons} <i class="fa-solid fa-person"></i></TableCell>
                                    <TableCell align="center">{booking.startDay}</TableCell>
                                    <TableCell align="center">
                                        {booking.endDay}
                                    </TableCell>
                                   
                                    <TableCell align="center">{booking.totalPrice}</TableCell>


                                    
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
        </div>
    );
}

export default ListCustomerBooking;