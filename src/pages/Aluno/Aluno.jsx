import React from "react"

import SideNav from "../../components/SideNav/SideNav"

import "./Aluno.css"
import AlunoMedia from "../../components/Aluno/AlunoMedia/AlunoMedia"
import AlunoInfos from "../../components/Aluno/AlunoInfos/AlunoInfos"

export default function AlunoDashboard(){

    //manito quando vc terminar vc pode tirar as props eu coloquei elas só pra tipo aparecerem mas 
    //quando vc terminar vc tira manito
    return(
        <>
            <SideNav />
            <main className="Aluno_Dashboard">

                <AlunoMedia 
                    nota={67}
                    status={"Aprovado"}
                />

                <AlunoInfos 
                    aluno={"Vikitor gugugaga"}
                    media={67}
                    status={"Aprovado"}
                    data={"17/08/2067"}
                />

            </main>
        </>
    )
}