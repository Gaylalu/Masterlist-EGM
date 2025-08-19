// Admin dashboard with change-password (stored in localStorage for demo)
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { setPassword, getPassword } from '../utils/storage'

export default function AdminDashboard(){
  const { user, logout } = useAuth()
  const [pw,setPw]=useState('')
  const [savedMsg,setSavedMsg]=useState('')
  const [stats,setStats]=useState({ total:0, byStatus:{}, byLocation:{} })

  useEffect(()=>{
    setPw(getPassword())
    async function loadStats(){
      try{
        const res = await fetch('/api/machines')
        const data = await res.json()
        const total = data.length
        const byStatus = {}
        const byLocation = {}
        data.forEach(m=>{
          byStatus[m.status]=(byStatus[m.status]||0)+1
          byLocation[m.location]=(byLocation[m.location]||0)+1
        })
        setStats({ total, byStatus, byLocation })
      }catch{}
    }
    loadStats()
  }, [])

  const save=(e)=>{
    e.preventDefault()
    setPassword(pw)
    setSavedMsg('Password updated! (Stored locally)')
    setTimeout(()=>setSavedMsg(''), 1500)
  }

  return (
    <div className="grid" style={{gap:12}}>
      <div className="section" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <h2 style={{margin:'0 0 6px'}}>Admin Dashboard</h2>
          <div className="muted">Signed in as <b>{user?.username}</b></div>
        </div>
        <button className="btn" onClick={logout}>Logout</button>
      </div>

      <div className="section">
        <h3 style={{marginTop:0}}>Quick Stats</h3>
        <div className="row">
          <div className="card"><b>Total Machines</b><div className="muted">{stats.total}</div></div>
          <div className="card"><b>By Status</b>
            <ul>{Object.entries(stats.byStatus).map(([k,v])=> <li key={k}>{k}: {v}</li>)}</ul>
          </div>
          <div className="card"><b>By Location</b>
            <ul>{Object.entries(stats.byLocation).map(([k,v])=> <li key={k}>{k}: {v}</li>)}</ul>
          </div>
        </div>
      </div>

      <div className="section">
        <h3 style={{marginTop:0}}>Settings</h3>
        <form onSubmit={save} className="grid">
          <label>Change Admin Password</label>
          <input type="text" value={pw} onChange={e=>setPw(e.target.value)} placeholder="New password" />
          <button className="btn primary" type="submit">Save</button>
          {savedMsg && <div className="muted">{savedMsg}</div>}
          <p className="muted">Note: stored in your browser's localStorage for demo purposes.</p>
        </form>
      </div>

      <div className="section">
        <h3 style={{marginTop:0}}>Manage Machines (Coming Soon)</h3>
        <p className="muted">CRUD forms will be added when we switch to a real DB/Sheets write access.</p>
      </div>
    </div>
  )
}
