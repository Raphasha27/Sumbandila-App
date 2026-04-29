import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

window.addEventListener('error', (event) => {
  document.body.innerHTML = `<div style="color:red; padding:20px; font-family:monospace; background:black; height:100vh; overflow:auto;">
    <h2>Runtime Error!</h2>
    <p>${event.message}</p>
    <pre>${event.error?.stack}</pre>
  </div>`;
});

window.addEventListener('unhandledrejection', (event) => {
  document.body.innerHTML = `<div style="color:red; padding:20px; font-family:monospace; background:black; height:100vh; overflow:auto;">
    <h2>Unhandled Promise Rejection!</h2>
    <p>${event.reason?.message}</p>
    <pre>${event.reason?.stack}</pre>
  </div>`;
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
