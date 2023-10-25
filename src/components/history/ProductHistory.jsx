import React, { useEffect, useState } from 'react';
import { httpGet } from '../../api';
import { useSelector } from 'react-redux';
import { ROLES } from './../../app/constants';
import Cookies from 'universal-cookie';

function ProductHistory() {
  const [productHistory, setProductHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = useSelector((state) => state.auth);
  const user = auth.user || {};
  const isCustomer = ROLES.CUSTOMER === user.roles;
  const cookies = new Cookies();
  const customerSellerID = cookies.get('CUSTOMERSELLERID');

  useEffect(() => {
    const apiUrl = `/bids/bid-history/${customerSellerID}`;

    httpGet({ url: apiUrl })
      .then((response) => {
        setProductHistory(response.data.productHistory);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading product history...</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bit Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
            </tr> 
          </thead>
          <tbody>
            {productHistory.map((product, index) => (

              <tr key={index} className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.productName}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.productName}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(product.bidDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductHistory;
