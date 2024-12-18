export const  menu = [
    {
        id: 1,
        title: "Booking Page",
        icon: "fa-solid fa-image me-2",
        items : [
            {
               id : 1,
               title:"Bookings",
               path : "/bookings"
            },
            {
                id : 2,
                title : "Payments",
                path : "/payments"
            },
            {
                id: 3,
                title : "Type Business",
                path : "/typebusiness"
            }
        ]
    },
    {
        id : 2,
        title : "Hotels Pages",
        icon : "fa-brands fa-elementor me-2",
        items : [
            {
                id : 1,
                title : "Amenities",
                path : "/amenities"
            },
            {
                id : 2,
                title : "Rooms",
                path : "/rooms"
            },
            {
                id : 3,
                title : "Location",
                path : "/location"
            }
        ]
    },
    {
        id : 3,
        title : "User page",
        icon : "fa-solid fa-table me-2",
        items : [
            {
                id : 1,
                title : "Users",
                path : "/users"
            },
            {
                id : 2,
                title : "Reviews",
                path : "/reviews"
            }
        ]
    }
];

export const listTypeRoom = ["Standard","Single bed room","Twin bed room"];
export const listAvailable = ["Available","Not Available","Repairing"];

export const ROLES = {
    ADMIN: 'admin',        // Quản trị viên cấp cao
    MODERATOR: 'moderator', // Quản trị viên cấp trung (người kiểm duyệt)
    USER: 'user',          // Người dùng thông thường
};