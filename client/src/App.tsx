import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/features/footer/Footer";
import Header from "./components/features/header/Header";
import Home from "./components/pages/home/Home";
import Products from "./components/pages/products/Products";
import UserProfile from "./components/pages/userProfile/UserProfile";
import Login from "./components/pages/loginPage/Login";
import SignUp from "./components/pages/signUpPage/SignUpPage";
import About from "./components/pages/about/about";
import Cancel from "./components/features/cancel/cancel";
import Success from "./components/features/success/success";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route element={<About />} path="/about" />
        <Route element={<Cancel />} path="/cancel"/>
        <Route element={<Success />} path="/success"/>
        <Route element={<Home />} path="/" />
        <Route element={<Products />} path="/products" />
        <Route element={<Login />} path="/login" />
        <Route element={<SignUp />} path="/signup" />
        <Route element={<UserProfile />} path="/userProfile" />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
