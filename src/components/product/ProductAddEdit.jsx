import { useState } from 'react';
import { useNavigate } from 'react-router';
import { httpPost, httpGet } from '../../api';
import { Link } from 'react-router-dom';

import { notifyError, notifySuccess } from './../../helpers/notification';

function ProductAddEdit() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startingPrice: '',
    deposit: '',
    bidDueDate: '',
    biddingPaymentDueDate: '',
    released: false,
    sellerID: 1,
  });

  const navigate = useNavigate();

  const handleProductInputChange = (e) => {
    let { value } = e.target;
    if (e.target.type === 'submit') {
      console.log(value);
      setFormData({
        ...formData,
        released: value === 'publish' ? true : false,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: value,
      });
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    console.log('here', formData);

    try {
      const res = await httpPost({
        url: '/products',
        data: formData,
      });

      notifySuccess('product created successfully');

      // navigate('/products', { replace: true });
    } catch (err) {
      console.log('error', err);
      notifyError(`${err}`);
    }
  };

  return (
    <>
      <form onSubmit={handleProductSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-1">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="product-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    onChange={handleProductInputChange}
                    value={formData.name}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    required
                    onChange={handleProductInputChange}
                    value={formData.description}
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about the product.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="starting-price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Starting Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="startingPrice"
                    id="startingPrice"
                    required
                    onChange={handleProductInputChange}
                    value={formData.startingPrice}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="deposit"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Deposit
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="deposit"
                    id="deposit"
                    required
                    onChange={handleProductInputChange}
                    value={formData.deposit}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="bid-due-date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Bidding Due Date
                </label>
                <div className="mt-2">
                  <input
                    id="bidDueDate"
                    name="bidDueDate"
                    type="text"
                    required
                    onChange={handleProductInputChange}
                    value={formData.bidDueDate}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="bid-payment-due-date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Bidding Payment Due Date
                </label>
                <div className="mt-2">
                  <input
                    id="biddingPaymentDueDate"
                    name="biddingPaymentDueDate"
                    type="text"
                    required
                    onChange={handleProductInputChange}
                    value={formData.biddingPaymentDueDate}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            value="publish"
            onClick={handleProductInputChange}
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Publish
          </button>
          <button
            value="draft"
            type="submit"
            onClick={handleProductInputChange}
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Save as draft
          </button>

          <Link to="/products">
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </>
  );
}

export default ProductAddEdit;
