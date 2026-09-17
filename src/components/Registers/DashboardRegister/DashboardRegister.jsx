import { Link } from "react-router-dom"
import "./DashboardRegister.css"

export default function DashboardRegister(){

    //Mano aqui ta uma representação de como a info vai ter que vir pra essa tela
    const notas = [
        {
            id: 1,
            nome: "João Silva",
            nota: 8.5,
            situacao: "Aprovado"
        },
        {
            id: 2,
            nome: "Maria Santos",
            nota: 6.0,
            situacao: "Aprovado"
        },
        {
            id: 3,
            nome: "Pedro Oliveira",
            nota: 4.5,
            situacao: "Reprovado"
        }
    ];

    return(
        <>
            <div className="Dashboard_Registers">
                    <div className="Registers_Title">
                        <h3>Últimas notas cadastradas</h3>

                        <Link to="#">
                            <span>Ver Todos</span>
                        </Link>

                    </div>

                    <div className="Registers_Fields">
                        <span>Nome</span>
                        <span>Nota final</span>
                        <span>Situação</span>
                    </div>

                    <div className="Registers_Rows">

                        {notas.map((nota) => (
                            <div className="Registers_Field" key={nota.id}>

                                <span>{nota.nome}</span>

                                <span>{nota.nota.toFixed(1)}</span>

                                <span>{nota.situacao}</span>
                            </div>
                        ))}

                    </div>
                </div>
        </>
    )
}