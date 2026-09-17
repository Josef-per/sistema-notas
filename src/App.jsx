//Aqui vou fazer as criações das routes
import {Routes, Route} from "react-router-dom"

import Login from "./pages/Login/Login"
import ProfessorDashboard from "./pages/professor/Professor"
import AlunosList from "./pages/professor/AlunosList/AlunosList"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Professor" element={<ProfessorDashboard/>} />
        <Route path="/Professor/Alunos" element={<AlunosList/>} />
      </Routes>
    </>
  )
}

export default App
