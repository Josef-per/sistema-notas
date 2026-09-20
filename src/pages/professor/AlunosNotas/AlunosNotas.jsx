import { useContext, useEffect, useState } from "react";

import FormField from "../../../components/FormField/FormField";
import SideNav from "../../../components/SideNav/SideNav";

import { AuthContext } from "../../../contexts/AuthContext";
import { professorMenu } from "../../../config/navigation";

import {
  CAMPOS_NOTAS,
  listarAlunosDoProfessor,
  salvarNotas,
} from "../../../services/alunoService";

import "./AlunosNotas.css";

import { useLocation } from "react-router-dom";

function criarNotasVazias() {
  return {
    bimestre1: "",
    bimestre2: "",
    bimestre3: "",
    bimestre4: "",
  };
}

export default function AlunosNotas() {
  const { perfil } = useContext(AuthContext);
  const location = useLocation();
  const alunoInicial = location.state?.alunoId || "";

  const [alunos, setAlunos] = useState([]);
  const [aluno, setAluno] = useState("");
  const [notas, setNotas] = useState(criarNotasVazias);
  const [errosNotas, setErrosNotas] = useState({});

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [erroCarregamento, setErroCarregamento] = useState("");
  const [erroFormulario, setErroFormulario] = useState("");
  const [sucesso, setSucesso] = useState("");

  const professorId = perfil.uid;

  useEffect(() => {
    let ativo = true;

    async function carregarAlunos() {
      try {
        const lista = await listarAlunosDoProfessor(professorId);

        if (ativo) {
          setAlunos(lista);

          if (alunoInicial) {
            const selecionado = lista.find(
              (item) => item.id === alunoInicial
            );

            if (!selecionado) {
              setErroFormulario(
                "O aluno solicitado não foi encontrado entre seus alunos."
              );
              return;
            }

            const notasDoAluno = criarNotasVazias();

            for (const campo of CAMPOS_NOTAS) {
              const valor = selecionado.notas?.[campo];

              notasDoAluno[campo] =
                valor === null || valor === undefined ? "" : String(valor);
            }

            setAluno(selecionado.id);
            setNotas(notasDoAluno);
          }
        }
        
      } catch (erro) {
        if (!ativo) return;

        console.error("Erro ao buscar alunos:", erro);

        setErroCarregamento(
          erro.code === "permission-denied"
            ? "Sem permissão para consultar alunos. Confira as regras do Firestore."
            : "Não foi possível carregar os alunos. Confira a conexão e atualize a página."
        );
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarAlunos();

    return () => {
      ativo = false;
    };
  }, [professorId, alunoInicial]);

  function selecionarAluno(event) {
    const id = event.target.value;
    const selecionado = alunos.find((item) => item.id === id);

    setAluno(id);
    setErrosNotas({});
    setErroFormulario("");
    setSucesso("");

    const notasDoAluno = criarNotasVazias();

    for (const campo of CAMPOS_NOTAS) {
      const valor = selecionado?.notas?.[campo];

      notasDoAluno[campo] =
        valor === null || valor === undefined ? "" : String(valor);
    }

    setNotas(notasDoAluno);
  }

  function alterarNota(campo, valor) {
    setNotas((anteriores) => ({
      ...anteriores,
      [campo]: valor,
    }));

    setErrosNotas((anteriores) => ({
      ...anteriores,
      [campo]: "",
    }));

    setErroFormulario("");
    setSucesso("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (salvando || carregando) return;

    setErroFormulario("");
    setSucesso("");
    setErrosNotas({});

    if (!aluno) {
      setErroFormulario("Selecione um aluno.");
      return;
    }

    const novosErros = {};
    const notasConvertidas = {};

    for (const campo of CAMPOS_NOTAS) {
      const texto = notas[campo].trim();

      // Um campo vazio significa nota ainda não lançada.
      if (texto === "") {
        notasConvertidas[campo] = null;
        continue;
      }

      const numero = Number(texto);

      if (!Number.isFinite(numero) || numero < 0 || numero > 10) {
        novosErros[campo] = "Informe uma nota entre 0 e 10.";
      } else {
        notasConvertidas[campo] = numero;
      }
    }

    if (Object.keys(novosErros).length > 0) {
      setErrosNotas(novosErros);
      return;
    }

    setSalvando(true);

    try {
      await salvarNotas(aluno, notasConvertidas);

      // Atualiza a lista local para manter as notas ao trocar a seleção.
      setAlunos((anteriores) =>
        anteriores.map((item) =>
          item.id === aluno
            ? { ...item, notas: notasConvertidas }
            : item
        )
      );

      setSucesso("Notas salvas com sucesso!");
    } catch (erro) {
      console.error("Erro ao salvar notas:", erro);

      if (erro.code === "permission-denied") {
        setErroFormulario(
          "Sem permissão para salvar. Confira as regras e o professor responsável pelo aluno."
        );
      } else if (erro.code === "not-found") {
        setErroFormulario(
          "O cadastro deste aluno não foi encontrado. Atualize a página."
        );
      } else {
        setErroFormulario(
          "Não foi possível salvar as notas. Confira sua conexão e tente novamente."
        );
      }
    } finally {
      setSalvando(false);
    }
  }

  function handleCancel() {
    setAluno("");
    setNotas(criarNotasVazias());
    setErrosNotas({});
    setErroFormulario("");
    setSucesso("");
  }

  return (
    <>
      <SideNav title="Professor" items={professorMenu} />

      <main className="Aluno_Notas">
        <div className="Aluno_GradeForm">
          <div className="GradeForm_Header">
            <h1>Notas do aluno</h1>
            <p>
              Selecione o aluno e informe as notas dos bimestres.
              Deixe em branco as notas ainda não lançadas.
            </p>
          </div>

          <form className="GradeForm" onSubmit={handleSubmit}>
            <div className="GradeForm_Select">
              <label htmlFor="aluno">Nome do aluno</label>

              <select
                id="aluno"
                value={aluno}
                onChange={selecionarAluno}
                disabled={
                  carregando ||
                  salvando ||
                  Boolean(erroCarregamento) ||
                  alunos.length === 0
                }
              >
                <option value="">
                  {carregando
                    ? "Carregando alunos..."
                    : "Selecione um aluno"}
                </option>

                {alunos.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nome}
                  </option>
                ))}
              </select>
            </div>

            {erroCarregamento && (
              <p className="GradeForm_Message GradeForm_Message-error" role="alert">
                {erroCarregamento}
              </p>
            )}

            {!carregando && !erroCarregamento && alunos.length === 0 && (
              <p className="GradeForm_Message" role="status">
                Nenhum aluno vinculado a este professor.
              </p>
            )}

            <div className="GradeForm_Grades">
              {CAMPOS_NOTAS.map((campo, indice) => (
                <FormField
                  key={campo}
                  label={`${indice + 1}º Bimestre`}
                  id={`nota${indice + 1}`}
                  type="number"
                  placeholder="0.0 - 10.0"
                  min={0}
                  max={10}
                  step="any"
                  value={notas[campo]}
                  onChange={(event) =>
                    alterarNota(campo, event.target.value)
                  }
                  error={errosNotas[campo]}
                  disabled={!aluno || salvando}
                />
              ))}
            </div>

            {erroFormulario && (
              <p className="GradeForm_Message GradeForm_Message-error" role="alert">
                {erroFormulario}
              </p>
            )}

            {sucesso && (
              <p className="GradeForm_Message GradeForm_Message-success" role="status">
                {sucesso}
              </p>
            )}

            <div className="Form_Buttons">
              <button
                type="button"
                className="Form_Button Form_Button-Cancel"
                onClick={handleCancel}
                disabled={salvando}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="Form_Button Form_Button-Save"
                disabled={
                  !aluno ||
                  carregando ||
                  salvando ||
                  Boolean(erroCarregamento)
                }
              >
                {salvando ? "Salvando..." : "Salvar notas"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}