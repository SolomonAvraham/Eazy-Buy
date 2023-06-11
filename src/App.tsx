import "./App.css";
import Footer from "./components/features/footer/Footer";
import Header from "./components/features/header/Header";
import Home from "./components/pages/home/Home";
import Subscribe from "./components/features/Subscribe/Subscribe";
function App() {
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    <Home />
      <div className="hidden md:block ">
        <Subscribe />
      </div>
    <Footer />
    </div>
  );
}

export default App;
