//Aqui vou fazer as criações das routes
import {Routes, Route} from "react-router-dom"

import Login from "./pages/Login/Login"
import ProfessorDashboard from "./pages/professor/Professor"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Professor" element={<ProfessorDashboard/>} />
      </Routes>
    </>
  )
}

export default App
