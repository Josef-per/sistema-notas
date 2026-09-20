import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import ProfessorDashboard from "../pages/professor/Professor";
import AlunosList from "../pages/professor/AlunosList/AlunosList";
import AlunosNotas from "../pages/professor/AlunosNotas/AlunosNotas";
import AlunoDashboard from "../pages/Aluno/Aluno";

import RotaProtegida from "./RotaProtegida";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<RotaProtegida tipoPermitido="professor" />}>
        <Route path="/professor" element={<ProfessorDashboard />} />
        <Route path="/professor/alunos" element={<AlunosList />} />
        <Route path="/professor/alunos/notas" element={<AlunosNotas />} />
      </Route>

      <Route element={<RotaProtegida tipoPermitido="aluno" />}>
        <Route path="/aluno" element={<AlunoDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}