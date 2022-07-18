import { Signup } from "pages/Signup";
import Login from "pages/Login";
import Landing from "pages/Landing";
import Mypage from "pages/Mypage";
import Room from "pages/Room";
import { useState } from "react";
import Todo from "pages/Todo";
import Creatingroom from "./pages/Creatingroom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Roomlist from "pages/Roomlist";
import Nav from "./components/Nav";
import Findinfo from "pages/Findinfo";
import { logout } from "./action/index";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const guestNum = (Math.random() * 10000000).toString().slice(0, 4);
  const annoy = `Annoy${guestNum}`;
  const [roomId, setRoomId] = useState("");

  window.addEventListener("unload", () => {
    dispatch(logout(""));
  });
  // -----------------
  return (
    //------------------------------------------------------------------------------------------------
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/todos" element={<Todo />} />
        <Route path="/room">
          <Route path=":roomId" element={<Room annoy={annoy} roomId={roomId} />} />
        </Route>
        <Route path="/creatingroom" element={<Creatingroom setRoomId={setRoomId} />} />
        <Route path="/roomlist" element={<Roomlist setRoomId={setRoomId} />} />
        <Route path="/findinfo" element={<Findinfo />} />
        <Route path="/Nav" element={<Nav />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
