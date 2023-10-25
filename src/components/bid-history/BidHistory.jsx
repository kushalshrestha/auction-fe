import React, { useEffect, useState, Fragment, useRef } from 'react';
import { httpGet, httpPost } from '../../api';
import { useSelector } from 'react-redux';
import { notifySuccess, notifyError } from './../../helpers/notification';
import { ROLES } from './../../app/constants';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

function BidHistory() {
    const [open, setOpen] = useState(true);

    const auth = useSelector((state) => state.auth);
    const user = auth.user || {};
    const isCustomer = ROLES.CUSTOMER === user.roles;

    console.log('auth', auth);
    console.log('ROLES.CUSTOMER', ROLES.CUSTOMER);
    console.log('user.role', user.roles);
    console.log('isCustomer', isCustomer);

    const handleBidHistory = async (e) => {
        try {
            const res = await httpGet({
                url: '/bids',
                id: ,
                newBid:

            });

            notifySuccess('Successfully diaplaying Bids');
        } catch (err) {
            console.log('error', err);
            notifyError(`${err}`);
        }
    };


    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >

                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        Customer Bids
                                    </Dialog.Title>

                                    <div className="mt-2">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead>
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Bid</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {bids.map((bid, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 whitespace-nowrap">{res.id}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{res.newBid}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>

                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}