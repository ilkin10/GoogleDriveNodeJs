import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar.js";
import MyFiles from "./MyFiles.js";
import SharedFiles from "./SharedFiles.js";
import AddFile from "./AddFile.js";

export default function MainUI() {
  return (
    <div>
      <NavBar>
        <Router>
          <Routes>
            <Route exact path="/" element={<MyFiles />} />
            <Route exact path="/sharedfiles" element={<SharedFiles />} />
            <Route exact path="/addfile" element={<AddFile />} />
          </Routes>
        </Router>
      </NavBar>
    </div>
  );
}
