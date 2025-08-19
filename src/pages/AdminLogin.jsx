// Admin login page (default admin/admin123; changeable in settings)
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminLogin(){
  const { user, login } = useAuth()
  const nav = useNavigate()
  const [username,setUsername]=useState('admin')
  const [password,setPassword]=useState('admin123')
  const [error,setError]=useState('')

  if(user){ nav('/admin/dashboard', { replace:true }) }

  const submit=(e)=>{
    e.preventDefault()
    const res = login(username, password)
    if(res.ok){ nav('/admin/dashboard', { replace:true }) }
    else{ setError(res.error || 'Login failed') }
  }

  return (
    <div className="section" style={{maxWidth:420, margin:'40px auto'}}>
      <h2 style={{marginTop:0}}>Admin Login</h2>
      <form onSubmit={submit} className="grid">
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        {error && <div className="muted" style={{color:'#ef4444'}}>{error}</div>}
        <button className="btn primary" type="submit">Sign in</button>
      </form>
      <p className="muted" style={{marginTop:12}}>Default: admin / admin123</p>
    </div>
  )
}
