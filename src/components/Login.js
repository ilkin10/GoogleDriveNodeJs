import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Login() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:3001/login',{email,password})
    .then(result => {console.log(result)
      if(result.data === "Success"){
        navigate('/home')
      }
      else{
        alert("Login Or Password Is InCorrect") // Qeseng Alert Olsun
      }
    })
    .catch(error => console.log(error))

  }


  return (
    <div>
      <h3>Log In Page</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 WidthStyle">
          <input
            type="email"
            className="form-control inputStyle"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4 WidthStyle">
          <input
            type="password"
            className="form-control inputStyle"
            aria-describedby="passwordHelpBlock"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Login" className="btn btn-primary button"/>
      </form>
      <h6 style={{ marginTop: 20 }}>
        Don't have an account?
        <Link to={"/signup"}> Sign Up</Link>
      </h6>
    </div>
  );
}
