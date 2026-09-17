import { Link } from "react-router-dom";

import "./Register.css"

export default function AlunosList() {

    const notas = [
        {
            id: 1,
            nome: "João Silva",
            nota: 8.5,
            situacao: "Aprovado",
            atualizado: "10/09/2026"
        },
        {
            id: 2,
            nome: "Maria Santos",
            nota: 6.0,
            situacao: "Aprovado",
            atualizado: "09/09/2026"
        },
        {
            id: 3,
            nome: "Pedro Oliveira",
            nota: 4.5,
            situacao: "Reprovado",
            atualizado: "08/09/2026"
        },
        {
            id: 4,
            nome: "Ana Lima",
            nota: 9.2,
            situacao: "Aprovado",
            atualizado: "07/09/2026"
        },
        {
            id: 5,
            nome: "Carlos Mendes",
            nota: 3.8,
            situacao: "Reprovado",
            atualizado: "06/09/2026"
        }
    ];

    return (
        <div className="Dashboard_Registers">

            {/* nessa parte dos filtros vc vai ter que filtrar eles pra mim manito */}

            <div className="Registers_Filters">

                <input
                    type="text"
                    className="Registers_Search"
                    placeholder="Buscar aluno..."
                />

                <div className="Registers_Tabs">

                    <button className="Registers_Tab active">
                        Todos
                    </button>

                    <button className="Registers_Tab">
                        Aprovados
                    </button>

                    <button className="Registers_Tab">
                        Reprovados
                    </button>

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

                {notas.map((nota) => (

                    <div
                        className="Registers_Field"
                        key={nota.id}
                    >

                        <span className="Register_Name">
                            {nota.nome}
                        </span>

                        <span className="Register_Grade">
                            {nota.nota.toFixed(1)}
                        </span>

                        <span>

                            <span
                                className={
                                    nota.situacao === "Aprovado"
                                        ? "Register_Status approved"
                                        : "Register_Status failed"
                                }
                            >
                                {nota.situacao}
                            </span>

                        </span>

                        <span className="Register_Date">
                            {nota.atualizado}
                        </span>

                        <span className="Register_Action">

                            <Link to="#">
                                Editar
                            </Link>

                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
}