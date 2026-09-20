import {LayoutDashboard, CircleDot, Plus} from "lucide-react";

import "./Professor.css";


import SideNav from "../../components/SideNav/SideNav";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import DashboardRegister from "../../components/Registers/DashboardRegister/DashboardRegister";
import { professorMenu } from "../../config/navigation";

export default function ProfessorDashboard(){
        
    return(
        <>
            {/*Esse side nav ele vai virar um componente futuramente*/}
            <SideNav 
                title={"Professor"}
                items={professorMenu}
            />
            <main className="Dashboard">

                <div className="Dashboard_Cards">
                    
                    {/*Victor vc vai ter que trocar os valores disso aqui depois*/}
                    <DashboardCard 
                        title={"Total de Alunos"}
                        data={"5"}
                        description={"matriculados"}
                    />

                    <DashboardCard 
                        title={"Notas Cadastradas"}
                        data={"5"}
                        description={"registros ativos"}
                    />

                    <DashboardCard 
                        title={"Média da turma"}
                        data={"6.4"}
                        description={"3 aprovados"}
                    />

                </div>
                
                <DashboardRegister />
            </main>
        </>
    )
}