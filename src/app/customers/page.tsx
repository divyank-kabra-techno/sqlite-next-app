"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addCustomer,getCustomers,deleteCustomer } from "@/database/customers";

type CustomerFormData = {
  name: string;
  mobile: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<
    { id: number; name: string; mobile: string }[]
  >([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormData>();

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    const storedCustomers = await getCustomers();
    setCustomers(storedCustomers);
  }

  async function onSubmit(data: CustomerFormData) {
    await addCustomer(data);
    reset();
    fetchCustomers();
  }

  async function handleDeleteCustomer(id: number) {
    await deleteCustomer(id);
    fetchCustomers();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>
      <div className="flex flex-col lg:flex-row h-screen p-4 gap-4">
        <div className="lg:w-2/3 w-full bg-white p-4 rounded-lg overflow-y-auto h-[80vh]">
          <h2 className="text-xl font-bold mb-2">Customers</h2>
          <table className="w-full border text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Mobile</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer.id} className="border-t">
                    <td className="p-2">{customer.id}</td>
                    <td className="p-2">{customer.name}</td>
                    <td className="p-2">{customer.mobile}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteCustomer(customer.id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-2 text-center">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="lg:w-1/3 w-full bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Add Customer</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <div className="space-y-4">
              {" "}
              {/* Changed to space-y-4 for vertical spacing */}
              <div>
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Customer Name"
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" // Added styling
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {" "}
                    {/* Added mt-1 for margin top */}
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  {...register("mobile", {
                    required: "Mobile is required",
                    pattern: {
                      value: /^\+?([0-9]{2,3})\)?[- ]?([0-9]{5,7})$/,
                      message: "Invalid Mobile format",
                    },
                  })}
                  placeholder="Mobile"
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" // Added styling
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {" "}
                    {/* Added mt-1 for margin top */}
                    {errors.mobile.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300" // Added styling
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
