import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import { observarAlunosDoProfessor } from "../../../services/alunoService";
import { calcularResultado } from "../../../utils/notas";

import "./Register.css";

const FILTROS = [
  { texto: "Todos", valor: "todos" },
  { texto: "Aprovados", valor: "Aprovado" },
  { texto: "Reprovados", valor: "Reprovado" },
  { texto: "Em andamento", valor: "Em andamento" },
];

const CLASSES_STATUS = {
  Aprovado: "approved",
  Reprovado: "failed",
  "Em andamento": "pending",
};

function normalizarTexto(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function Register() {
  const { perfil } = useContext(AuthContext);

  const [alunos, setAlunos] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("todos");
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
        console.error("Erro ao carregar a listagem:", falha);

        setAlunos([]);
        setErro(
          "Não foi possível carregar os alunos. Confira sua conexão e as permissões de acesso."
        );
        setCarregando(false);
      }
    );

    return cancelarObservacao;
  }, [professorId]);

  const alunosFiltrados = alunos
    .map((aluno) => ({
      ...aluno,
      ...calcularResultado(aluno.notas),
    }))
    .filter((aluno) => {
      const correspondeNome = normalizarTexto(aluno.nome).includes(
        normalizarTexto(busca)
      );

      const correspondeSituacao =
        filtro === "todos" || aluno.status === filtro;

      return correspondeNome && correspondeSituacao;
    });

  return (
    <div className="Dashboard_Registers">
      <div className="Registers_Filters">
        <input
          type="search"
          className="Registers_Search"
          placeholder="Buscar aluno..."
          aria-label="Buscar aluno por nome"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
        />

        <div className="Registers_Tabs">
          {FILTROS.map((item) => (
            <button
              key={item.valor}
              type="button"
              className={`Registers_Tab ${
                filtro === item.valor ? "active" : ""
              }`}
              aria-pressed={filtro === item.valor}
              onClick={() => setFiltro(item.valor)}
            >
              {item.texto}
            </button>
          ))}
        </div>
      </div>

      <div className="Registers_Fields">
        <span>Nome</span>
        <span>Nota final</span>
        <span>Situação</span>
        <span>Atualizado</span>
        <span>Ações</span>
      </div>

      <div className="Registers_Rows">
        {carregando && (
          <p className="Registers_Message" role="status">
            Carregando alunos...
          </p>
        )}

        {!carregando && erro && (
          <div className="Registers_Message" role="alert">
            <p>{erro}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!carregando && !erro && alunosFiltrados.length === 0 && (
          <p className="Registers_Message" role="status">
            {alunos.length === 0
              ? "Nenhum aluno vinculado a este professor."
              : "Nenhum aluno corresponde à busca e ao filtro selecionados."}
          </p>
        )}

        {!carregando &&
          !erro &&
          alunosFiltrados.map((aluno) => {
            const mediaFormatada =
              aluno.media === null
                ? "—"
                : aluno.media.toLocaleString("pt-BR", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 2,
                  });

            const data = aluno.atualizadoEm?.toDate?.();

            return (
              <div className="Registers_Field" key={aluno.id}>
                <span className="Register_Name">
                  {aluno.nome}
                </span>

                <span className="Register_Grade">
                  {mediaFormatada}
                </span>

                <span>
                  <span
                    className={`Register_Status ${
                      CLASSES_STATUS[aluno.status]
                    }`}
                  >
                    {aluno.status}
                  </span>
                </span>

                <span className="Register_Date">
                  {data ? data.toLocaleDateString("pt-BR") : "—"}
                </span>

                <span className="Register_Action">
                  <Link
                    to="/professor/alunos/notas"
                    state={{ alunoId: aluno.id }}
                  >
                    Editar
                  </Link>
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}