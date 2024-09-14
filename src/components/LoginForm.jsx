import React from "react";

function LoginForm(props) {
  return (
    <div>
      <body class="flex items-center justify-center min-h-screen bg-gray-800">
        <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-3xl font-bold text-center mb-6">
            Log in to QuickRoom
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

            {/* <!-- Remember me checkbox --> */}
            <div class="flex items-center justify-between">
              <label for="remember" class="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  class="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span class="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" class="text-sm text-indigo-600 hover:text-indigo-500">
                Forgot your password?
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
            <button class="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
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
  );
}

export default LoginForm;
