import React from 'react'
import '../style/login.scss'  
import FormGroup from '../components/Formgroup'
import {Link} from "react-router"
import {useAuth} from "../hooks/useAuth"
import { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {

  const {loading,handleLogin} = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e){
    e.preventDefault()
    await handleLogin({email, password})
    navigate("/");
  }


  return (
    <main className="login-page">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <FormGroup label="Email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <FormGroup label="Password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className = "button" type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login