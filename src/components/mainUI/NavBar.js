import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navBar">
      <h1 className="logo">My Drive</h1>
      <div>
        <Link to={"/"} className="button"> My Files</Link>
        <Link to={"/sharedfiles"} className="button">Shared with me</Link>
      </div>
      <Link to={"/addfile"} className="addButton">Add File +</Link>
      <Link to={"/addfolder"} className="button">Add Folder +</Link>
    </div>
  );
}
