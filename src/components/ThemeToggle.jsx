// Simple light/dark toggle stored in localStorage
import React, { useEffect, useState } from 'react'
export default function ThemeToggle(){
  const [theme,setTheme]=useState('light')
  useEffect(()=>{ setTheme(localStorage.getItem('theme')||'light') },[])
  const toggle=()=>{
    const next = theme==='light' ? 'dark' : 'light'
    setTheme(next); localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next==='dark')
  }
  return <button className="btn" onClick={toggle}>{theme==='light'?'Dark':'Light'} Mode</button>
}
