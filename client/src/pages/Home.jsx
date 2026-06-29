import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import BookCard from "../components/BookCard";
import { AuthContext } from "../context/AuthContext";

function Home() {

    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const { user } = useContext(AuthContext);

    useEffect(() => {

        getBooks();

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

    async function deleteBook(id) {

        try {

            await api.delete(`/books/${id}`);

            alert("Book Deleted Successfully");

            getBooks();

        }

        catch (err) {

            alert(err.response?.data?.message || err.message);

        }

    }

    const filteredBooks = books.filter((book) => {

        const matchSearch =

            book.title.toLowerCase().includes(search.toLowerCase()) ||

            book.author.toLowerCase().includes(search.toLowerCase());

        const matchCategory =

            category === "All" ||

            book.category === category;

        return matchSearch && matchCategory;

    });

    async function buyBook(id) {

    try {

        await api.post(`/buy/${id}`);

        alert("Book Purchased Successfully");

    }

    catch (err) {

        alert(err.response?.data?.message);

    }

}

    return (

        <div className="max-w-7xl mx-auto px-6 py-8">

            {/* <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">

                📚 Book Management System

            </h1> */}

            <div className="bg-white rounded-xl shadow-md p-6 mb-8">

                <div className="grid md:grid-cols-2 gap-4">

                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >

                        <option value="All">All Categories</option>

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

            </div>

            {

                filteredBooks.length === 0 ? (

                    <div className="text-center mt-20">

                        <h2 className="text-2xl font-semibold text-gray-600">

                            No Books Found

                        </h2>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {

                            filteredBooks.map((book) => (

                                <BookCard

                                    key={book._id}

                                    book={book}

                                    deleteBook={deleteBook}

                                
                                    role={user?.role}

                                />

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}

export default Home;