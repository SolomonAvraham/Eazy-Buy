import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/features/footer/Footer";
import Header from "./components/features/header/Header";
import Home from "./components/pages/home/Home";
import Products from "./components/pages/products/Products";
import UserProfile from "./components/pages/userProfile/UserProfile";
import Login from "./components/pages/loginPage/Login";
import SignUp from "./components/pages/signUpPage/SignUp";
import Cancel from "./components/features/cancel/cancel";
import Success from "./components/features/success/success";
import Contact from "./components/pages/contact/Contact";
import CartComponent from "./components/pages/cart/Cart"
import ShowProduct from "./components/pages/showProuduct/ShowProduct";
import NotFound from "./components/features/notFound";
import About from "./components/pages/about/About.tsx";



function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-200  ">
      <Header />
      <Routes>
        <Route element={<NotFound />} path="*" />
        <Route element={<About />} path="/about" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<Cancel />} path="/cancel" />
        <Route element={<Success />} path="/success" />
        <Route element={<CartComponent />} path="/cart" />
        <Route element={<Cancel />} path="/cancel" />
        <Route element={<Success />} path="/success" />
        <Route element={<Home />} path="/" />
        <Route element={<Products />} path="/products" />
        <Route element={<ShowProduct />} path="/product/:id" />
        <Route element={<Login />} path="/login" />
        <Route element={<SignUp />} path="/signup" />
        <Route element={<UserProfile />} path="/userProfile" />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
