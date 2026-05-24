import './App.css'
import ProductCard from './components/productCard'
import AdminPage from './pages/adminPage'
import HomePage from './pages/homePage'
import TestPage from './pages/test'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  
  return (

    <BrowserRouter>

      <div className="w-full h-screen ">  {/* vh means viewport height , that means 100% of the viewport height */ }

          <Routes path="/">
              
              <Route path="/*" element={<HomePage/>} />
              <Route path="/register" element={<h1 className="text-secondary text-4xl font-bold text-center mt-10">Register</h1>} />
              <Route path="/admin/*" element={<AdminPage />} />
              <Route path="/test" element={<TestPage/>} />

           

          </Routes>

      </div>
    </BrowserRouter>
  
  )
}

export default App
