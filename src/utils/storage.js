export const KEYS = { auth: 'ml_auth', adminPassword: 'ml_admin_password' };

export function getAuth(){ try{ return JSON.parse(localStorage.getItem(KEYS.auth))||null }catch{ return null } }
export function setAuth(d){ localStorage.setItem(KEYS.auth, JSON.stringify(d)) }
export function clearAuth(){ localStorage.removeItem(KEYS.auth) }

export function getPassword(){ return localStorage.getItem(KEYS.adminPassword) || 'admin123' }
export function setPassword(pw){ localStorage.setItem(KEYS.adminPassword, pw) }
