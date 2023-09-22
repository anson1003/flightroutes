import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import FlightRoutes from "./components/FlightRoutes";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      {/* <div className="App"> */}
      {/* Include the Header component */}

      <main className="bg-black">
        <div className="mt-5 pt-2">
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/routes" element={<FlightRoutes />} />
          {/* Add other routes here */}
        </Routes>
      </main>
      <Footer />
      {/* </div> */}
    </Router>
  );
}

export default App;
