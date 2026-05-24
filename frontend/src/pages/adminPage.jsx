import { Route, Routes } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="w-full h-screen bg-primary flex p-2">
        <div className="w-75 h-full bg-primary border border-accent rounded-[10px] ">
        </div>
        <div className="w-[calc(100%-300px)] h-full bg-primary border border-accent rounded-[10px] ">
            <Routes>
                <Route path="/" element={<h1>Admin Dashboard</h1>} />
                <Route path="/products" element={<h1>Manage Products</h1>} />
                <Route path="/orders" element={<h1>Manage Orders</h1>} />
                <Route path="/users" element={<h1>Manage Users</h1>} />
            </Routes>
        </div>
    </div>
  );
}