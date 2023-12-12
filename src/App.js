import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/Signup";
import MainUI from "./components/mainUI/MainUI";
import { useState } from "react";
import AddFolder from "./components/mainUI/AddFolder";

function Item() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  function changeSignedInStatus(isLogged) {
    setIsSignedIn(isLogged);
  }
  if (isSignedIn) {
    return <MainUI></MainUI>;
  }
  return (
    <header className="App-header">
      <b className="title">Welcome To Our Drive</b>
      <br></br>
      <Routes>
        <Route
          exact
          path="/"
          element={<Login changeSignedInStatus={changeSignedInStatus} />}
        />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Item></Item>
      </div>
    </Router>
  );
}

export default App;
