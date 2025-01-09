import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import Section4 from './components/Section4';
import Section5 from './components/Section5';
import Section6 from './components/Section6';
import Footer from './components/Footer';
import Interpreter from './components/Interpreter'; // Add correct paths for these components
import Dictionary from './components/Dictionary';
import AboutUs from './components/AboutUs';
import SignSphereInsights from './components/SignSphereInsights';

function App() {
  return (
      <Router>
        <Header /> {/* Shared header */}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Section1 />
                <Section3 />
                <Section5 />
                <Section2 />
                <Section4 />
                <Section6 />
              </div>
            }
          />
          <Route path="/interpreter" element={<Interpreter />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/signsphereinsights" element={<SignSphereInsights />} />
        </Routes>
        <Footer /> {/* Shared footer */}
      </Router>
    );
}

export default App;
