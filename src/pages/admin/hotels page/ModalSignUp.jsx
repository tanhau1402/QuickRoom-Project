import React from "react";
import { signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { addDocument } from "../../../services/FirebaseService";
import { googleProvider,auth } from "../../../services/firebase";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
function ModalSignUp({setSignUpModal,signUpModal}) {
  const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
      
        const newCustomer = {
                nameCustomer: result.user.displayName,
                email: result.user.email,
                imgUrl: result.user.photoURL,
                role: "user",  // Vai trò mặc định
            };

            // Thêm khách hàng mới vào cơ sở dữ liệu
            await addDocument('Customers', newCustomer);
          alert("dang nhap thanh cong")  
    } catch (error) {
     
    }
};
  return (
    <div>
      <Dialog
        open={signUpModal}
        onClose={setSignUpModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
         {/* Nút đóng modal */}
         <button
          style={{
            position: 'absolute',
            right: '7px',
            top: '0px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '30px',
            color: 'red'
          }}
          onClick={() => setSignUpModal(false)} // Gọi hàm đóng modal
        >
            <i class="fa-solid fa-circle-xmark"></i>
        </button>
       <div>
      <body class="flex items-center justify-center ">
        <div class="w-full max-w-md rounded-lg shadow-lg p-8">
          <h2 class="text-3xl font-bold text-center mb-6">
            Sign Up to QuickRoom
          </h2>
          <form action="#" method="POST" class="space-y-4">
            {/* <!-- Email Input --> */}
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* <!-- Password Input --> */}
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="••••••••"
                required
              />
            </div>
            {/* <!-- Password Input Second Time --> */}
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Type Again Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            {/* <!-- Remember me checkbox --> */}
            <div class="flex items-center justify-between">
              <label for="remember" class="flex items-center">
                <span class="ml-2 text-sm text-gray-600">Bạn đã có tài khoản</span>
              </label>
              <a href="#" class="text-sm text-indigo-600 hover:text-indigo-500">
                Đăng nhập
              </a>
            </div>

            {/* <!-- Submit button --> */}
            <div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* <!-- Separator --> */}
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* <!-- Social login buttons --> */}
          <div class="flex space-x-4">
            <button onClick={signInWithGoogle} class="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <i class="fa-brands fa-google h-5 w-5 mr-2  p-1"></i>
              Google
            </button>
            <button class="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <i class="fa-brands fa-facebook h-5 w-5 mr-2  p-1 "></i>
              Facebook
            </button>
          </div>
        </div>
      </body>
    </div>
      </Dialog>
    </div>
  );
}

export default ModalSignUp;


