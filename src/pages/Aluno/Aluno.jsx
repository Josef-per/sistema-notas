import { useContext, useEffect, useState } from "react";

import SideNav from "../../components/SideNav/SideNav";
import AlunoMedia from "../../components/Aluno/AlunoMedia/AlunoMedia";
import AlunoInfos from "../../components/Aluno/AlunoInfos/AlunoInfos";

import { alunoMenu } from "../../config/navigation";
import { AuthContext } from "../../contexts/AuthContext";
import { observarAluno } from "../../services/alunoService";
import { calcularResultado } from "../../utils/notas";

import "./Aluno.css";

export default function AlunoDashboard() {
  const { perfil } = useContext(AuthContext);

  const [aluno, setAluno] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const uid = perfil.uid;

  useEffect(() => {
    const cancelarObservacao = observarAluno(
      uid,
      (dados) => {
        setAluno(dados);
        setErro("");
        setCarregando(false);
      },
      (falha) => {
        console.error("Erro ao consultar aluno:", falha);

        setAluno(null);
        setErro(
          falha.code === "permission-denied"
            ? "Não foi possível acessar seu cadastro. Confira o vínculo da conta e as regras do Firestore."
            : "Não foi possível carregar seus dados. Confira a conexão e tente novamente."
        );
        setCarregando(false);
      }
    );

    return cancelarObservacao;
  }, [uid]);

  const { media, status } = calcularResultado(aluno?.notas);

  const mediaFormatada =
    media === null
      ? "—"
      : media.toLocaleString("pt-BR", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 2,
        });

  const dataAtualizacao = aluno?.atualizadoEm?.toDate?.();

  const dataFormatada = dataAtualizacao
    ? dataAtualizacao.toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      })
    : "Não informada";

  return (
    <>
      <SideNav title="Aluno" items={alunoMenu} />

      <main className="Aluno_Dashboard">
        {carregando && (
          <p role="status">Carregando seus dados...</p>
        )}

        {!carregando && erro && (
          <div className="Aluno_Infos">
            <p role="alert">{erro}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!carregando && !erro && !aluno && (
          <p role="status">
            Seu cadastro escolar ainda não foi encontrado.
            Avise o professor responsável.
          </p>
        )}

        {!carregando && !erro && aluno && (
          <>
            <AlunoMedia
              nota={mediaFormatada}
              status={status}
            />

            <AlunoInfos
              aluno={aluno.nome}
              media={mediaFormatada}
              status={status}
              data={dataFormatada}
            />
          </>
        )}
      </main>
    </>
  );
}