import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditBook() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [oldImage, setOldImage] = useState("");

    useEffect(() => {

        getBook();

    }, [id]);

    async function getBook() {

        try {

            const result = await api.get(`/books/${id}`);

            setTitle(result.data.title);
            setAuthor(result.data.author);
            setPrice(result.data.price);
            setCategory(result.data.category);
            setDescription(result.data.description);
            setOldImage(result.data.image);

        }

        catch (err) {

            console.log(err);

        }

    }

    async function updateBook(e) {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("title", title);
            formData.append("author", author);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("description", description);

            if (image) {

                formData.append("image", image);

            }

            await api.put(`/books/${id}`, formData);

            alert("Book Updated Successfully");

            navigate("/");

        }

        catch (err) {

            alert(err.response?.data?.message || err.message);

        }

    }

    return (

        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">

                <h1 className="text-3xl font-bold text-center mb-8">

                    Edit Book

                </h1>

                <form
                    onSubmit={updateBook}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2 font-semibold">

                            Title

                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">

                            Author

                        </label>

                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">

                            Price

                        </label>

                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >

                            <option value="Programming">Programming</option>

                            <option value="Science">Science</option>

                            <option value="Novel">Novel</option>

                            <option value="History">History</option>

                        </select>

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">

                            Description

                        </label>

                        <textarea
                            rows="5"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>

                    </div>

                    {

                        oldImage && !image && (

                            <div>

                                <label className="block mb-2 font-semibold">

                                    Current Image

                                </label>

                                <img
                              src={`${import.meta.env.VITE_API_URL}/uploads/${book.image}`}
                                    alt="Book"
                                    className="w-48 rounded-lg border"
                                />

                            </div>

                        )

                    }

                    <div>

                        <label className="block mb-2 font-semibold">

                            Change Image

                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />

                    </div>

                    {

                        image && (

                            <div>

                                <label className="block mb-2 font-semibold">

                                    New Image Preview

                                </label>

                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                    className="w-48 rounded-lg border"
                                />

                            </div>

                        )

                    }

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                    >

                        Update Book

                    </button>

                </form>

            </div>

        </div>

    );

}

export default EditBook;
