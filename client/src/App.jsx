import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BuyBook from "./pages/BuyBook";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto p-6">
          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

            <Route path="/addbook" element={<ProtectedRoute><AddBook /></ProtectedRoute>} />

            <Route path="/editbook/:id" element={<ProtectedRoute><EditBook /></ProtectedRoute>} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
              path="/buy/:id"
              element={
                <ProtectedRoute>
                  <BuyBook />
                </ProtectedRoute>
              }
            />

          </Routes>
        </div>
      </div>

    </BrowserRouter>

  );

}

export default App;