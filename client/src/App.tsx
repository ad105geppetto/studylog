import Signup from "pages/Signup";
import Login from "pages/Login";
import axios from "axios";
import { useEffect, useState } from "react";
import { useStore } from "react-redux";

function App() {
  const [number, setNumber] = useState();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_EC2}`).then((data) => {
      console.log(data);
    });
  }, []);
  return (
    <div className="App">
      <Signup />
      <Login />
    </div>
  );
}

export default App;
