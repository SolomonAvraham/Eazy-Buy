import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/features/footer/Footer";
import Header from "./components/features/header/Header";
import Home from "./components/pages/home/Home";
import Products from "./components/pages/products/Products";
import UserAuth from "./components/pages/userAuth/UserAuth";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Products />} path="/products" />
        <Route element={<UserAuth />} path="/userAuth" />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
