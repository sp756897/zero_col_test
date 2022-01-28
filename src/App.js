import './App.css';
import React, { Component } from "react";
import {
  BrowserRouter,
  Routes, Route
} from "react-router-dom";
import Navbar from "./Navbar";
import Landing from "./Landing";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
