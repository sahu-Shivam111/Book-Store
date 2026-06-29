import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {

    const [books, setBooks] = useState([]);

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        getBooks();

        getOrders();

    }, []);

    async function getBooks() {

        try {

            const result = await api.get("/books");

            setBooks(result.data);

        }

        catch (err) {

            console.log(err);

        }

    }

    async function getOrders() {

        try {

            const result = await api.get("/admin/orders");

            setOrders(result.data);

        }

        catch (err) {

            console.log(err);

        }

    }

    const revenue = orders.reduce((total, order) => {

        if (order.status === "Delivered") {

            return total + (order.bookId?.price || 0);

        }
        return total;

    }, 0);

    async function updateStatus(id, status) {

        try {

            await api.put(`/orders/${id}`, {

                status

            });

            getOrders();

        }

        catch (err) {

            console.log(err);

        }

    }

    return (

        <div className="min-h-screen bg-gray-100">

            <div className="max-w-7xl mx-auto p-8">

                <h1 className="text-4xl font-bold text-center mb-10">

                    Admin Dashboard

                </h1>

                <div className="grid md:grid-cols-3 gap-6 mb-10">

                    <div className="bg-white rounded-xl shadow-lg p-6">

                        <h2 className="text-gray-500">

                            Total Books

                        </h2>

                        <p className="text-4xl font-bold mt-3">

                            {books.length}

                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">

                        <h2 className="text-gray-500">

                            Total Orders

                        </h2>

                        <p className="text-4xl font-bold mt-3">

                            {orders.length}

                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">

                        <h2 className="text-gray-500">

                            Total Revenue

                        </h2>

                        <p className="text-4xl font-bold text-green-600 mt-3">

                            ₹{revenue}

                        </p>

                    </div>

                </div>

                <div className="mb-8">

                    <Link to="/addbook">

                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">

                            Add New Book

                        </button>

                    </Link>

                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">

                    <h2 className="text-2xl font-bold mb-6">

                        Recent Orders

                    </h2>

                    {

                        orders.length === 0 ?

                            (

                                <p className="text-gray-500">

                                    No Orders Found

                                </p>

                            )

                            :

                            (

                                <table className="w-full">

                                    <thead>

                                        <tr className="bg-gray-200">

                                            <th className="p-3 text-left">

                                                Customer

                                            </th>

                                            <th className="p-3 text-left">

                                                Book

                                            </th>

                                            <th className="p-3 text-left">

                                                Price

                                            </th>
                                            <th className="p-3 text-left">Phone</th>

                                            <th className="p-3 text-left">Address</th>

                                            <th className="p-3 text-left">

                                                Payment

                                            </th>

                                            <th className="p-3 text-left">

                                                Status

                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            orders.map((order) => (

                                                <tr
                                                    key={order._id}
                                                    className="border-b hover:bg-gray-50"
                                                >

                                                    <td className="p-3">

                                                        <div className="font-semibold">

                                                            {order.fullname}

                                                        </div>

                                                        <div className="text-sm text-gray-500">

                                                            {order.userId?.email}

                                                        </div>

                                                    </td>

                                                    <td className="p-3">

                                                        {order.bookId?.title}

                                                    </td>

                                                    <td className="p-3">

                                                        ₹{order.bookId?.price}

                                                    </td>

                                                    <td className="p-3">

                                                        {order.phone}

                                                    </td>

                                                    <td className="p-3">

                                                        <div>{order.address}</div>

                                                        <div>{order.city}</div>

                                                        <div>{order.state}</div>

                                                        <div>{order.pincode}</div>

                                                    </td>

                                                    <td className="p-3">

                                                        {order.paymentMethod}

                                                    </td>

                                                    <td className="p-3">

                                                        <select

                                                            value={order.status}

                                                            onChange={(e) =>

                                                                updateStatus(

                                                                    order._id,

                                                                    e.target.value

                                                                )

                                                            }

                                                            className="border rounded-lg px-3 py-2"

                                                        >

                                                            <option value="Pending">

                                                                Pending

                                                            </option>

                                                            <option value="Shipped">

                                                                Shipped

                                                            </option>

                                                            <option value="Delivered">

                                                                Delivered

                                                            </option>

                                                            <option value="Cancelled">

                                                                Cancelled

                                                            </option>

                                                        </select>

                                                    </td>

                                                </tr>

                                            ))

                                        }

                                    </tbody>

                                </table>

                            )

                    }

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;