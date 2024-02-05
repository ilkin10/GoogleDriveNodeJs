import React from 'react'
import {Route, Routes } from "react-router-dom";
import NavBar from "./NavBar.js"
import MyFiles from './MyFiles.js';
import SharedFiles from './SharedFiles.js';
import AddFile from "./AddFile.js";

export default function MainUI() {
  return (
      <div style={{backgroundColor: '#282c34', height:"100vh"}}>
        <NavBar></NavBar>
        
        <Routes>
          <Route exact path="/"  element={<MyFiles/>} />
          <Route exact path="/sharedfiles" element={<SharedFiles/>} />
          <Route exact path="/addfile" element={<AddFile/>} />
        </Routes>
        
      </div>
  )
}
