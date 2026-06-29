import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function BuyBook() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [book, setBook] = useState(null);

    const [fullname, setFullname] = useState("");

    const [phone, setPhone] = useState("");

    const [address, setAddress] = useState("");

    const [city, setCity] = useState("");

    const [state, setState] = useState("");

    const [pincode, setPincode] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("UPI");

    useEffect(() => {

        getBook();

    }, []);

    async function getBook() {

        try {

            const result = await api.get(`/books/${id}`);

            setBook(result.data);

        }

        catch (err) {

            console.log(err);

        }

    }

    async function placeOrder(e) {

        e.preventDefault();

        try {

            await api.post("/orders", {

                bookId: id,

                fullname,

                phone,

                address,

                city,

                state,

                pincode,

                paymentMethod

            });

            alert("Order Placed Successfully");

            navigate("/");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                err.message

            );

        }

    }

    if (!book) {

        return (

            <div className="flex justify-center items-center h-screen">

                <h1 className="text-3xl font-bold">

                    Loading...

                </h1>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

                <div className="grid md:grid-cols-2">

                    <div className="p-8">

                        <img

                            src={`http://localhost:5000/uploads/${book.image}`}

                            alt={book.title}

                            className="w-full h-[500px] object-cover rounded-lg"

                        />

                    </div>

                    <div className="p-8">

                        <h1 className="text-4xl font-bold mb-4">

                            {book.title}

                        </h1>

                        <p className="text-xl text-gray-600 mb-2">

                            Author : {book.author}

                        </p>

                        <p className="text-lg mb-3">

                            Category : {book.category}

                        </p>

                        <p className="text-3xl font-bold text-blue-600 mb-6">

                            ₹{book.price}

                        </p>

                        <p className="text-gray-700 mb-8">

                            {book.description}

                        </p>

                        <form

                            onSubmit={placeOrder}

                            className="space-y-4"

                        >

                            <h2 className="text-2xl font-bold">

                                Shipping Details

                            </h2>

                            <input

                                type="text"

                                placeholder="Full Name"

                                value={fullname}

                                onChange={(e) =>

                                    setFullname(e.target.value)

                                }

                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

                                required

                            />

                            <input

                                type="text"

                                placeholder="Phone Number"

                                value={phone}

                                onChange={(e) =>

                                    setPhone(e.target.value)

                                }

                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

                                required

                            />

                            <textarea

                                placeholder="Full Address"

                                value={address}

                                onChange={(e) =>

                                    setAddress(e.target.value)

                                }

                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

                                rows="4"

                                required

                            ></textarea>

                            <div className="grid grid-cols-2 gap-4">

                                <input

                                    type="text"

                                    placeholder="City"

                                    value={city}

                                    onChange={(e) =>

                                        setCity(e.target.value)

                                    }

                                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

                                    required

                                />

                                <input

                                    type="text"

                                    placeholder="State"

                                    value={state}

                                    onChange={(e) =>

                                        setState(e.target.value)

                                    }

                                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

                                    required

                                />

                            </div>

                            <input

                                type="text"

                                placeholder="Pincode"

                                value={pincode}

                                onChange={(e) =>

                                    setPincode(e.target.value)

                                }

                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

                                required

                            />
                                                        <h2 className="text-2xl font-bold mt-6">

                                Payment Method

                            </h2>

                            <select

                                value={paymentMethod}

                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }

                                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

                            >

                                <option value="UPI">

                                    UPI

                                </option>

                                <option value="Credit Card">

                                    Credit Card

                                </option>

                                <option value="Debit Card">

                                    Debit Card

                                </option>

                                <option value="Cash on Delivery">

                                    Cash on Delivery

                                </option>

                            </select>

                            <button

                                type="submit"

                                className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"

                            >

                                Place Order

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default BuyBook;