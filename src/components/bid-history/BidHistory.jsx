import React, { useEffect, useState} from 'react';
import { httpGet } from '../../api';
import { useSelector } from 'react-redux';
import { notifySuccess, notifyError } from '../../helpers/notification';
import { ROLES } from '../../app/constants';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useParams } from 'react-router-dom';

function BidHistory() {
    const [bids, setBids] = useState([]);
    const { productID } = useParams();
    const [loading, setLoading] = useState(true);

    const auth = useSelector((state) => state.auth);
    const user = auth.user || {};
    const isCustomer = ROLES.CUSTOMER === user.roles;

    console.log('auth', auth);
    console.log('ROLES.CUSTOMER', ROLES.CUSTOMER);
    console.log('user.role', user.roles);
    console.log('isCustomer', isCustomer);

    useEffect(() => {
        try {
            const apiUrl = `/bids/by-product?productId=${productID}`
            httpGet({ url: apiUrl })
                .then((response) => {
                    console.log(response.data);
                    setBids(response.data)
                    setLoading(false);
                    notifySuccess('Successfully displaying Bids');
                })

        } catch (err) {
            console.log('error', err);
            notifyError(`${err}`);
            setLoading(false);
        }
    }, [])


    return (
        <div>
            {loading ? (
                <p>Loading deposit history...</p>
            ) : (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Bid Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bids.map((bid) => (
                            <tr key={bid.customerId} className="bg-white">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {bid.customerId}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {bid.bidAmount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default BidHistory;