import "./App.css";
import Footer from "./components/features/footer/Footer";
import Header from "./components/features/header/Header";
import Home from "./components/pages/home/Home";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    <Home />
    <Footer />
    </div>
  );
}

export default App;
