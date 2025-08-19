import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, setAuth, clearAuth, getPassword } from '../utils/storage'

const AuthContext = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)

  useEffect(()=>{ setUser(getAuth()) }, [])

  const login = (username, password)=>{
    const saved = getPassword()
    if(username==='admin' && password===saved){
      const u = { username:'admin' }
      setAuth(u); setUser(u)
      return { ok:true }
    }
    return { ok:false, error:'Invalid credentials' }
  }

  const logout = ()=>{ clearAuth(); setUser(null) }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth(){ return useContext(AuthContext) }
