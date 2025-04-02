import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@ant-design/v5-patch-for-react-19'
import React from 'react'
import 'uno.css'
import 'normalize.css'
import './styles/global.css'

createRoot(document.getElementById('root')).render(<App />);
