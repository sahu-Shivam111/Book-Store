import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";

function Dashboard() {

    const { user } = useContext(AuthContext);

    if (user?.role === "admin") {

        return <AdminDashboard />;

    }

    return <UserDashboard />;

}

export default Dashboard;