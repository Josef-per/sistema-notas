import "./AlunoInfos.css";

export default function AlunoInfos({
  aluno = "Não informado",
  media = "—",
  status = "Em andamento",
  data = "Não informada",
}) {
  return (
    <div className="Aluno_Infos">
      <div className="Aluno_Info">
        <span>Aluno</span>
        <span>{aluno}</span>
      </div>

      <div className="Aluno_Info">
        <span>Nota Final</span>
        <span>{media}</span>
      </div>

      <div className="Aluno_Info">
        <span>Situação</span>
        <span>{status}</span>
      </div>

      <div className="Aluno_Info">
        <span>Última Atualização</span>
        <span>{data}</span>
      </div>
    </div>
  );
}