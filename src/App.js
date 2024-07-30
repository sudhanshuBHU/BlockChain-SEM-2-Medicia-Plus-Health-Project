import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Legal from "./Pages/Legal";
import NotFound from "./Pages/NotFound";
import Appointment from "./Pages/Appointment";
import SignDoctor from "./Components/SignDoctor";
import SignPatient from "./Components/SignPatient";
import LoginDoctor from "./Components/LoginDoctor";
// import AppointmentForm from "./Components/AppointmentForm";
import LoginPatient from "./Components/LoginPatient";

function App() {
  return (
    <div className="App">
      <Router basename="/Health-Plus">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/signDoctor' element={<SignDoctor />}></Route>
          <Route path='/signPatient' element={<SignPatient />}></Route>
          <Route path='/logDoctor' element={<LoginDoctor />}></Route>
          <Route path='/logPatient' element={<LoginPatient />}></Route>
          <Route path="/legal" element={<Legal />} />
          {/* <Route path="/appointment" element={<LoginPatient />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
