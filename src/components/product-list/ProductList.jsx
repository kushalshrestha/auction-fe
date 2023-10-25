import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { httpGet } from './../../api';
import { HiFilter } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { ROLES } from './../../app/constants';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const auth = useSelector((state) => state.auth);
  const user = auth.user || {};
  const isCustomer = ROLES.CUSTOMER === user.roles;
  const isSeller = ROLES.SELLER === user.roles;
  const sellerID = isSeller ? auth.user.sub.split(',')[0] : null;
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await httpGet({
      url: '/products',
    });
    setProducts(res.data);
    console.log(products);
  };

  const handleFilterClick = () => {
    if (isFiltering) {
      loadProducts();
      setIsFiltering(false);
    } else {
      const filtered = products.filter((product) => {
        return product.seller.sellerID == sellerID;
      });
      setProducts(filtered);
      setIsFiltering(true);
    }
  };

  return (
    <div className="bg-white z-0">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products in Auction</h2>
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
          {products.map((product) => (
            <div key={product.productID}>
              <span className="sr-only">Your Company</span>
              <Link to={`/product-detail/${product.productID}`}>
                <div className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src="https://samuelearp.com/wp-content/uploads/2023/06/Still-Life-Pineapples-Bananas-and-Apples-Samuel-Earp-oil-painting.jpeg"
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
                      <p className="mt-1 text-sm text-gray-500 text-left">{product.description}</p>
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
                <Link to="/product/add">
                  <button>

                    Edit Product
                  </button>
                </Link>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
