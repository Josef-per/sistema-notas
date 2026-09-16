import React from "react";
import {Link} from "react-router-dom"
import {BellElectric, LayoutDashboard, CircleDot, MoveRight} from "lucide-react";

import "./Professor.css";

export default function ProfessorDashboard(){
    
    //Front-end da nossa tela
    //Temos que definir uma logo e um nome descente pra isso, além de definir todos os icons 
    return(
        <>
            {/*Esse side nav ele vai virar um componente futuramente*/}
            <nav className="Side-Nav">
                <div className="Side-Nav_Logo">
                    <BellElectric />
                    <h1>GradeUp</h1>
                </div>

                <div className="Side-Nav_Menu">

                     <span className="Side-Nav_Title">
                        PROFESSOR
                    </span>

                    <Link className="Side-Nav_Itens" to="#">
                        <p>Professor</p>
                        <div className="Side-Nav_Iten">
                            <LayoutDashboard/>
                            <span>Dashboard</span>
                        </div>
                    </Link>

                    <Link className="Side-Nav_Itens" to="#">
                        <p>Professor</p>
                        <div className="Side-Nav_Iten">
                            <CircleDot/>
                            <span>Alunos</span>
                        </div>
                    </Link>

                </div>

                <div className="Side-Nav_Bottom">
                    <Link to="#">
                        <MoveRight />
                        <span>Sair</span>
                    </Link>
                </div>

            </nav>
            <main className="Dashboard">

                <div className="Dashboard_Cards">
                    
                    {/*Puxar a informação do h2 do banco, ele sempre vai ser puxado por alguma coisa
                        Além disso criar um componente para os cards e suas variações
                        
                        Criar o card type 1 - 3
                        e colocar o type dele como prop talvez seja a melhor forma pq a lógica dele fica 
                        separada daqui, mas analisar isso futuramente
                    */}
                    <div className="Dashboard_Card">
                        <p>Total de alunos</p>
                        <h2>2</h2>
                        <p>matriculados</p>
                    </div>

                </div>

                <div className="Dashboard_Registers">
                    <div className="Registers_Title">
                        <h3>Últimas notas cadastradas</h3>

                        <Link to="#">
                            <span>Ver Todos</span>
                        </Link>

                    </div>

                    <div className="Registers_Fields">
                        <span>Nome: </span>
                        <span>Nota Final: </span>
                        <span>Situação: </span>
                        <span>Ações: </span>
                    </div>

                    <div className="Registers_Field">
                        {/*Essa info vai ter que vim do banco*/}
                    </div>
                </div>
            </main>
        </>
    )
}