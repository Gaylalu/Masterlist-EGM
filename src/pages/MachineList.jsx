// List page: fetches from /api/machines (Google Sheets) with serverless fallback to machines.json
import React, { useEffect, useMemo, useState } from 'react'
import MachineCard from '../components/MachineCard'
import Filters from '../components/Filters'
import Pagination from '../components/Pagination'

const PAGE_SIZE = 6

export default function MachineList(){
  const [data,setData]=useState([])
  const [query,setQuery]=useState('')
  const [location,setLocation]=useState('')
  const [status,setStatus]=useState('')
  const [page,setPage]=useState(1)
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)

  useEffect(()=>{
    async function load(){
      setLoading(true)
      try{
        // Primary source: Google Sheets via serverless API
        const res = await fetch('/api/machines')
        const json = await res.json()
        setData(json)
      }catch(e){
        // The API already attempts a fallback to /public/machines.json,
        // but if the network call itself fails we still show a friendly error.
        setError('Failed to load machines')
      }finally{
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = useMemo(()=>{
    const q = query.toLowerCase()
    return data.filter(m=>{
      const matchesQuery = m.name.toLowerCase().includes(q) || (m.description||'').toLowerCase().includes(q)
      const matchesLoc = !location || m.location===location
      const matchesStatus = !status || m.status===status
      return matchesQuery && matchesLoc && matchesStatus
    })
  }, [data,query,location,status])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const start = (page-1)*PAGE_SIZE
  const pageData = filtered.slice(start, start+PAGE_SIZE)

  useEffect(()=>{ setPage(1) }, [query,location,status])

  const locations = Array.from(new Set(data.map(m=>m.location))).sort()
  const statuses = Array.from(new Set(data.map(m=>m.status))).sort()

  if(loading) return <div className="section">Loading...</div>
  if(error) return <div className="section">{error}</div>

  return (
    <div className="grid" style={{gap:12}}>
      <div className="section">
        <h2 style={{marginTop:0}}>Machines</h2>
        <Filters
          query={query} setQuery={setQuery}
          location={location} setLocation={setLocation}
          status={status} setStatus={setStatus}
          locations={locations} statuses={statuses}
        />
      </div>

      <div className="row">
        {pageData.map(m=> <MachineCard key={m.id} m={m} />)}
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  )
}
