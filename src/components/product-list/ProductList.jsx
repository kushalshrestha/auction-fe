import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { httpGet } from './../../api';
import { HiFilter } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { ROLES } from './../../app/constants';
import Cookies from 'universal-cookie';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const auth = useSelector((state) => state.auth);
  const user = auth.user || {};
  const isCustomer = ROLES.CUSTOMER === user.roles;
  const isSeller = ROLES.SELLER === user.roles;
  const sellerID = isSeller ? auth.user.sub.split(',')[0] : null;
  const [isFiltering, setIsFiltering] = useState(false);
  const cookies = new Cookies();
  const customerSellerID = cookies.get('CUSTOMERSELLERID');
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await httpGet({
      url: '/products',
    });
    setProducts(res.data);
  };

  const handleFilterClick = () => {
    if (isFiltering) {
      loadProducts();
      setIsFiltering(false);
    } else {
      const filtered = products.filter((product) => {
        return product.seller.sellerID == customerSellerID;
      });
      setProducts(filtered);
      setIsFiltering(true);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
    handleSearchClick();
  };

  const handleSearchClick = () => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  return (
    <div className="bg-white z-0">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products in Auction</h2>
        <div className="flex space-x-2">
          {' '}
          <input
            type="text"
            value={searchText}
            placeholder="Search by Product Title"
            onChange={handleSearchInputChange}
            className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>

        {isSeller && (
          <button
            onClick={handleFilterClick}
            className="text-gray-600 hover:text-gray-800 focus:outline-none text-xs flex items-center"
          >
            <HiFilter className="h-4 w-4 mr-1" />
            {isFiltering ? 'Remove Filter' : 'Filter only your Products'}
          </button>
        )}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {searchText
            ? filteredProducts.map((product) => (
                <div key={product.productID}>
                  <Link to={`/product-detail/${product.productID}`}>
                  {!product.sold && (
                      <button
                        className="bg-gray-400 text-white text-sm px-2 py-1 rounded cus-sold"
                        disabled
                      >
                        Sold Out
                      </button>
                    )}
                    <div className="group relative">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img
                          src={
                            product.productID % 2 === 0
                              ? 'https://samuelearp.com/wp-content/uploads/2023/06/Still-Life-Pineapples-Bananas-and-Apples-Samuel-Earp-oil-painting.jpeg'
                              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC8mGVDYXVH1ugchnYSNvrDbYPYlLPzqX6jg&usqp=CAU'
                          }
                          alt={product.name}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </h3>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          Starting: {product.startingPrice}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <p className="mt-1 text-sm text-gray-500 text-left">
                            {product.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 text-left">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0" />
                            Bid Due: {product.bidDueDate}
                          </h3>
                          <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0" />
                            Seller: {product.seller.sellerID}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            : products.map((product) => (
                <div key={product.productID}>
                  <Link to={`/product-detail/${product.productID}`}>
                    {!product.sold && (
                      <button
                        className="bg-gray-400 text-white text-sm px-2 py-1 rounded cus-sold"
                        disabled
                      >
                        Sold Out
                      </button>
                    )}

                    <div className="group relative">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img
                          src={
                            product.productID % 2 === 0
                              ? 'https://samuelearp.com/wp-content/uploads/2023/06/Still-Life-Pineapples-Bananas-and-Apples-Samuel-Earp-oil-painting.jpeg'
                              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC8mGVDYXVH1ugchnYSNvrDbYPYlLPzqX6jg&usqp=CAU'
                          }
                          alt={product.name}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </h3>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          Starting: {product.startingPrice}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <p className="mt-1 text-sm text-gray-500 text-left">
                            {product.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 text-left">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0" />
                            Bid Due: {product.bidDueDate}
                          </h3>
                          <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0" />
                            Seller: {product.seller.sellerID}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
