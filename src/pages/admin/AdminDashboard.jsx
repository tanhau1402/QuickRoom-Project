import React, { useState } from "react";
import { menu } from "../../utils/Constants";
import AdminRoutes from "../../routes/AdminRoutes";
import { Link } from "react-router-dom";
function AdminDashboard(props) {
  const [hidden, setHidden] = useState(true);
  const [hidden2, setHidden2] = useState(true);
  const [show,setShow] = useState(null);
  const  handelShow = (element) => {
       if(show == element.id) {
        setShow(null);
       }else {
        setShow(element.id);
       }
  }
  return (
    <div className="admin md:flex ">
      <div className="left bg-gray-500 text-white md:h-[100vh] p-4">
        <div className="flex items-center p-3 relative">
          <i
            onClick={() => setHidden2(!hidden2)}
            class="fa-solid fa-bars text-xl"
          ></i>
          <h1 className={`ml-5 text-xl font-bold ${hidden2 ? "hidden" : ""}`}>
            Start <span className="text-blue-700">Admin</span>
          </h1>
        </div>
        <div className={hidden2 ? "menu" : ""}>
          <Link to="/" className="flex items-center p-3 hover:text-blue-700 hover:bg-white">
            <i class="fa-solid fa-table me-2"></i>
            <p className={`${hidden2 ? "hidden" : ""}`}>Dashboard</p>
          </Link>
          <h5 className={`p-3 text-xs ${hidden2 ? "hidden" : ""}`}>
            UI ELEMENTS
          </h5>

          <Link to="/hotels" className="flex items-center p-3  hover:text-blue-700 hover:bg-white">
            <i class="fa-solid fa-hotel me-2"></i>
            <p className={`${hidden2 ? "hidden" : ""}`}>Hotels</p>
          </Link>
          <h5 className={`p-3 text-xs ${hidden2 ? "hidden" : ""}`}>
            FORMS AND DATAS
          </h5>
          {menu.map((element) => (
            <div>
              <div onClick={() => handelShow(element)} className="flex items-center p-3  hover:text-blue-700 hover:bg-white">
                <i class={element.icon}></i>
                <p className={`${hidden2 ? "hidden" : ""}`}>{element.title}</p>
                <i className={`p-3 text-xs ${hidden2 ? "hidden" : ""}`}  ></i>
              </div>
              <div className={show == element.id ? "" : "hidden"}>
                {element.items.map((item) => (
                  <Link to={item.path} className="flex items-center p-3  hover:text-blue-700 hover:bg-white">
                    <i class="fa-solid fa-caret-right me-2"></i>
                    <p>{item.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <h5 className={`p-3 text-xs ${hidden2 ? "hidden" : ""}`}>PAGES</h5>
          <div className="flex items-center p-3  hover:text-blue-700 hover:bg-white">
            <i class="fa-regular fa-circle-user me-2"></i>
            <p className={`${hidden2 ? "hidden" : ""}`}>User Info</p>
          </div>
        </div>
      </div>

      <div className="right flex-1">
        <div className="header-right flex justify-between items-center p-3">
          <div>
            <h1 className="md:text-3xl text-ms">
              <span className="text-gray-400">Good Morning,</span> John Doe
            </h1>
            <h5 className="text-gray-400">
              Your performance summary this week
            </h5>
          </div>

          <div className="flex items-center">
            <i class="fa-solid fa-magnifying-glass mr-5 text-xl"></i>
            <i class="fa-regular fa-envelope mr-5 text-xl"></i>
            <i class="fa-solid fa-bell mr-5 text-xl"></i>
            <div className="relative">
              <img
                onClick={() => setHidden(!hidden)}
                className="w-10 h-10 rounded-full"
                src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                alt=""
              />
              <div
                className={`text-center absolute right-0 shadow-lg ${
                  hidden ? "hidden" : ""
                }`}
              >
                <div>
                  <img
                    className="w-10 h-10 rounded-full m-auto"
                    src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                    alt=""
                  />
                </div>
                <h3 className="px-2">Allen Moreno</h3>
                <p className="px-2">allenmoreno@gmail.com</p>
                <div className="flex items-center p-2 hover:bg-gray-500 hover:text-white">
                  <i class="fa-solid fa-user mr-2"></i>
                  <p>My profile</p>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-500 hover:text-white">
                  <i class="fa-solid fa-message mr-2"></i>
                  <p>Message</p>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-500 hover:text-white">
                  <i class="fa-regular fa-square-check mr-2"></i>
                  <p>Activity</p>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-500 hover:text-white">
                  <i class="fa-solid fa-circle-question mr-2"></i>
                  <p>FAQ</p>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-500 hover:text-white">
                  <i class="fa-solid fa-right-from-bracket mr-2"></i>
                  <p>Sign out</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-right">
            <AdminRoutes/>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
