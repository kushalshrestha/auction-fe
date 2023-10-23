//Touched By Pratima

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { notifyError, notifySuccess } from '../helpers/notification';
import { httpPost, httpGet } from '../api';
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    // username: '',
    password: '',
    confirmPassword: '',
    roles: 'CUSTOMER',
  });

  const navigate = useNavigate();

  const handleSignupInputChange = (e) => {
    let { value } = e.target;
    if (e.target.type === 'radio') {
      value = e.target.id;
      setFormData({
        ...formData,
        roles: value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: value,
      });
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.password !== formData.confirmPassword) {
      notifyError('Password and Confirm Password do not match');
      return;
    }

    // copy of formData without the "confirmPassword" property
    const { confirmPassword, ...formDataWithoutConfirmPassword } = formData;
    console.log(formDataWithoutConfirmPassword);

    try {
      const res = await httpPost({
        url: '/users',
        data: formDataWithoutConfirmPassword,
      });
      if (res.data.message == 'User Created Successfully') {
        notifySuccess(res.data.message);
      }
      navigate('/sign-in', { replace: true });
    } catch (err) {
      notifyError('Email Already Exist');
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline">Secure Online Auction System</h1>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=red&shade=600"
            alt="SOA System"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create An Account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSignupSubmit}>
            {/* Email div start */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email Address
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={handleSignupInputChange}
                  value={formData.email}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Email Div end */}

            {/* <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  onChange={handleSignupInputChange}
                  value={formData.username}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}

            {/* Password Div start */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={handleSignupInputChange}
                  value={formData.password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Password Div end */}

            {/* Confirm Password Div start */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={handleSignupInputChange}
                  value={formData.confirmPassword}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Confirm Password Div end */}

            {/* License Num Div start */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="licenseNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  License Number
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  name="licenseNumber"
                  id="licenseNumber"
                  required
                  autoComplete="licenseNumber"
                  onChange={handleSignupInputChange}
                  checked={formData.isOwner}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* License Num Div end */}
            {/* Roles Div start */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                  Role
                </label>
              </div>
              <div className="mt-2 flex space-x-4">
                <label className="text-gray-700 font-medium flex items-center">
                  <input
                    type="radio"
                    id="CUSTOMER"
                    name="roles"
                    className="radio"
                    onChange={handleSignupInputChange}
                    checked={formData.roles === 'CUSTOMER'}
                  />
                  <label
                    htmlFor="customer"
                    className="block text-sm font-medium leading-6 text-gray-900 px-1"
                  >
                    Customer
                  </label>
                </label>
                <label className="text-gray-700 font-medium flex items-center">
                  <input
                    type="radio"
                    id="SELLER"
                    name="roles"
                    className="radio"
                    onChange={handleSignupInputChange}
                    checked={formData.roles === 'SELLER'}
                  />
                  <label
                    htmlFor="seller"
                    className="block text-sm font-medium leading-6 text-gray-900 px-1"
                  >
                    Seller
                  </label>
                </label>
              </div>
            </div>
            {/* Roles Div end */}

            <div className="border-b border-gray-900/10 pb-1">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"></div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create an Account
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Forgot Password
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
