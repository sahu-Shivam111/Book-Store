import { Link } from "react-router-dom";

function BookCard({ book, deleteBook,role }) {

    return (

        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

          <div className="w-full h-72 bg-gray-100 flex items-center justify-center">
    <img
        src={
           `${import.meta.env.VITE_API_URL}/uploads/${book.image}`
        }
        alt={book.title}
        className="max-h-full max-w-full object-contain"
    />
</div>

            <div className="p-5">

                <div className="flex justify-between items-center mb-3">

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">

                        {book.category}

                    </span>

                    <span className="text-green-600 font-bold text-lg">

                        ₹{book.price}

                    </span>

                </div>

                <h2 className="text-2xl font-bold text-gray-800">

                    {book.title}

                </h2>

                <p className="text-gray-600 mt-2">

                    <span className="font-semibold">
                        Author:
                    </span>{" "}

                    {book.author}

                </p>

                <p className="text-gray-500 mt-4 line-clamp-3">

                    {book.description}

                </p>
                

                {

                    role === "admin" && (

                        <div className="flex gap-3 mt-6">

                            <Link
                                to={`/editbook/${book._id}`}
                                className="flex-1"
                            >

                                <button className="w-full bg-green-500 hover:bg-green-600 text-white">

                                    Edit

                                </button>

                            </Link>

                            <button
                                onClick={() => deleteBook(book._id)}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                            >

                                Delete

                            </button>

                        </div>

                    )

                }

                {
    role === "user" && (

        <Link to={`/buy/${book._id}`}>

            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">

                Buy Now

            </button>

        </Link>

    )
}

            </div>

        </div>

    );

}

export default BookCard;
