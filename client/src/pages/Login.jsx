import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    async function loginUser(e) {

        e.preventDefault();

        try {

            const result = await api.post("/login", {

                email,

                password

            });

            login(

                result.data.token,

                result.data.user

            );

            alert("Login Successful");

            navigate("/");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Login Failed"

            );

        }

    }

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">

                <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">

                    Login

                </h1>

                <form
                    onSubmit={loginUser}
                    className="space-y-5"
                >

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
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                    >

                        Login

                    </button>

                </form>

                <p className="text-center mt-6">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold ml-2 hover:underline"
                    >

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;