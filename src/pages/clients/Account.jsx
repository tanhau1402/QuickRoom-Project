import { React, useContext } from "react";
import { CustomerLoginContext } from "../../context/CustomerLoginContext";
import { Link } from "react-router-dom";
function Account(props) {
    const { isLogin, setIsLogin } = useContext(CustomerLoginContext);

    return (
        <div>
            <div className="p-5">
                <div className="p-5  mx-auto container grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                    <p className="text-2xl font-bold">Account</p>
                    <p className="text-2xl">
                        <span className="font-bold">{isLogin.nameCustomer}</span>, {isLogin.id}
                    </p>
                </div>
                <div className=" container  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 mx-auto">
                    <Link to={`information`} className="border rounded-lg shadow-md p-5">
                    <i class="fa-solid fa-user-gear text-2xl"></i>
                        <p className="text-xl font-bold mt-2">Information</p>
                        <p className="font-thin">
                            We're hiding some account information to protect your identity.
                        </p>
                    </Link>
                    <Link to={`listuserbooking`} className="border rounded-lg shadow-md p-5">
                        <i class="fa-solid fa-shield-halved text-2xl"></i>
                        <p className="text-xl font-bold mt-2">Login and security</p>
                        <p className="font-thin">We regularly review accounts to ensure maximum safety.</p>
                    </Link>
                    <Link to={`listcustomerbooking`} className="border rounded-lg shadow-md p-5">
                        <i class="fa-regular fa-money-bill-1 text-2xl"></i>
                        <p className="text-xl font-bold mt-2">Receive reservations</p>
                        <p className="font-thin">We regularly review accounts to ensure maximum safety.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Account;
