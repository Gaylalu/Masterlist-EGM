// Card view for one machine item
import React from 'react'
import { Link } from 'react-router-dom'
export default function MachineCard({ m }){
  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:8}}>
        <h3 style={{margin:0}}>{m.name}</h3>
        <span className={'badge status-' + m.status}>{m.status}</span>
      </div>
      <div className="muted">Location: {m.location}</div>
      {m.description && <p style={{marginTop:8, marginBottom:8}}>{m.description}</p>}
      <div style={{display:'flex', gap:8}}>
        <Link className="btn primary" to={`/machine/${m.id}`}>View Details</Link>
      </div>
    </div>
  )
}
