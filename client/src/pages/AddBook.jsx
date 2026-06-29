import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function AddBook() {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    if (user?.role !== "admin") {

        return (

            <div className="flex justify-center items-center h-screen">

                <h1 className="text-3xl font-bold text-red-600">

                    Access Denied

                </h1>

            </div>

        );

    }

    async function addBook(e) {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("title", title);
            formData.append("author", author);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("description", description);
            formData.append("image", image);

            await api.post("/books", formData);

            alert("Book Added Successfully");

            navigate("/");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                err.message

            );

        }

    }

    return (

        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">

                    Add New Book

                </h1>

                <form
                    onSubmit={addBook}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2 font-semibold">

                            Title

                        </label>

                        <input
                            type="text"
                            placeholder="Book Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">

                            Author

                        </label>

                        <input
                            type="text"
                            placeholder="Author Name"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">

                            Price

                        </label>

                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">

                            Category

                        </label>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        >

                            <option value="">

                                Select Category

                            </option>

                            <option value="Programming">

                                Programming

                            </option>

                            <option value="Science">

                                Science

                            </option>

                            <option value="Novel">

                                Novel

                            </option>

                            <option value="History">

                                History

                            </option>

                        </select>

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">

                            Description

                        </label>

                        <textarea
                            rows="5"
                            placeholder="Book Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        ></textarea>

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">

                            Book Cover

                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full"
                            required
                        />

                    </div>

                    {image && (

                        <div>

                            <p className="font-medium mb-2">

                                Preview

                            </p>

                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                className="h-48 rounded-lg border object-cover"
                            />

                        </div>

                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                    >

                        Add Book

                    </button>

                </form>

            </div>

        </div>

    );

}

export default AddBook;