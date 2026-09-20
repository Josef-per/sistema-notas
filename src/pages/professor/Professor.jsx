import { useContext, useEffect, useState } from "react";

import "./Professor.css";

import SideNav from "../../components/SideNav/SideNav";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import DashboardRegister from "../../components/Registers/DashboardRegister/DashboardRegister";

import { professorMenu } from "../../config/navigation";
import { AuthContext } from "../../contexts/AuthContext";
import {
  CAMPOS_NOTAS,
  observarAlunosDoProfessor,
} from "../../services/alunoService";
import { calcularResultado } from "../../utils/notas";

function notaPreenchida(nota) {
  return (
    typeof nota === "number" &&
    Number.isFinite(nota) &&
    nota >= 0 &&
    nota <= 10
  );
}

export default function ProfessorDashboard() {
  const { perfil } = useContext(AuthContext);

  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const professorId = perfil.uid;

  useEffect(() => {
    const cancelarObservacao = observarAlunosDoProfessor(
      professorId,
      (lista) => {
        setAlunos(lista);
        setErro("");
        setCarregando(false);
      },
      (falha) => {
        console.error("Erro ao carregar o painel:", falha);

        setAlunos([]);
        setErro(
          "Não foi possível carregar o painel. Confira sua conexão e as permissões de acesso."
        );
        setCarregando(false);
      }
    );

    return cancelarObservacao;
  }, [professorId]);

  const alunosComResultado = alunos.map((aluno) => ({
    ...aluno,
    ...calcularResultado(aluno.notas),
  }));

  const totalNotas = alunos.reduce(
    (total, aluno) =>
      total +
      CAMPOS_NOTAS.filter((campo) =>
        notaPreenchida(aluno.notas?.[campo])
      ).length,
    0
  );

  const alunosComMedia = alunosComResultado.filter(
    (aluno) => aluno.media !== null
  );

  const totalAprovados = alunosComMedia.filter(
    (aluno) => aluno.status === "Aprovado"
  ).length;

  const mediaTurma =
    alunosComMedia.length === 0
      ? null
      : alunosComMedia.reduce(
          (soma, aluno) => soma + aluno.media,
          0
        ) / alunosComMedia.length;

  const mediaFormatada =
    mediaTurma === null
      ? "—"
      : mediaTurma.toLocaleString("pt-BR", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 2,
        });

  // Mostra os três alunos com notas atualizadas mais recentemente.
  const registrosRecentes = alunosComResultado
    .filter((aluno) =>
      CAMPOS_NOTAS.some((campo) =>
        notaPreenchida(aluno.notas?.[campo])
      )
    )
    .sort((a, b) => {
      const dataA = a.atualizadoEm?.toMillis?.() ?? 0;
      const dataB = b.atualizadoEm?.toMillis?.() ?? 0;

      return dataB - dataA;
    })
    .slice(0, 3);

  return (
    <>
      <SideNav title="Professor" items={professorMenu} />

      <main className="Dashboard">
        {carregando && (
          <p role="status">Carregando painel...</p>
        )}

        {!carregando && erro && (
          <div role="alert">
            <p>{erro}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!carregando && !erro && (
          <>
            <div className="Dashboard_Cards">
              <DashboardCard
                title="Total de Alunos"
                data={String(alunos.length)}
                description="vinculados a você"
              />

              <DashboardCard
                title="Notas Cadastradas"
                data={String(totalNotas)}
                description="notas bimestrais preenchidas"
              />

              <DashboardCard
                title="Média da turma"
                data={mediaFormatada}
                description={
                  alunosComMedia.length === 0
                    ? "Nenhum aluno com média final"
                    : `${totalAprovados} aprovado(s) • ${alunosComMedia.length} com média final`
                }
              />
            </div>

            <DashboardRegister registros={registrosRecentes} />
          </>
        )}
      </main>
    </>
  );
}