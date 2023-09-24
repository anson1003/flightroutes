import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AirlineRoutes from "./components/AirlineRoutes";
import Airlines from "./components/Airlines";
import Airports from "./components/Airports";
import FlightRoutes from "./components/FlightRoutes";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      {/* <div className="App"> */}
      {/* Include the Header component */}

      <main className="bg-black">
        <div className="pt-5">
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/routes" element={<FlightRoutes />} />
          <Route path="/airlines" element={<Airlines />} />
          <Route path="/airports" element={<Airports />} />
          {/* Define the route for AirlineRoutes with a dynamic parameter */}
          <Route path="/airlines/:airlineCode" element={<AirlineRoutes />} />
          {/* Add other routes here */}
        </Routes>
      </main>
      {/* <Footer /> */}
      {/* </div> */}
    </Router>
  );
}

export default App;
