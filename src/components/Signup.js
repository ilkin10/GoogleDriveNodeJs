import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:3001/signup',{name,email,password})
    .then(result => {console.log(result)
    navigate('/')
    })
    .catch(error => console.log(error))

  }


  return (
    <div>
      <h3>Sign Up Page</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2 WidthStyle">
          <input
            type="text"
            className="form-control inputStyle"
            placeholder="Enter Full Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-2 WidthStyle">
          <input
            type="email"
            className="form-control inputStyle"
            placeholder="Enter Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-2 WidthStyle">
          <input
            type="password"
            className="form-control inputStyle"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Sign Up"
          className="btn btn-primary button"
        />
        <span></span>
      </form>

      <h6 style={{ marginTop: 20 }}>
        Already have an account?
        <Link to={"/"}> Log In</Link>
      </h6>
    </div>
  );
}
