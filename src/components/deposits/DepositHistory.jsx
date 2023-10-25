import React, { useEffect, useState } from 'react';
import { httpGet } from '../../api';
import { useSelector } from 'react-redux';
import { ROLES } from './../../app/constants';

function DepositHistory() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = useSelector((state) => state.auth);
  const user = auth.user || {};
  const isCustomer = ROLES.CUSTOMER === user.roles;

  console.log('auth', auth);
  console.log('ROLES.CUSTOMER', ROLES.CUSTOMER);
  console.log('user.role', user.roles);
  console.log('isCustomer', isCustomer);

  useEffect(() => {
    // Replace 'https://api.example.com/deposits/2' with the actual URL to fetch deposit data.
    const apiUrl = '/deposits/2';

    httpGet({ url: apiUrl }) // Use httpGet to make the GET request
      .then((response) => {
        setDeposits(response.data.deposits);
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
        <p>Loading deposit history...</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deposit ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((deposit) => (
              <tr key={deposit.depositId} className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {deposit.depositId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {deposit.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {deposit.productId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {deposit.productName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DepositHistory;
