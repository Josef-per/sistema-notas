import React from "react"

import SideNav from "../../components/SideNav/SideNav"
import {Dot} from "lucide-react"

import "./Aluno.css"

export default function AlunoDashboard(){
    return(
        <>
            <SideNav />
            <main className="Aluno_Dashboard">

                <div className="Aluno_Media">
                    <p>NOTA FINAL</p>
                    <h1>8,5</h1>
                    <div className="Aluno_Status">
                        <Dot/>
                        <span>Aprovado</span>
                    </div>
                </div>

                <div className="Aluno_Infos">

                    <div className="Aluno_Info">
                        <span>Aluno</span>
                        <span>João da Silva</span>
                    </div>

                    <div className="Aluno_Info">
                        <span>Nota Final</span>
                        <span>8,5</span>
                    </div>

                    <div className="Aluno_Info">
                        <span>Situação</span>
                        <span>Aprovado</span>
                    </div>

                    <div className="Aluno_Info">
                        <span>Última Atualização</span>
                        <span>10/09/2026</span>
                    </div>
                </div>

            </main>
        </>
    )
}