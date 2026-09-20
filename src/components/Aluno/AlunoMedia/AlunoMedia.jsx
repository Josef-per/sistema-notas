import { Dot } from "lucide-react";

import "./AlunoMedia.css";

const CORES_STATUS = {
  Aprovado: "#22c55e",
  Reprovado: "#f87171",
  "Em andamento": "#fbbf24",
};

export default function AlunoMedia({
  nota = "—",
  status = "Em andamento",
}) {
  return (
    <div className="Aluno_Media">
      <p>NOTA FINAL</p>

      <h1>{nota}</h1>

      <div
        className="Aluno_Status"
        style={{ color: CORES_STATUS[status] }}
      >
        <Dot />
        <span>{status}</span>
      </div>
    </div>
  );
}