import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import MachineList from './pages/MachineList'
import MachineDetail from './pages/MachineDetail'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ThemeToggle from './components/ThemeToggle'
import { AuthProvider, useAuth } from './context/AuthContext'

function AdminRoute({ children }){
  const { user } = useAuth()
  if(!user) return <Navigate to="/admin" replace />
  return children
}

function Shell(){
  const location = useLocation()
  const isLogin = location.pathname === '/admin'
  return (
    <div>
      <header>
        <div className="nav container">
          <div className="toolbar">
            <Link className="brand" to="/">Masterlist</Link>
            <Link to="/">Home</Link>
            <Link to="/admin">Admin</Link>
          </div>
          <div className="toolbar">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container" style={{paddingTop:16}}>
        <Routes>
          <Route path="/" element={<MachineList />} />
          <Route path="/machine/:id" element={<MachineDetail />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App(){
  const [init,setInit]=useState(false)
  useEffect(()=>{
    const t = localStorage.getItem('theme') || 'light'
    if(t==='dark') document.documentElement.classList.add('dark')
    setInit(true)
  }, [])
  if(!init) return null
  return <AuthProvider><Shell /></AuthProvider>
}
