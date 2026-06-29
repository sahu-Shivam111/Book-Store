import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

    const { user, logout } = useContext(AuthContext);

    return (

        <nav className="bg-slate-800 shadow-lg">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-2xl font-bold text-white"
                >
                    📚 BookStore
                </Link>

                <div className="flex items-center gap-4">

                    <Link
                        to="/"
                        className="text-white hover:text-blue-300 transition"
                    >
                        Home
                    </Link>

                    {
                        user && (

                            <Link
                                to="/dashboard"
                                className="text-white hover:text-blue-300 transition"
                            >
                                Dashboard
                            </Link>

                        )
                    }

                    {
                        user?.role === "admin" && (

                            <Link to="/addbook">

                                <button className="bg-blue-600 hover:bg-blue-700 text-white">

                                    Add Book

                                </button>

                            </Link>

                        )
                    }

                    {

                        user ? (

                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 text-white"
                            >

                                Logout

                            </button>

                        ) : (

                            <>

                                <Link
                                    to="/login"
                                    className="text-white hover:text-blue-300 transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                >

                                    <button className="bg-green-500 hover:bg-green-600 text-white">

                                        Register

                                    </button>

                                </Link>

                            </>

                        )

                    }

                </div>

            </div>

        </nav>

    );

}

export default Navbar;