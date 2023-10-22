import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: "Samuel's Oil Painting",
    href: '/product-detail',
    imageSrc:
      'https://samuelearp.com/wp-content/uploads/2023/06/Still-Life-Pineapples-Bananas-and-Apples-Samuel-Earp-oil-painting.jpeg',
    imageAlt: 'Oil Painting',
    description:
      'This is one of my best painting. Had to sell this because really in need of money right now.This is one of my best painting. Had to sell this because really in need of money right now.',
    bidDueDate: '29th Jan 2024',
    biddingPaymentDueDate: '2nd Feb 2024',
    release: 'No',
    startingPrice: '$50',
    seller: 'Samuel',
  },
  {
    id: 2,
    name: "Samuel's Oil Painting",
    href: '/',
    imageSrc:
      'https://samuelearp.com/wp-content/uploads/2023/06/Still-Life-Pineapples-Bananas-and-Apples-Samuel-Earp-oil-painting.jpeg',
    imageAlt: 'Oil Painting',
    description:
      'This is one of my best painting. Had to sell this because really in need of money right now.This is one of my best painting. Had to sell this because really in need of money right now.',
    bidDueDate: '29th Jan 2024',
    biddingPaymentDueDate: '2nd Feb 2024',
    release: 'No',
    startingPrice: '$50',
    seller: 'Samuel',
  },
  {
    id: 3,
    name: "Samuel's Oil Painting",
    href: '/',
    imageSrc:
      'https://samuelearp.com/wp-content/uploads/2023/06/Still-Life-Pineapples-Bananas-and-Apples-Samuel-Earp-oil-painting.jpeg',
    imageAlt: 'Oil Painting',
    description:
      'This is one of my best painting. Had to sell this because really in need of money right now.This is one of my best painting. Had to sell this because really in need of money right now.',
    bidDueDate: '29th Jan 2024',
    biddingPaymentDueDate: '2nd Feb 2024',
    release: 'No',
    startingPrice: '$50',
    seller: 'Samuel',
  },
  {
    id: 4,
    name: "Samuel's Oil Painting",
    href: '/',
    imageSrc:
      'https://samuelearp.com/wp-content/uploads/2023/06/Still-Life-Pineapples-Bananas-and-Apples-Samuel-Earp-oil-painting.jpeg',
    imageAlt: 'Oil Painting',
    description:
      'This is one of my best painting. Had to sell this because really in need of money right now.This is one of my best painting. Had to sell this because really in need of money right now.',
    bidDueDate: '29th Jan 2024',
    biddingPaymentDueDate: '2nd Feb 2024',
    release: 'No',
    startingPrice: '$50',
    seller: 'Samuel',
  },
];
function ProductList() {
  return (
    <div className="bg-white z-0">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products in Auction</h2>
        <button
          href="/product/add"
          type="button"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Add a Product
        </button>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id}>
              <Link to={product.href}>
                <span className="sr-only">Your Company</span>
                <div className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
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
                        Seller: {product.seller}
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
}
export default ProductList;
