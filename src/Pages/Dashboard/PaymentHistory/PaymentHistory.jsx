import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const { user } = useAuth();

     const axiosSecure = useAxiosSecure();
     
     const { data: payments =[] } = useQuery({
     queryKey: ['payments', user?.email],
     queryFn: async () => {
     const res = await axiosSecure.get(`/payments/${user.email}`);
     return res.data;
     }
     });
    //  return [cart, refetch];
    return (
      <div>
        {/* Table Contents */}
        <div className="overflow-x-auto ">
          <table className="table w-full text-center">
            {/* head */}
            <thead>
              <tr className="text-xl uppercase">
                <th>{/* <BiSolidFoodMenu /> */}#</th>
                
                <th>Price</th>
                <th>Transaction ID</th>
                <th>Status</th>
               
              </tr>
            </thead>
            <tbody className="font-bold ">
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <th>{index + 1}</th>
                  
                  <td className="text-center">${payment.price}</td>
                      <td>{ payment.transactionId}</td>
                      <td>{ payment.status}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default PaymentHistory;