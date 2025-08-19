// Search + dropdown filters (location, status)
import React from 'react'
export default function Filters({ query,setQuery, location,setLocation, status,setStatus, locations, statuses }){
  return (
    <div className="filters">
      <input placeholder="Search by name or description..." value={query} onChange={e=>setQuery(e.target.value)} />
      <select value={location} onChange={e=>setLocation(e.target.value)}>
        <option value="">All Locations</option>
        {locations.map(l=> <option key={l} value={l}>{l}</option>)}
      </select>
      <select value={status} onChange={e=>setStatus(e.target.value)}>
        <option value="">All Statuses</option>
        {statuses.map(s=> <option key={s} value={s}>{s}</option>)}
      </select>
    </div>
  )
}
