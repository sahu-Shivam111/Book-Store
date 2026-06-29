import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    async function registerUser(e) {

        e.preventDefault();

        try {

            await api.post("/register", {

                name,
                email,
                password

            });

            alert("Registration Successful");

            navigate("/login");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Registration Failed"

            );

        }

    }

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">

                <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">

                    Register

                </h1>

                <form
                    onSubmit={registerUser}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2 font-semibold">

                            Name

                        </label>

                        <input
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">

                            Email

                        </label>

                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-semibold">

                            Password

                        </label>

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                    </div>

                   <div className="flex justify-start mt-3">
    <label className="flex items-center gap-2 cursor-pointer">
        <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="w-4 h-4"
        />
        <span className="text-sm text-gray-700">
            Show Password
        </span>
    </label>
</div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                    >

                        Register

                    </button>

                </form>

                <p className="text-center mt-6">

                    Already have an account?

                    <Link
                        to="/login"
                        className="text-blue-600 font-semibold ml-2 hover:underline"
                    >

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;