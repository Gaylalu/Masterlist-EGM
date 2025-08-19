// Detail page: finds the item from /api/machines
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function MachineDetail(){
  const { id } = useParams()
  const [machine,setMachine]=useState(null)
  const [error,setError]=useState(null)

  useEffect(()=>{
    async function load(){
      try{
        const res = await fetch('/api/machines')
        const json = await res.json()
        const found = json.find(m => String(m.id) === String(id))
        setMachine(found || null)
      }catch(e){
        setError('Failed to load machine')
      }
    }
    load()
  }, [id])

  if(error) return <div className="section">{error}</div>
  if(!machine) return <div className="section">Not found.</div>

  return (
    <div className="section">
      <Link className="btn" to="/">← Back</Link>
      <h2 style={{marginBottom:0}}>{machine.name}</h2>
      <div style={{display:'flex', gap:8, marginTop:8}}>
        <span className={'badge status-' + machine.status}>{machine.status}</span>
        <span className="badge">{machine.location}</span>
      </div>
      {machine.description && <p style={{marginTop:16}}>{machine.description}</p>}
      <div style={{marginTop:16}} className="muted">ID: {machine.id}</div>
    </div>
  )
}
