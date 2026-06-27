import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Signup() {

    const navigate = useNavigate();

    const [form,setForm]=useState({
        name:"",
        email:"",
        password:""
    });

    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();

        try{

            await api.post("/auth/signup",form);

            alert("Signup Successful");

            navigate("/");

        }catch(err){

            alert(err.response?.data?.message);

        }
    }

    return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Signup</button>
        </form>
        <p>Already have an account? <Link to="/"> Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;