import React from "react";

const CartTable = () => {
  return (
    <div className="overflow-x-auto bg-white dark:bg-neutral-700">
      <table className="min-w-full text-left text-sm whitespace-nowrap">
        <thead className="uppercase tracking-wider border-b-2 dark:border-neutral-600">
          <tr>
            <th scope="col" className="px-6 py-4">
              Product
            </th>
            <th scope="col" className="px-6 py-4">
              Price
            </th>
            <th scope="col" className="px-6 py-4">
              Stock
            </th>
            <th scope="col" className="px-6 py-4">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b dark:border-neutral-600">
            <th scope="row" className="px-6 py-4">
              Handbag
            </th>
            <td className="px-6 py-4">$129.99</td>
            <td className="px-6 py-4">30</td>
            <td className="px-6 py-4">In Stock</td>
          </tr>

          <tr className="border-b dark:border-neutral-600">
            <th scope="row" className="px-6 py-4">
              Shoes
            </th>
            <td className="px-6 py-4">$89.50</td>
            <td className="px-6 py-4">25</td>
            <td className="px-6 py-4">In Stock</td>
          </tr>

          <tr className="border-b dark:border-neutral-600">
            <th scope="row" className="px-6 py-4">
              Bedding Set
            </th>
            <td className="px-6 py-4">$69.99</td>
            <td className="px-6 py-4">40</td>
            <td className="px-6 py-4">In Stock</td>
          </tr>

          <tr className="border-b dark:border-neutral-600">
            <th scope="row" className="px-6 py-4">
              Dining Table
            </th>
            <td className="px-6 py-4">$449.99</td>
            <td className="px-6 py-4">5</td>
            <td className="px-6 py-4">In Stock</td>
          </tr>

          <tr className="border-b dark:border-neutral-600">
            <th scope="row" className="px-6 py-4">
              Soap Set
            </th>
            <td className="px-6 py-4">$24.95</td>
            <td className="px-6 py-4">50</td>
            <td className="px-6 py-4">In Stock</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
