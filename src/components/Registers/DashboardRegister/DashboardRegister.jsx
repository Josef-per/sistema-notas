import { Link } from "react-router-dom";

import "./DashboardRegister.css";

const CORES_STATUS = {
  Aprovado: "#22c55e",
  Reprovado: "#f87171",
  "Em andamento": "#fbbf24",
};

export default function DashboardRegister({ registros = [] }) {
  return (
    <div className="Dashboard_Registers">
      <div className="Registers_Title">
        <h3>Últimas notas atualizadas</h3>

        <Link to="/professor/alunos">
          <span>Ver Todos</span>
        </Link>
      </div>

      <div className="Registers_Fields">
        <span>Nome</span>
        <span>Nota final</span>
        <span>Situação</span>
      </div>

      <div className="Registers_Rows">
        {registros.length === 0 && (
          <p
            role="status"
            style={{ padding: "16px", lineHeight: 1.5 }}
          >
            Nenhuma nota cadastrada ainda.
          </p>
        )}

        {registros.map((registro) => (
          <div className="Registers_Field" key={registro.id}>
            <span>{registro.nome}</span>

            <span>
              {registro.media === null
                ? "—"
                : registro.media.toLocaleString("pt-BR", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 2,
                  })}
            </span>

            <span style={{ color: CORES_STATUS[registro.status] }}>
              {registro.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}