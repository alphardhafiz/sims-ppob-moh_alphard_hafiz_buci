import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Akun from "./pages/Akun/Akun";
import TopUp from "./pages/TopUp/TopUp";
import Transaction from "./pages/Transaction/Transaction";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<PrivateRoute element={<Home />} />} />
        <Route path="/akun" element={<PrivateRoute element={<Akun />} />} />
        <Route path="/topup" element={<PrivateRoute element={<TopUp />} />} />
        <Route path="/transaction" element={<PrivateRoute element={<Transaction />} />} />
        {/* Halaman Login dan Register tidak membutuhkan token */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Halaman lain dilindungi menggunakan PrivateRoute */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
