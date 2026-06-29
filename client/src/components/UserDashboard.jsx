import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function UserDashboard() {

    const { user } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        getOrders();

    }, []);

    async function getOrders() {

        try {

            const result = await api.get("/orders");

            setOrders(result.data);

        }

        catch (err) {

            console.log(err);

        }

    }

    const pendingOrders = orders.filter(
        (order) => order.status === "Pending"
    ).length;

    const deliveredOrders = orders.filter(
        (order) => order.status === "Delivered"
    ).length;

    return (

        <div className="min-h-screen bg-gray-100">

            <div className="max-w-6xl mx-auto p-8">

                <h1 className="text-4xl font-bold text-center mb-10">

                    User Dashboard

                </h1>

                <h2 className="text-xl mb-8">

                    Welcome,
                    <span className="font-bold">
                        {" "}
                        {user?.name}
                    </span>

                </h2>

                <div className="grid md:grid-cols-3 gap-6 mb-10">

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

                            Pending Orders

                        </h2>

                        <p className="text-4xl font-bold text-yellow-500 mt-3">

                            {pendingOrders}

                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">

                        <h2 className="text-gray-500">

                            Delivered

                        </h2>

                        <p className="text-4xl font-bold text-green-600 mt-3">

                            {deliveredOrders}

                        </p>

                    </div>

                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">

                    <h2 className="text-2xl font-bold mb-6">

                        My Orders

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

                                            Book

                                        </th>

                                        <th className="p-3 text-left">

                                            Price

                                        </th>

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
                                                className="border-b"
                                            >

                                                <td className="p-3">

                                                    {order.bookId?.title}

                                                </td>

                                                <td className="p-3">

                                                    ₹{order.bookId?.price}

                                                </td>

                                                <td className="p-3">

                                                    {order.paymentMethod}

                                                </td>

                                                <td className="p-3">

                                                    <span
                                                        className={`px-3 py-1 rounded-full text-white ${
                                                            order.status === "Delivered"
                                                                ? "bg-green-500"
                                                                : "bg-yellow-500"
                                                        }`}
                                                    >

                                                        {order.status}

                                                    </span>

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

export default UserDashboard;