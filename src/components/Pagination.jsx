// Simple pagination widget
import React from 'react'
export default function Pagination({ page, totalPages, setPage }){
  const prev=()=>setPage(Math.max(1, page-1))
  const next=()=>setPage(Math.min(totalPages, page+1))
  return (
    <div className="pagination">
      <button className="btn" onClick={()=>setPage(1)} disabled={page===1}>First</button>
      <button className="btn" onClick={prev} disabled={page===1}>Prev</button>
      <span>Page {page} of {totalPages}</span>
      <button className="btn" onClick={next} disabled={page===totalPages}>Next</button>
      <button className="btn" onClick={()=>setPage(totalPages)} disabled={page===totalPages}>Last</button>
    </div>
  )
}
