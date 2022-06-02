import Signup from "pages/Signup";
import Login from "pages/Login";
import axios from "axios";
import { useEffect, useState } from "react";
import { useStore } from "react-redux";

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
