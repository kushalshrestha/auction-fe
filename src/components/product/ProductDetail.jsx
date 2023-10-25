import React, { useEffect, useState } from 'react';
import { httpGet, httpPost } from '../../api';
import { notifySuccess, notifyError } from './../../helpers/notification';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROLES } from './../../app/constants';
import Cookies from 'universal-cookie';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMakeDeposit, setMakeDeposit] = useState(false);
  const [price, setPrice] = useState(0);
  const [userCurrentPrice, setUserCurrentPrice] = useState(0);
  const { productID } = useParams();
  const [depositData, setDepositData] = useState(null);
  const [highestBid, setHighestBid] = useState(null);

  const auth = useSelector((state) => state.auth);
  const cookies = new Cookies();
  const customerSellerID = cookies.get('CUSTOMERSELLERID');

  const user = auth.user || {};
  const isCustomer = ROLES.CUSTOMER === user.roles;
  // const customerID = isCustomer ? auth.user.sub.split(',')[0] : null;

  const btnPriceClassName = `rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
    isMakeDeposit ? '' : 'pointer-events-none opacity-50'
  }`;

  const handleMakeDepositClick = () => {
    setMakeDeposit(true);
    handleDepositSubmit();
    setUserCurrentPrice(price);
  };
  useEffect(() => {
    const apiUrl = `/products/${productID}`;
    httpGet({ url: apiUrl })
      .then((response) => {
        setProduct(response.data);
        setPrice(response.data.startingPrice);
        const updatedDepositData = {
          customerId: customerSellerID,
          productId: productID,
          depositAmount: response.data.deposit,
        };
        setDepositData(updatedDepositData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    checkDepositMade();
  }, []);

  const checkDepositMade = async () => {
    const res = await httpGet({
      url: `/deposits/${customerSellerID}`,
    });
    if (res.data.deposits) {
      const hasMatchingDeposit = res.data.deposits.some(
        (deposit) => deposit.productId == productID
      );
      if (hasMatchingDeposit) {
        setMakeDeposit(true);
      }
    }
  };

  useEffect(() => {
    currentHighestBid();
  }, [userCurrentPrice]);

  const currentHighestBid = async () => {
    const res = await httpGet({
      url: `/bids/${productID}`,
    });
    setHighestBid(res.data.bidAmount);
  };

  useEffect(() => {
    try {
      const apiUrl = `/bids/by-product?productId=${productID}`;
      httpGet({ url: apiUrl }).then((response) => {
        const filteredBidByProduct = response.data.filter(
          (item) => item.customerId == customerSellerID && item.product.productID == productID
        );
        if (filteredBidByProduct.length > 0) {
          const highestBid = filteredBidByProduct.reduce((prev, current) => {
            return prev.bidAmount > current.bidAmount ? prev : current;
          });
          setUserCurrentPrice(highestBid.bidAmount);
        } else {
          setUserCurrentPrice(price);
        }
      });
    } catch (err) {
      notifyError(`${err}`);
    }
  }, []);

  const handleDepositSubmit = async (e) => {
    try {
      const res = await httpPost({
        url: '/deposits',
        data: depositData,
      });

      notifySuccess('Deposit has been made, now you can start bidding');
    } catch (err) {
      notifyError(`${err}`);
    }
  };

  const handlePriceClick = async (updateValue) => {
    setPrice(userCurrentPrice + updateValue);

    const bidData = {
      customerId: customerSellerID,
      productId: productID,
      newBidAmount: userCurrentPrice + updateValue,
    };

    // Post method to create a bid
    try {
      const res = await httpPost({
        url: '/bids',
        data: bidData,
      });

      notifySuccess('Bid created successfully');
      setUserCurrentPrice(userCurrentPrice + updateValue);
    } catch (err) {
      notifyError(`${err}`);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading product details...</p>
      ) : product ? (
        <div className="bg-white">
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                <li className="text-sm">
                  <a
                    href="#"
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                  >
                    Product \ {product.name}
                  </a>
                </li>
              </ol>
            </nav>

            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block flex justify-center items-center"></div>
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block flex justify-center items-center">
                {' '}
                {!product.sold && (
                  <button
                    className="bg-gray-400 text-white text-sm px-2 py-1 rounded cus-sold"
                    disabled
                  >
                    Sold Out
                  </button>
                )}
                <img
                  src={
                    product.productID % 2 === 0
                      ? 'https://samuelearp.com/wp-content/uploads/2023/06/Still-Life-Pineapples-Bananas-and-Apples-Samuel-Earp-oil-painting.jpeg'
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC8mGVDYXVH1ugchnYSNvrDbYPYlLPzqX6jg&usqp=CAU'
                  }
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block flex justify-center items-center"></div>
            </div>

            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16 text-left">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product.name}
                </h1>
              </div>
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-2xl tracking-tight text-gray-900">
                  Starting Bid Price: ${product.startingPrice}
                </p>
                <p className="text-2xl tracking-tight text-gray-900">
                  Current Highest Bid Price: ${highestBid}
                </p>
                {isMakeDeposit ? (
                  ''
                ) : (
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={handleMakeDepositClick}
                  >
                    Make Deposit
                  </button>
                )}
                {isMakeDeposit && (
                  <Link
                    to={`/bid-history/${productID}`}
                    className="ml-1 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View Bidding History
                  </Link>
                )}
                {isMakeDeposit && (
                  <div className="mt-2">
                    <input
                      disabled
                      type="number"
                      value={userCurrentPrice}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      name="bid-amount"
                      id="bid-amount"
                      placeholder="Insert amount to bid"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    />
                  </div>
                )}

                <div className="mt-2 flex items-center gap-x-3">
                  <button
                    type="button"
                    className={btnPriceClassName}
                    onClick={() => handlePriceClick(10)}
                  >
                    + $10
                  </button>
                  <button
                    type="button"
                    className={btnPriceClassName}
                    onClick={() => handlePriceClick(50)}
                  >
                    + $50
                  </button>
                  <button
                    type="button"
                    className={btnPriceClassName}
                    onClick={() => handlePriceClick(100)}
                  >
                    + $100
                  </button>
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"></div>
                </div>
                <div className="py-3">
                  <p>
                    <b>Biding Due Date : {new Date(product.bidDueDate).toLocaleDateString()}</b>
                  </p>
                  <p>
                    <b>
                      Biding Payment Due Date :{' '}
                      {new Date(product.biddingPaymentDueDate).toLocaleDateString()}
                    </b>
                  </p>
                </div>
              </div>

              <div className="py-1 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6 text-left">
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-4 space-y-6 ">
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
}

export default ProductDetail;
