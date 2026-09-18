//Aqui vou fazer as criações das routes
import {Routes, Route} from "react-router-dom"

import Login from "../pages/Login/Login"

import ProfessorDashboard from "../pages/professor/Professor"
import AlunosList from "../pages/professor/AlunosList/AlunosList"
import AlunosNotas from "../pages/professor/AlunosNotas/AlunosNotas"

import AlunoDashboard from "../pages/Aluno/Aluno"

export default function AppRoutes(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Login/>} />

                <Route path="/professor" element={<ProfessorDashboard/>} />
                <Route path="/professor/alunos" element={<AlunosList/>} />
                <Route path="/professor/alunos/notas" element={<AlunosNotas />}/>

                <Route path="/aluno" element={<AlunoDashboard/>} />
            </Routes>
        </>
    )
}